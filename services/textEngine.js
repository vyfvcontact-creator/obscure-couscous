const Groq = require('groq-sdk');
const config = require('../config');

const groq = new Groq({
  apiKey: config.groqApiKey,
});

class TextEngine {
  async generateResponse(prompt, context = '') {
    try {
      const messages = [
        { role: 'system', content: 'You are an educational assistant specialized in all academic subjects. Provide accurate, concise, well-organized solutions with step-by-step explanations when needed. Use Arabic for responses. Format with Markdown: **bold** for important points, *italics* for emphasis, numbered lists for steps, bullet points for key facts. Keep responses clear and structured.' },
        { role: 'user', content: context ? `${context}\n\n${prompt}` : prompt }
      ];

      const response = await groq.chat.completions.create({
        model: config.groqModel,
        messages,
        max_tokens: 1000,
        temperature: 0.3,
      });

      return response.choices[0].message.content.trim();
    } catch (error) {
      console.error('Text Engine Error:', error);
      return 'عذراً، حدث خطأ في معالجة الطلب. يرجى المحاولة لاحقاً.';
    }
  }
}

module.exports = new TextEngine();