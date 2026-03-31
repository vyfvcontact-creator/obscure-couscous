module.exports = {
  name: 'status',
  description: 'حالة البوت',
  adminOnly: true,

  async execute(sock, from, args) {
    const statusText = `
🤖 *حالة البوت*

• حالة الاتصال: متصل
• الذاكرة: ${process.memoryUsage().heapUsed / 1024 / 1024} MB
• الوقت: ${new Date().toLocaleString()}
    `;
    await sock.sendMessage(from, { text: statusText });
  }
};