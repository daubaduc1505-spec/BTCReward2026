// config.js - CẤU HÌNH TRUNG TÂM
module.exports = {
  // 🔗 SOCIAL LINKS
  links: {
    twitter: 'https://x.com/i/communities/2038186875488522599',
    telegram: 'https://t.me/BTCReward2026',
    pumpfun: 'https://pump.fun/coin/your_coin_address', // Bạn đổi sau
    website: 'https://your-memecoin.com',
  },
  
  // 💰 ĐỊA CHỈ VÍ (2 VÍ RIÊNG BIỆT)
  addresses: {
    tokenMint: 'YOUR_MEMECOIN_MINT_ADDRESS', // Địa chỉ token bạn sẽ tạo
    tokenSymbol: 'MEME',
    tokenDecimals: 9,
    tokenSupply: 1000000000, // 1 tỷ
    
    // VÍ NHẬN PHÍ (Fee Collector)
    feeWallet: '7g8d6eTrEHNkmK586RA1JzhSajFYe5Tt1fV7wRMrtfzR',
    
    // VÍ TRẢ THƯỞNG (Reward Distributor)
    rewardWallet: '2Q7AYFHVpJyKNd8weZqmYcxvgje19tr5JBTPKZ2PQDWd',
    
    btcMint: '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E', // BTC on Solana
    solMint: 'So11111111111111111111111111111111111111112',
  },
  
  // ⚙️ CÀI ĐẶT HỆ THỐNG
  settings: {
    cycleDuration: 30, // phút - thu phí và swap
    distributionInterval: 60, // phút - phân phối
    minHoldingAmount: 1000, // token tối thiểu
    minHoldingDays: 7, // ngày nắm giữ tối thiểu
    rpcUrl: 'https://api.mainnet-beta.solana.com',
    network: 'mainnet-beta'
  },
  
  // 🤖 TELEGRAM BOT (Điền thông tin bạn đã tạo)
  telegram: {
    botToken: 'YOUR_TELEGRAM_BOT_TOKEN', // Thay bằng token thật
    groupId: 'YOUR_GROUP_ID', // Thay bằng ID group thật (có dấu -)
    channelId: '', // Để trống nếu không có channel riêng
  },
  
  // 🎵 MUSIC (YouTube Radio)
  music: {
    enabled: true,
    url: 'https://www.youtube.com/embed/videoseries?list=RDrRHDfI7LRwg&autoplay=1&loop=1&playlist=rRHDfI7LRwg',
    name: '🎵 EDM MIX 2025'
  }
};