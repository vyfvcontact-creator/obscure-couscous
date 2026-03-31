const textEngine = require('../services/textEngine');

module.exports = {
  name: 'resume',
  description: 'تلخيص النص',
  adminOnly: false,

  async execute(sock, from, args) {
    const query = args.join(' ');
    if (!query) {
      await sock.sendMessage(from, { text: 'يرجى تقديم النص بعد !resume' });
      return;
    }

    const prompt = `لخص هذا النص باختصار: ${query}`;
    const response = await textEngine.generateResponse(prompt);
    await sock.sendMessage(from, { text: response });
  }
};