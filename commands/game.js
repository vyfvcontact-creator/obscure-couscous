const textEngine = require('../services/textEngine');

module.exports = {
  name: 'game',
  description: 'العاب بسيطة للترفيه',
  adminOnly: false,

  async execute(sock, from, args) {
    const gameType = args[0]?.toLowerCase();

    if (!gameType) {
      await sock.sendMessage(from, { text: 'اختر لعبة: !game rps (حجر ورق مقص), !game guess (خمن الرقم)' });
      return;
    }

    if (gameType === 'rps') {
      await sock.sendMessage(from, { text: 'حجر ورق مقص! أرسل اختيارك: حجر، ورق، أو مقص' });
      // Note: For full game, need state management, simplified here
    } else if (gameType === 'guess') {
      const number = Math.floor(Math.random() * 100) + 1;
      await sock.sendMessage(from, { text: `خمن رقم من 1 إلى 100! (الرقم: ${number} - للاختبار)` });
    } else {
      await sock.sendMessage(from, { text: 'لعبة غير معروفة. جرب: rps أو guess' });
    }
  }
};