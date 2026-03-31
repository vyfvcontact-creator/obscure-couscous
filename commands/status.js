module.exports = {
  name: 'status',
  description: 'حالة البوت',
  adminOnly: true,

  async execute(sock, from, args) {
    const statusText = `
🤖 *حالة بوت قسم 3/13*
🏫 مدرسة ابن خلدون الإعدادية - خريبكة

• حالة الاتصال: متصل
• الذاكرة: ${process.memoryUsage().heapUsed / 1024 / 1024} MB
• الوقت: ${new Date().toLocaleString('ar')}
• الخدمة: جاهزة للمساعدة الأكاديمية
    `;
    await sock.sendMessage(from, { text: statusText });
  }
};