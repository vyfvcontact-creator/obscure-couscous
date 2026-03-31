const { makeWASocket, DisconnectReason, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
const config = require('../config');
const commandHandler = require('./commandHandler');

class MessagingLayer {
  constructor() {
    this.sock = null;
    this.start();
  }

  async start() {
    const { state, saveCreds } = await useMultiFileAuthState(path.dirname(config.sessionPath));

    this.sock = makeWASocket({
      auth: state,
      printQRInTerminal: false, // Deprecated, handle manually
    });

    this.sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        console.log('QR Code received, scan it with WhatsApp (valid for 1 minute):');
        qrcode.generate(qr, { small: true });
        // Keep QR displayed for 1 minute
        setTimeout(() => {
          console.log('QR Code expired. Restarting connection...');
        }, 60000);
      }

      if (connection === 'close') {
        const shouldReconnect = (lastDisconnect?.error instanceof Boom)
          ? lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut
          : true;
        if (shouldReconnect) {
          console.log('Reconnecting in 5 seconds...');
          setTimeout(() => {
            this.start();
          }, 5000); // Wait 5 seconds before reconnecting
        } else {
          console.log('Connection closed. Logged out.');
        }
      } else if (connection === 'open') {
        console.log('Connected to WhatsApp');
      }
    });

    this.sock.ev.on('creds.update', saveCreds);

    this.sock.ev.on('messages.upsert', async (m) => {
      const msg = m.messages[0];
      if (!msg.message) return;

      const from = msg.key.remoteJid;
      const sender = msg.key.participant || from;
      const isGroup = from.endsWith('@g.us');

      // Only respond to mentions, commands, or images
      const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || '';
      const hasImage = msg.message?.imageMessage;
      const isMention = text.includes('@bot') || text.startsWith('!');
      const isDirect = !isGroup;

      if (isMention || isDirect || hasImage) {
        await commandHandler.handleCommand(msg, this.sock, from, isGroup, sender);
        await commandHandler.handleMessage(msg, this.sock, from, isGroup, sender);
      }
    });

    this.sock.ev.on('group-participants.update', async (update) => {
      if (update.action === 'add') {
        const welcomeMsg = `مرحباً بك في المجموعة! 🤖\n\nأنا بوت 3/13-AI Engine، متخصص في المساعدة الأكاديمية.\nاستخدم !help لمعرفة الأوامر المتاحة.`;
        await this.sock.sendMessage(update.id, { text: welcomeMsg });
      }
    });
  }

  async sendMessage(to, content) {
    await this.sock.sendMessage(to, content);
  }
}

module.exports = new MessagingLayer();