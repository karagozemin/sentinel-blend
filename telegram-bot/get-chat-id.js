const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.log('TELEGRAM_BOT_TOKEN bulunamadi!');
  console.log('Lutfen .env dosyasinda TELEGRAM_BOT_TOKEN degiskenini ayarlayin');
  process.exit(1);
}

console.log('Bot baslatiliyor...');
console.log('Botunuza herhangi bir mesaj gonderin');
console.log('Chat ID niz konsola yazilacak');
console.log('Ctrl+C ile cikis yapin\n');

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username || msg.from.first_name || 'Unknown';
  
  console.log('Mesaj alindi!');
  console.log('Kullanici:', username);
  console.log('Chat ID:', chatId);
  console.log('Mesaj:', msg.text);
  console.log('---');
  
  bot.sendMessage(chatId, `Merhaba ${username}! Chat ID niz: ${chatId}`);
});

console.log('Bot calisiyor! Mesaj bekleniyor...');
