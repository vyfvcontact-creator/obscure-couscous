const textEngine = require('../services/textEngine');

module.exports = {
  name: 'joke',
  description: 'نكتة مضحكة',
  adminOnly: false,

  async execute(sock, from, args) {
    const prompt = 'أخبرني بنكتة قصيرة ومضحكة بالعربية';
    const joke = await textEngine.generateResponse(prompt);
    await sock.sendMessage(from, { text: `😂 ${joke}` });
  }
};