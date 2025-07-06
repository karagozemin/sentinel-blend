# Blend Sentinel Telegram Bot

Node.js server that sends risk alerts for Blend Protocol positions.

## Setup

```bash
npm install
npm start
```

Server runs on [http://localhost:3002](http://localhost:3002)

## Configuration

Create `.env` file:

```env
TELEGRAM_BOT_TOKEN=your_bot_token
PORT=3002
FRONTEND_URL=https://sentinel-blend.vercel.app
```

## Features

- Real-time risk notifications
- Rate limiting (10 min cooldown)
- Duplicate message detection
- Demo mode support
- Subscription management

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