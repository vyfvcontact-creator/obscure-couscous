const fs = require('fs');
const path = require('path');
const config = require('../config');
const memory = require('../db/memory');
const textEngine = require('../services/textEngine');
const visionEngine = require('../services/visionEngine');

class CommandHandler {
  constructor() {
    this.commands = {};
    this.rateLimit = new Map(); // Simple rate limiting
    this.loadCommands();
  }

  loadCommands() {
    const commandFiles = fs.readdirSync(path.join(__dirname, '../commands')).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      const command = require(`../commands/${file}`);
      this.commands[command.name] = command;
    }
  }

  isRateLimited(userId, isGroup) {
    const now = Date.now();
    const key = isGroup ? `group_${userId}` : userId;
    const lastUse = this.rateLimit.get(key);
    if (lastUse && now - lastUse < 5000) { // 5 seconds limit
      return true;
    }
    this.rateLimit.set(key, now);
    return false;
  }

  async handleCommand(message, sock, from, isGroup, sender) {
    const text = message.message?.conversation || message.message?.extendedTextMessage?.text || '';
    if (!text.startsWith('!')) return;

    const args = text.slice(1).trim().split(' ');
    const commandName = args.shift().toLowerCase();

    if (!this.commands[commandName]) return;

    // Rate limiting
    if (this.isRateLimited(sender, isGroup)) {
      if (isGroup) return; // Silent in groups
      await sock.sendMessage(from, { text: 'يرجى الانتظار قليلاً قبل إرسال أمر آخر.' });
      return;
    }

    // Check if admin only
    if (this.commands[commandName].adminOnly && sender !== config.adminId) {
      await sock.sendMessage(from, { text: 'أنت غير مصرح لك بهذا الأمر.' });
      return;
    }

    try {
      await this.commands[commandName].execute(sock, from, args, message, sender, isGroup);
    } catch (error) {
      console.error(`Error executing command ${commandName}:`, error);
      await sock.sendMessage(from, { text: 'حدث خطأ في تنفيذ الأمر.' });
    }
  }

  async handleMessage(message, sock, from, isGroup, sender) {
    const text = message.message?.conversation || message.message?.extendedTextMessage?.text || '';
    const hasImage = message.message?.imageMessage;

    // If image, process immediately (with rate limit)
    if (hasImage) {
      if (this.isRateLimited(sender, isGroup)) {
        return; // Silent
      }
      const buffer = await sock.downloadMediaMessage(message);
      const response = await visionEngine.processImage(buffer);
      await sock.sendMessage(from, { text: response });
      return;
    }

    // If text and mentions bot or direct message
    if (text && (text.includes('@bot') || !isGroup)) {
      if (this.isRateLimited(sender, isGroup)) {
        if (isGroup) return;
        await sock.sendMessage(from, { text: 'يرجى الانتظار قليلاً.' });
        return;
      }
      const context = await memory.getUserContext(sender);
      const response = await textEngine.generateResponse(text, context?.context);
      await memory.saveUserContext(sender, text, response);
      await sock.sendMessage(from, { text: response });
    }
  }
}

module.exports = new CommandHandler();