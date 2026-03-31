const fs = require('fs');
const config = require('../config');

module.exports = {
  name: 'logs',
  description: 'عرض آخر الأخطاء',
  adminOnly: true,

  async execute(sock, from, args) {
    try {
      const logs = fs.readFileSync(config.logPath, 'utf8').split('\n').slice(-10).join('\n');
      await sock.sendMessage(from, { text: `📋 آخر 10 سجلات لبوت قسم 3/13:\n${logs}` });
    } catch (error) {
      await sock.sendMessage(from, { text: 'لا توجد سجلات أو خطأ في القراءة.' });
    }
  }
};