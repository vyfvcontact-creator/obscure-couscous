const textEngine = require('../services/textEngine');

module.exports = {
  name: 'fact',
  description: 'حقيقة مثيرة للاهتمام',
  adminOnly: false,

  async execute(sock, from, args) {
    const prompt = 'أخبرني بحقيقة علمية أو تاريخية مثيرة للاهتمام بالعربية';
    const fact = await textEngine.generateResponse(prompt);
    await sock.sendMessage(from, { text: `🧠 ${fact}` });
  }
};