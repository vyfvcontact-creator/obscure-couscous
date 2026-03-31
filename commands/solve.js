const textEngine = require('../services/textEngine');

module.exports = {
  name: 'solve',
  description: 'حل التمارين الرياضية/العلمية',
  adminOnly: false,

  async execute(sock, from, args) {
    const query = args.join(' ');
    if (!query) {
      await sock.sendMessage(from, { text: 'يرجى تقديم السؤال بعد !solve' });
      return;
    }

    const prompt = `حل هذا السؤال خطوة بخطوة: ${query}`;
    const response = await textEngine.generateResponse(prompt);
    await sock.sendMessage(from, { text: response });
  }
};