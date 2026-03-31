module.exports = {
  // WhatsApp Bot Config
  sessionPath: './session.json',

  // Admin WhatsApp ID (replace with actual ID)
  adminId: '1234567890@s.whatsapp.net',

  // AI Config
  geminiApiKey: 'your-gemini-api-key-here', // For vision and complex tasks
  groqApiKey: 'your-groq-api-key-here', // For simple and fast responses
  groqModel: 'llama3-8b-8192', // Or appropriate model

  // Performance
  timeout: 10000, // 10 seconds
  delayBetweenMessages: 1000, // 1 second

  // Database
  dbPath: './db/memory.db',

  // Logging
  logPath: './logs/bot.log'
};