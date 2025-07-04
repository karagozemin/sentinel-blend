# 🛡️ Blend Sentinel 

**Stellar ağında DeFi güvenliğiniz için akıllı risk yönetimi sistemi**

[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](http://localhost:3000/sentinel)
[![Telegram](https://img.shields.io/badge/Telegram-Bot-blue)](https://t.me/blend_sentinel_bot)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)

---

## 📖 **İçindekiler**

- [🎯 Proje Hakkında](#-proje-hakkında)
- [🚨 Problem & Çözüm](#-problem--çözüm)
- [🚀 Özellikler](#-özellikler)
- [🏗️ Sistem Mimarisi](#️-sistem-mimarisi)
- [📊 Risk Analizi](#-risk-analizi)
- [⚡ Hızlı Başlangıç](#-hızlı-başlangıç)
- [🛠️ Kurulum](#️-kurulum)
- [🤖 Telegram Bot Kurulumu](#-telegram-bot-kurulumu)
- [📱 Kullanım](#-kullanım)
- [🔌 API Referansı](#-api-referansı)
- [🌐 Production Deployment](#-production-deployment)
- [🔮 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)

---

## 🎯 **Proje Hakkında**

**Blend Sentinel**, Stellar blockchain üzerindeki [Blend Protocol](https://blend.capital/) kullanıcıları için geliştirilmiş gerçek zamanlı risk izleme ve uyarı sistemidir. Kullanıcıların DeFi pozisyonlarını sürekli analiz ederek likidation risklerine karşı proaktif koruma sağlar.

### **🎪 Demo**
- **Frontend**: http://localhost:3000/sentinel
- **Telegram Bot**: [@blend_sentinel_bot](https://t.me/blend_sentinel_bot)
- **API Health**: http://localhost:3002/health

---

## 🚨 **Problem & Çözüm**

### **❌ Mevcut Problem**
- Blend Protocol'de **pozisyon takibi** manuel olarak yapılmak zorunda
- Kullanıcılar **likidation risklerini** zamanında fark edemiyor  
- **Gerçek fon kaybı** riski (sudden liquidations)
- **Proaktif uyarı sistemi** mevcut değil

### **✅ Blend Sentinel Çözümü**
- 🔄 **24/7 otomatik** pozisyon monitörü
- 📱 **Telegram bildirimleri** ile anlık uyarılar
- 📊 **Akıllı risk skorlama** algoritması
- 🎯 **Likidation önleme** sistemi
- 💡 **Pool optimizasyon** önerileri

---

## 🚀 **Özellikler**

### **💎 Core Features**
- ✅ **Real-time Position Tracking** - Tüm Blend pool'larında pozisyon analizi
- ✅ **Smart Risk Scoring** - LTV ve Health Factor bazlı risk hesaplama
- ✅ **Telegram Notifications** - Risk eşiği aşımında otomatik uyarı
- ✅ **Multi-Wallet Support** - Freighter ve diğer Stellar wallet'lar
- ✅ **Responsive Dashboard** - Mobil ve masaüstü uyumlu arayüz

### **🔧 Technical Features**
- ✅ **Blend SDK Integration** - Resmi Blend SDK kullanımı
- ✅ **TypeScript & Next.js** - Modern web teknolojileri
- ✅ **RESTful API** - Telegram bot ve webhook desteği
- ✅ **Real-time Updates** - Pozisyon verilerinin canlı güncellenmesi
- ✅ **Error Handling** - Robust hata yönetimi

### **📈 Advanced Features**
- ✅ **Health Factor Monitoring** - Likidation eşik takibi
- ✅ **Portfolio Overview** - Toplam pozisyon analizi
- ✅ **Risk Threshold Customization** - Kişiselleştirilebilir uyarılar
- ✅ **Historical Data** - Notification geçmişi
- ✅ **Admin Dashboard** - Sistem istatistikleri

---

## 🏗️ **Sistem Mimarisi**

```mermaid
graph TB
    A[👤 User Wallet] --> B[🌐 Frontend<br/>Next.js + Blend SDK]
    B --> C[📊 Position Analysis<br/>Risk Calculation]
    C --> D{Risk Score ≥ 80?}
    D -->|Yes| E[🔔 Notification API<br/>Node.js + Express]
    D -->|No| F[✅ Safe Position]
    E --> G[📱 Telegram Bot<br/>Real-time Alert]
    G --> H[👤 User Mobile]
    
    I[🌟 Stellar Network] --> J[🏦 Blend Protocol]
    J --> K[📈 Pool Data & Oracles]
    K --> B
    
    E --> L[(💾 Subscription DB<br/>In-Memory/PostgreSQL)]
    
    style A fill:#e1f5fe
    style G fill:#f3e5f5
    style C fill:#fff3e0
    style E fill:#e8f5e8
```

### **🔧 Tech Stack**

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | Next.js 14, TypeScript, Material-UI | Dashboard & User Interface |
| **Backend** | Node.js, Express, TypeScript | API Server & Bot Logic |
| **Blockchain** | Stellar SDK, Blend SDK | Blockchain Integration |
| **Database** | In-Memory (MVP) / PostgreSQL | User Subscriptions |
| **Notifications** | Telegram Bot API | Real-time Alerts |
| **Deployment** | Docker, Vercel, VPS | Production Environment |

---

## 📊 **Risk Analizi**

### **🧮 Risk Score Calculation**

```typescript
// Risk Score Algorithm
function calculateRiskScore(position: PositionData): number {
  const ltv = (position.debt / position.collateral) * 100;
  let riskScore = ltv * 0.8; // LTV weight: 80%
  
  // Health Factor penalties
  if (position.healthFactor < 1.2) riskScore += 30;
  if (position.healthFactor < 1.1) riskScore += 20;
  
  return Math.min(Math.max(riskScore, 0), 100);
}
```

### **⚠️ Risk Levels**

| Risk Level | Score Range | Health Factor | Action |
|------------|-------------|---------------|---------|
| 🟢 **Low Risk** | 0-30 | > 1.5 | ✅ Safe position |
| 🟡 **Medium Risk** | 31-70 | 1.2-1.5 | ⚠️ Monitor closely |
| 🔴 **High Risk** | 71-100 | < 1.2 | 🚨 **Telegram Alert** |

### **📈 Monitored Metrics**

- **Collateral Value** - Total effective collateral in USD
- **Debt Amount** - Total borrowed amount in USD  
- **LTV Ratio** - Loan-to-Value percentage
- **Health Factor** - Liquidation safety margin
- **Pool Status** - Individual pool risk assessment

---

## ⚡ **Hızlı Başlangıç**

### **🚀 1-Minute Demo Setup**

```bash
# Clone the repository
git clone https://github.com/your-username/blend-sentinel.git
cd blend-sentinel

# Install dependencies (both frontend and bot)
cd blend-ui && npm install && cd ../telegram-bot && npm install && cd ..

# Start demo mode (no Telegram token required)
cd telegram-bot && PORT=3002 node server.js &
cd ../blend-ui && npm run dev &

# Open dashboard
open http://localhost:3000/sentinel
```

🎯 **Demo Mode**: Sistem Telegram token olmadan da çalışır - bildirimleri konsola yazdırır.

---

## 🛠️ **Kurulum**

### **📋 Gereksinimler**

- **Node.js** 18+ 
- **npm** veya **yarn**
- **Git**
- **Freighter Wallet** (Stellar)
- **Telegram Account** (bot için)

### **🔧 Frontend Kurulumu**

```bash
# 1. Repository'yi klonlayın
git clone https://github.com/your-username/blend-sentinel.git
cd blend-sentinel/blend-ui

# 2. Dependencies'leri yükleyin
npm install

# 3. Environment dosyasını oluşturun
cp .env.testnet .env.local

# 4. Bot API URL'ini ekleyin
echo "NEXT_PUBLIC_BOT_API_URL=http://localhost:3002" >> .env.local

# 5. Development server'ı başlatın
npm run dev

# ✅ Frontend: http://localhost:3000
```

### **🤖 Backend (Telegram Bot) Kurulumu**

```bash
# 1. Bot dizinine gidin
cd ../telegram-bot

# 2. Dependencies'leri yükleyin  
npm install

# 3. Environment dosyasını oluşturun
cat > .env << EOF
TELEGRAM_BOT_TOKEN=
PORT=3002
FRONTEND_URL=http://localhost:3000
EOF

# 4. Demo modunda çalıştırın (token olmadan)
npm start

# ✅ Bot API: http://localhost:3002
```

---

## 🤖 **Telegram Bot Kurulumu**

### **📱 Bot Oluşturma**

1. **@BotFather**'a mesaj gönderin: https://t.me/BotFather
2. `/newbot` komutunu yazın
3. Bot için isim seçin: `Blend Sentinel Risk Monitor`
4. Username seçin: `blend_sentinel_bot` (benzeri)
5. **Token'ı kopyalayın**: `1234567890:ABC-DEF1234ghIkl...`

### **🔑 Token Konfigürasyonu**

```bash
# .env dosyasını düzenleyin
nano telegram-bot/.env

# Token'ı ekleyin:
TELEGRAM_BOT_TOKEN=1234567890:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
```

### **🆔 Chat ID Öğrenme**

```bash
# Chat ID script'ini çalıştırın
cd telegram-bot
node get-chat-id.js

# Telegram'da botunuza mesaj gönderin
# Chat ID konsola yazdırılacak: 123456789
```

### **📋 Subscription Oluşturma**

```bash
# Subscription oluşturun
curl -X POST http://localhost:3002/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "walletAddress": "YOUR_STELLAR_WALLET_ADDRESS",
    "chatId": "YOUR_CHAT_ID",
    "riskThreshold": 80
  }'
```

### **🧪 Notification Test**

```bash
# Test notification gönderin
curl -X POST http://localhost:3002/api/notify \
  -H "Content-Type: application/json" \
  -d '{
    "walletAddress": "YOUR_WALLET_ADDRESS",
    "message": "🚨 Test Notification!",
    "positions": [],
    "riskLevel": "high"
  }'
```

---

## 📱 **Kullanım**

### **🔗 1. Wallet Bağlantısı**

1. **http://localhost:3000/sentinel** adresine gidin
2. **Freighter wallet**'ınızı browser'da aktif edin
3. **"Connect Wallet"** butonuna tıklayın
4. **İzinleri onaylayın**

### **📊 2. Dashboard İncelemesi**

- **Overall Health Factor** - Genel pozisyon sağlığı
- **Active Positions** - Pool bazında pozisyon detayları  
- **Risk Scores** - Her pozisyon için risk analizi
- **Notification Status** - Son uyarı durumu

### **⚠️ 3. Risk Monitoring**

Sistem otomatik olarak:
- ✅ **Her 30 saniyede** pozisyonları kontrol eder
- ✅ **Risk skoru 80+** olduğunda Telegram'a bildirim gönderir
- ✅ **Health Factor < 1.2** durumunda acil uyarı verir
- ✅ **Position değişikliklerini** real-time takip eder

### **📱 4. Telegram Bildirimleri**

Yüksek risk durumunda aldığınız mesaj:

```
🚨 BLEND SENTINEL UYARI

🚨 YÜKSEK RİSK UYARISI! 1 pozisyonunuz risk skoru 80+ seviyesinde.

📊 Yüksek Riskli Pozisyonlar:
1. USDC Pool
   💰 Teminat: $100,000
   💸 Borç: $85,000  
   📈 Risk Skoru: 85/100
   🏥 Health Factor: 1.18

🔗 Pozisyonlarınızı kontrol edin:
http://localhost:3000/sentinel
```

---

## 🔌 **API Referansı**

### **🏥 Health Check**

```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "service": "Blend Sentinel Telegram Bot",
  "botConnected": true,
  "timestamp": "2025-01-04T14:06:31.171Z"
}
```

### **📝 Create Subscription**

```http
POST /api/subscribe
Content-Type: application/json

{
  "walletAddress": "STELLAR_WALLET_ADDRESS",
  "chatId": "TELEGRAM_CHAT_ID",
  "riskThreshold": 80
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed to risk notifications",
  "subscription": {
    "walletAddress": "GDEMO...",
    "chatId": "123456789",
    "riskThreshold": 80
  }
}
```

### **🔔 Send Notification**

```http
POST /api/notify
Content-Type: application/json

{
  "walletAddress": "WALLET_ADDRESS",
  "message": "Risk warning message",
  "positions": [
    {
      "poolName": "USDC Pool",
      "collateral": 100000,
      "debt": 85000,
      "riskScore": 85,
      "healthFactor": 1.18
    }
  ],
  "riskLevel": "high"
}
```

### **👤 Get Subscription**

```http
GET /api/subscription/:walletAddress
```

### **📜 Get Notifications**

```http
GET /api/notifications/:walletAddress
```

### **📊 Admin Stats**

```http
GET /api/admin/stats
```

**Response:**
```json
{
  "totalSubscriptions": 1,
  "totalNotifications": 5,
  "activeSubscriptions": 1,
  "recentNotifications": [...]
}
```

---

## 🌐 **Production Deployment**

### **🐳 Docker Deployment**

```dockerfile
# Dockerfile.frontend
FROM node:18-alpine
WORKDIR /app
COPY blend-ui/package*.json ./
RUN npm install
COPY blend-ui/ .
EXPOSE 3000
CMD ["npm", "run", "start"]
```

```dockerfile  
# Dockerfile.bot
FROM node:18-alpine
WORKDIR /app
COPY telegram-bot/package*.json ./
RUN npm install
COPY telegram-bot/ .
EXPOSE 3002
CMD ["node", "server.js"]
```

### **🚀 Vercel Frontend Deployment**

```bash
# Vercel CLI ile deploy
cd blend-ui
npm install -g vercel
vercel --prod

# Environment variables ekleyin:
# NEXT_PUBLIC_BOT_API_URL=https://your-bot-api.com
```

### **☁️ VPS Bot Deployment**

```bash
# VPS'e bot deploy
scp -r telegram-bot/ user@your-server:/opt/blend-sentinel/
ssh user@your-server

cd /opt/blend-sentinel/telegram-bot
npm install --production

# PM2 ile production deployment
npm install -g pm2
pm2 start server.js --name "blend-sentinel-bot"
pm2 startup
pm2 save
```

### **🔒 Production Environment Variables**

```bash
# Production .env
TELEGRAM_BOT_TOKEN=your_production_token
PORT=3002
FRONTEND_URL=https://your-domain.com
DATABASE_URL=postgresql://user:pass@host:port/db
REDIS_URL=redis://localhost:6379
```

---

## 🔮 **Roadmap**

### **✅ MVP Features (Completed)**
- [x] Real-time position monitoring
- [x] Telegram notification system  
- [x] Risk score calculation
- [x] Multi-pool support
- [x] Responsive dashboard

### **🚧 V2 Features (Next Sprint)**
- [ ] **Email Notifications** - SMTP/SendGrid integration
- [ ] **Advanced Analytics** - Historical risk charts  
- [ ] **Pool Optimization** - "Better yield available" suggestions
- [ ] **Risk Threshold Customization** - Per-user settings
- [ ] **Multi-language Support** - EN/TR/ES language options

### **🎯 V3 Features (Future)**
- [ ] **Portfolio Optimization** - AI-powered suggestions
- [ ] **Cross-chain Support** - Ethereum, Polygon integration
- [ ] **DeFi Yield Farming** - Automated strategy recommendations
- [ ] **Mobile App** - Native iOS/Android application
- [ ] **Advanced Risk Models** - Machine learning predictions

### **🏢 Enterprise Features**
- [ ] **White-label Solution** - Custom branding for protocols
- [ ] **API Rate Limiting** - Enterprise API access
- [ ] **SLA Monitoring** - 99.9% uptime guarantee
- [ ] **Custom Integrations** - Webhook and API partnerships

---

## 🤝 **Contributing**

### **🔧 Development Setup**

```bash
# Fork the repository
git clone https://github.com/YOUR_USERNAME/blend-sentinel.git
cd blend-sentinel

# Create feature branch
git checkout -b feature/amazing-feature

# Setup development environment
cd blend-ui && npm install && cd ../telegram-bot && npm install

# Make your changes and test
npm run dev # frontend
npm start   # bot

# Run tests (when available)
npm test

# Commit and push
git commit -m 'Add amazing feature'
git push origin feature/amazing-feature

# Create Pull Request
```

### **📋 Contribution Guidelines**

- ✅ **Follow TypeScript** best practices
- ✅ **Add tests** for new features
- ✅ **Update documentation** for API changes
- ✅ **Use conventional commits** (feat:, fix:, docs:)
- ✅ **Test Telegram notifications** before submitting

### **🐛 Bug Reports**

Bug report için [GitHub Issues](https://github.com/your-username/blend-sentinel/issues) kullanın:

```markdown
**Bug Description:**
Kısa açıklama

**Steps to Reproduce:**
1. Go to '...'
2. Click on '....'
3. See error

**Expected Behavior:**
Ne olması gerekiyordu

**Screenshots:**
Varsa ekran görüntüleri

**Environment:**
- OS: [e.g. macOS]
- Browser: [e.g. Chrome]
- Node.js: [e.g. 18.17.0]
```

---

## 📄 **License**

Bu proje **MIT License** altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

```
MIT License

Copyright (c) 2025 Blend Sentinel Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## ⚠️ **Disclaimer**

Bu araç yalnızca **bilgilendirme amaçlıdır** ve **finansal tavsiye değildir**. DeFi protokollerinde her zaman risk vardır:

- 💸 **Akıllı kontrat riskleri** 
- 📉 **Piyasa volatilitesi**
- 🔧 **Technical failures**
- ⚡ **Slippage ve MEV**

**Lütfen kendi araştırmanızı yapın** ve yalnızca kaybetmeyi göze alabileceğiniz fonları kullanın.

---

## 📞 **İletişim & Destek**

- 🌐 **Website**: [blend-sentinel.com](https://blend-sentinel.com)
- 📱 **Telegram**: [@blend_sentinel_bot](https://t.me/blend_sentinel_bot)
- 🐦 **Twitter**: [@BlendSentinel](https://twitter.com/BlendSentinel)
- 📧 **Email**: [support@blend-sentinel.com](mailto:support@blend-sentinel.com)
- 💬 **Discord**: [Blend Sentinel Community](https://discord.gg/blend-sentinel)

---

## 🙏 **Teşekkürler**

- **[Blend Capital](https://blend.capital/)** - Amazing DeFi protocol on Stellar
- **[Stellar Development Foundation](https://stellar.org/)** - Blockchain infrastructure  
- **[Freighter Wallet](https://freighter.app/)** - Stellar wallet integration
- **[Telegram](https://telegram.org/)** - Notification platform
- **Community contributors** - Beta testers and feedback

---

<div align="center">

**🛡️ Blend Sentinel - Stellar ağında DeFi güvenliğiniz için akıllı risk yönetimi**

[![Follow on Twitter](https://img.shields.io/twitter/follow/BlendSentinel?style=social)](https://twitter.com/BlendSentinel)
[![Star on GitHub](https://img.shields.io/github/stars/your-username/blend-sentinel?style=social)](https://github.com/your-username/blend-sentinel)

**⭐ Bu projeyi beğendiyseniz star vermeyi unutmayın!**

</div> 