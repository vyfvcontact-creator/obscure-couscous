// نسخ هذا الملف إلى config.js وأضف مفاتيح API الحقيقية

module.exports = {
  // WhatsApp Bot Config
  sessionPath: './session.json',

  // Admin WhatsApp ID (replace with actual ID)
  adminId: 'YOUR_ADMIN_WHATSAPP_ID@s.whatsapp.net',

  // AI Config
  geminiApiKey: 'YOUR_GEMINI_API_KEY_HERE', // احصل عليه من Google AI Studio
  groqApiKey: 'YOUR_GROQ_API_KEY_HERE', // احصل عليه من Groq
  groqModel: 'llama3-8b-8192', // أو أي نموذج آخر

  // Performance
  timeout: 10000, // 10 seconds
  delayBetweenMessages: 1000, // 1 second

  // Database
  dbPath: './db/memory.db',

  // Logging
  logPath: './logs/bot.log'
};