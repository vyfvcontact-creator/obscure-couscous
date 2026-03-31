const messaging = require('./core/messaging');
const fs = require('fs');
const config = require('./config');

// Ensure logs directory
if (!fs.existsSync('./logs')) fs.mkdirSync('./logs');

// Simple logging
const logStream = fs.createWriteStream(config.logPath, { flags: 'a' });
console.log = (...args) => {
  const message = `${new Date().toISOString()} ${args.join(' ')}\n`;
  process.stdout.write(message);
  logStream.write(message);
};

console.error = (...args) => {
  const message = `${new Date().toISOString()} ERROR: ${args.join(' ')}\n`;
  process.stderr.write(message);
  logStream.write(message);
};

console.log('Starting 3/13 Ibn Khaldun Bot v1.0...');

// Start the bot
messaging;