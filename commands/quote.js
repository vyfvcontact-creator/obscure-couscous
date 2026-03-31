const textEngine = require('../services/textEngine');

module.exports = {
  name: 'quote',
  description: 'اقتباس ملهم',
  adminOnly: false,

  async execute(sock, from, args) {
    const prompt = 'أعطني اقتباس ملهم قصير بالعربية';
    const quote = await textEngine.generateResponse(prompt);
    await sock.sendMessage(from, { text: `💡 ${quote}` });
  }
};