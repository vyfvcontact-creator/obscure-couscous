module.exports = {
  name: 'restart',
  description: 'إعادة تشغيل البوت',
  adminOnly: true,

  async execute(sock, from, args) {
    await sock.sendMessage(from, { text: 'جاري إعادة التشغيل...' });
    process.exit(0); // Assuming PM2 or similar restarts
  }
};