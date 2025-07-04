const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.log('TELEGRAM_BOT_TOKEN not found!');
  console.log('Please set TELEGRAM_BOT_TOKEN variable in .env file');
  process.exit(1);
}

console.log('Starting bot...');
console.log('Send any message to your bot');
console.log('Your Chat ID will be printed to console');
console.log('Exit with Ctrl+C\n');

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username || msg.from.first_name || 'Unknown';
  
  console.log('Message received!');
  console.log('User:', username);
  console.log('Chat ID:', chatId);
  console.log('Message:', msg.text);
  console.log('---');
  
  bot.sendMessage(chatId, `Hello ${username}! Your Chat ID is: ${chatId}`);
});

console.log('Bot is running! Waiting for messages...');
