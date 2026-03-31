const textEngine = require('../services/textEngine');

module.exports = {
  name: 'explain',
  description: 'شرح مبسط للموضوع',
  adminOnly: false,

  async execute(sock, from, args) {
    const query = args.join(' ');
    if (!query) {
      await sock.sendMessage(from, { text: 'يرجى تقديم الموضوع بعد !explain' });
      return;
    }

    const prompt = `اشرح هذا الموضوع بطريقة مبسطة وواضحة: ${query}`;
    const response = await textEngine.generateResponse(prompt);
    await sock.sendMessage(from, { text: response });
  }
};