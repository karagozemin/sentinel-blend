# Blend Sentinel Telegram Bot

Telegram bot API that sends risk alerts for Blend protocol positions.

## Installation

```bash
npm install
```

## Environment Variables

Create `.env` file in project root:

```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=YOUR_BOT_TOKEN_HERE
PORT=3001

# Frontend URL for notifications  
FRONTEND_URL=http://localhost:3000
```

## Demo Mode

If you leave `TELEGRAM_BOT_TOKEN` variable empty, bot runs in demo mode and prints notifications to console.

## Running

```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Subscribe to Notifications
```
POST /api/subscribe
{
  "walletAddress": "STELLAR_WALLET_ADDRESS",
  "chatId": "TELEGRAM_CHAT_ID", 
  "riskThreshold": 80
}
```

### Send Risk Notification
```
POST /api/notify
{
  "walletAddress": "STELLAR_WALLET_ADDRESS",
  "message": "Risk warning message",
  "positions": [...],
  "riskLevel": "high"
}
```

### Get Subscription Info
```
GET /api/subscription/:walletAddress
```

### Health Check
```
GET /health
```

## Telegram Bot Setup

1. Create new bot with BotFather: https://t.me/BotFather
2. Use `/newbot` command to set bot name and username
3. Add the received token to `TELEGRAM_BOT_TOKEN` variable in `.env` file
4. To learn your Chat ID, send message to your bot and use webhook

## Security

- Keep your bot token secure in production
- Add rate limiting
- Use HTTPS for webhooks
- Persist subscriptions using database 