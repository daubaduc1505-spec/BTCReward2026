// frontend/app.js
const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:3001' : '';
let btcPrice = 60000;

// ========== FALLING BTC EFFECT ==========
function createFallingBTC() {
    const container = document.getElementById('btc-container');
    setInterval(() => {
        const btc = document.createElement('div');
        btc.className = 'btc-particle';
        btc.textContent = '₿';
        btc.style.left = Math.random() * 100 + '%';
        btc.style.animationDuration = 5 + Math.random() * 5 + 's';
        btc.style.fontSize = 20 + Math.random() * 20 + 'px';
        btc.style.opacity = 0.3 + Math.random() * 0.5;
        container.appendChild(btc);
        setTimeout(() => btc.remove(), 10000);
    }, 2000);
}

// ========== COUNTDOWN TIMERS ==========
function startCountdowns() {
    const satoshiBirthday = new Date('2025-04-05T00:00:00');
    setInterval(() => {
        const diff = satoshiBirthday - new Date();
        if (diff <= 0) return;
        document.getElementById('satoshi-days').textContent = Math.floor(diff/(1000*60*60*24)).toString().padStart(2,'0');
        document.getElementById('satoshi-hours').textContent = Math.floor((diff%(1000*60*60*24))/(1000*60*60)).toString().padStart(2,'0');
        document.getElementById('satoshi-minutes').textContent = Math.floor((diff%(1000*60*60))/(1000*60)).toString().padStart(2,'0');
        document.getElementById('satoshi-seconds').textContent = Math.floor((diff%(1000*60))/1000).toString().padStart(2,'0');
    }, 1000);
    
    updateCycleCountdown();
    setInterval(updateCycleCountdown, 1000);
}

async function updateCycleCountdown() {
    try {
        const res = await fetch(`${API_URL}/api/cycles/current`);
        const data = await res.json();
        const minutes = Math.floor(data.remainingTime / 60000);
        const seconds = Math.floor((data.remainingTime % 60000) / 1000);
        document.getElementById('cycle-minutes').textContent = minutes.toString().padStart(2,'0');
        document.getElementById('cycle-seconds').textContent = seconds.toString().padStart(2,'0');
        document.getElementById('cycle-number').textContent = data.cycleNumber || 0;
    } catch(e) {
        // Fallback timer 60 phút
        if (!window.cycleEnd) window.cycleEnd = Date.now() + 60*60*1000;
        const remaining = Math.max(0, window.cycleEnd - Date.now());
        document.getElementById('cycle-minutes').textContent = Math.floor(remaining/60000).toString().padStart(2,'0');
        document.getElementById('cycle-seconds').textContent = Math.floor((remaining%60000)/1000).toString().padStart(2,'0');
        if (remaining <= 0) { window.cycleEnd = Date.now() + 60*60*1000; refreshData(); }
    }
}

// ========== FETCH DATA ==========
async function fetchBTCPrice() {
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await res.json();
        btcPrice = data.bitcoin.usd;
    } catch(e) { btcPrice = 60000; }
}

async function refreshData() {
    await fetchStats();
    await fetchLeaderboard();
    await fetchDistributions();
}

async function fetchStats() {
    try {
        const res = await fetch(`${API_URL}/api/stats/global`);
        const stats = await res.json();
        document.getElementById('total-btc').textContent = (stats.totalDistributed || 0).toFixed(4);
        document.getElementById('total-usd').textContent = ((stats.totalDistributed || 0) * btcPrice).toLocaleString();
        document.getElementById('total-cycles').textContent = stats.totalCycles || 0;
        document.getElementById('accumulating-btc').textContent = (stats.accumulatingBTC || 0).toFixed(4);
        document.getElementById('accumulating-usd').textContent = ((stats.accumulatingBTC || 0) * btcPrice).toLocaleString();
    } catch(e) { console.log('Stats fetch failed'); }
}

async function fetchLeaderboard() {
    try {
        const res = await fetch(`${API_URL}/api/holders/top?limit=10`);
        const holders = await res.json();
        const container = document.getElementById('leaderboard-list');
        if (!holders || holders.length === 0) {
            container.innerHTML = '<div class="leaderboard-row">Loading...</div>';
            return;
        }
        container.innerHTML = holders.map((h, i) => `
            <div class="leaderboard-row">
                <span class="leaderboard-rank">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i+1}</span>
                <span class="leaderboard-wallet">${h.wallet?.slice(0, 8)}...${h.wallet?.slice(-4)}</span>
                <span class="leaderboard-balance">${(h.balance || 0).toLocaleString()}</span>
                <span class="leaderboard-percentage">${(h.percentage || 0).toFixed(2)}%</span>
                <span class="leaderboard-rewards">${(h.rewardsEarned || 0).toFixed(4)} BTC</span>
            </div>
        `).join('');
    } catch(e) { console.log('Leaderboard fetch failed'); }
}

async function fetchDistributions() {
    try {
        const res = await fetch(`${API_URL}/api/distributions/recent?limit=10`);
        const logs = await res.json();
        const container = document.getElementById('distribution-log');
        if (!logs || logs.length === 0) {
            container.innerHTML = '<div class="log-entry">No distributions yet</div>';
            return;
        }
        container.innerHTML = logs.map(log => `
            <div class="log-entry">
                <span class="log-time">${new Date(log.time).toLocaleString()}</span>
                <span class="log-amount">${log.amount} BTC</span>
                <span>to ${log.recipients} holders</span>
                <a href="https://solscan.io/tx/${log.txId}" target="_blank" class="log-tx">🔗 View</a>
            </div>
        `).join('');
    } catch(e) { console.log('Distributions fetch failed'); }
}

// ========== MUSIC PLAYER ==========
function setupMusic() {
    const iframe = document.getElementById('youtube-music');
    const toggleBtn = document.getElementById('music-toggle');
    const nowPlaying = document.getElementById('now-playing');
    let isPlaying = true;
    
    const songs = ['🎵 EDM MIX 2025', '🎧 US-UK Dance Hits', '🔊 Nhạc Điện Tử', '💿 Top EDM 2025'];
    let songIndex = 0;
    setInterval(() => {
        nowPlaying.textContent = songs[songIndex % songs.length];
        songIndex++;
    }, 30000);
    
    if (iframe) {
        iframe.src = 'https://www.youtube.com/embed/videoseries?list=RDrRHDfI7LRwg&autoplay=1&loop=1&playlist=rRHDfI7LRwg';
    }
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (isPlaying) {
                iframe.src = '';
                toggleBtn.innerHTML = '🔇 OFF';
                nowPlaying.textContent = '🔇 Music Off';
                isPlaying = false;
            } else {
                iframe.src = 'https://www.youtube.com/embed/videoseries?list=RDrRHDfI7LRwg&autoplay=1&loop=1&playlist=rRHDfI7LRwg';
                toggleBtn.innerHTML = '🔊 PLAY';
                isPlaying = true;
            }
        });
    }
}

// ========== PUMP.FUN LINK ==========
function setupPumpFunLink() {
    const link = document.getElementById('pumpfun-link');
    if (link) {
        // Bạn đổi link sau khi tạo token
        link.href = 'https://pump.fun/coin/YOUR_COIN_ADDRESS';
    }
}

// ========== INIT ==========
async function init() {
    await fetchBTCPrice();
    createFallingBTC();
    startCountdowns();
    setupMusic();
    setupPumpFunLink();
    await refreshData();
    setInterval(refreshData, 30000); // Refresh mỗi 30 giây
}

init();