# Blend Sentinel Telegram Bot

Blend protocol pozisyonları için risk uyarıları gönderen Telegram bot API'si.

## Kurulum

```bash
npm install
```

## Environment Variables

Proje root'unda `.env` dosyası oluşturun:

```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=YOUR_BOT_TOKEN_HERE
PORT=3001

# Frontend URL for notifications  
FRONTEND_URL=http://localhost:3000
```

## Demo Mode

`TELEGRAM_BOT_TOKEN` değişkenini boş bırakırsanız bot demo modunda çalışır ve bildirimleri konsola yazdırır.

## Çalıştırma

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

## Telegram Bot Kurulumu

1. BotFather ile yeni bot oluşturun: https://t.me/BotFather
2. `/newbot` komutu ile bot adını ve username'ini belirleyin
3. Aldığınız token'ı `.env` dosyasındaki `TELEGRAM_BOT_TOKEN` değişkenine ekleyin
4. Chat ID'nizi öğrenmek için botunuza mesaj gönderin ve webhook'u kullanın

## Güvenlik

- Production'da bot token'ınızı güvenli tutun
- Rate limiting ekleyin
- Webhook'lar için HTTPS kullanın
- Database kullanarak subscription'ları persist edin 