const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config');

const genAI = new GoogleGenerativeAI(config.geminiApiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Or appropriate vision model

class VisionEngine {
  async processImage(imageBuffer, prompt = 'Extract and solve any math, physics, or science problems from this image. Provide step-by-step solutions in Arabic, organized and formatted clearly.') {
    try {
      const image = {
        inlineData: {
          data: imageBuffer.toString('base64'),
          mimeType: 'image/jpeg', // Assume jpeg, can detect if needed
        },
      };

      const result = await model.generateContent([prompt, image]);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Vision Engine Error:', error);
      return 'عذراً، حدث خطأ في معالجة الصورة. يرجى المحاولة لاحقاً.';
    }
  }
}

module.exports = new VisionEngine();