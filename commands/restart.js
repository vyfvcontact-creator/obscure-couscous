module.exports = {
  name: 'restart',
  description: 'إعادة تشغيل البوت',
  adminOnly: true,

  async execute(sock, from, args) {
    await sock.sendMessage(from, { text: 'جاري إعادة تشغيل بوت قسم 3/13...' });
    process.exit(0); // Assuming PM2 or similar restarts
  }
};