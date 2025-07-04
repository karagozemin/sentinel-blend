# 🛡️ Blend Sentinel 

**Smart risk management system for DeFi security on the Stellar network**

[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](http://localhost:3000/sentinel)
[![Telegram](https://img.shields.io/badge/Telegram-Bot-blue)](https://t.me/blend_sentinel_bot)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)

---

## 📖 **Table of Contents**

- [🎯 About the Project](#-about-the-project)
- [🚨 Problem & Solution](#-problem--solution)
- [🚀 Features](#-features)
- [🏗️ System Architecture](#️-system-architecture)
- [📊 Risk Analysis](#-risk-analysis)
- [⚡ Quick Start](#-quick-start)
- [🛠️ Installation](#️-installation)
- [🤖 Telegram Bot Setup](#-telegram-bot-setup)
- [📱 Usage](#-usage)
- [🔌 API Reference](#-api-reference)
- [🌐 Production Deployment](#-production-deployment)
- [🔮 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)

---

## 🎯 **About the Project**

**Blend Sentinel** is a real-time risk monitoring and alert system developed for [Blend Protocol](https://blend.capital/) users on the Stellar blockchain. It provides proactive protection against liquidation risks by continuously analyzing users' DeFi positions.

### **🎪 Demo**
- **Frontend**: http://localhost:3000/sentinel
- **Telegram Bot**: [@blend_sentinel_bot](https://t.me/blend_sentinel_bot)
- **API Health**: http://localhost:3002/health

---

## 🚨 **Problem & Solution**

### **❌ Current Problem**
- **Position tracking** in Blend Protocol must be done manually
- Users cannot detect **liquidation risks** in time  
- Risk of **actual fund loss** (sudden liquidations)
- No **proactive alert system** available

### **✅ Blend Sentinel Solution**
- 🔄 **24/7 automatic** position monitoring
- 📱 **Telegram notifications** with instant alerts
- 📊 **Smart risk scoring** algorithm
- 🎯 **Liquidation prevention** system
- 💡 **Pool optimization** recommendations

---

## 🚀 **Features**

### **💎 Core Features**
- ✅ **Real-time Position Tracking** - Position analysis in all Blend pools
- ✅ **Smart Risk Scoring** - LTV and Health Factor based risk calculation
- ✅ **Telegram Notifications** - Automatic alerts when risk threshold is exceeded
- ✅ **Multi-Wallet Support** - Freighter and other Stellar wallets
- ✅ **Responsive Dashboard** - Mobile and desktop compatible interface

### **🔧 Technical Features**
- ✅ **Blend SDK Integration** - Official Blend SDK usage
- ✅ **TypeScript & Next.js** - Modern web technologies
- ✅ **RESTful API** - Telegram bot and webhook support
- ✅ **Real-time Updates** - Live updates of position data
- ✅ **Error Handling** - Robust error management

### **📈 Advanced Features**
- ✅ **Health Factor Monitoring** - Liquidation threshold tracking
- ✅ **Portfolio Overview** - Total position analysis
- ✅ **Risk Threshold Customization** - Customizable alerts
- ✅ **Historical Data** - Notification history
- ✅ **Admin Dashboard** - System statistics

---

## 🏗️ **System Architecture**

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

## 📊 **Risk Analysis**

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

## ⚡ **Quick Start**

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

🎯 **Demo Mode**: System works without Telegram token - prints notifications to console.

---

## 🛠️ **Installation**

### **📋 Requirements**

- **Node.js** 18+ 
- **npm** or **yarn**
- **Git**
- **Freighter Wallet** (Stellar)
- **Telegram Account** (for bot)

### **🔧 Frontend Setup**

```bash
# 1. Clone the repository
git clone https://github.com/your-username/blend-sentinel.git
cd blend-sentinel/blend-ui

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.testnet .env.local

# 4. Add Bot API URL
echo "NEXT_PUBLIC_BOT_API_URL=http://localhost:3002" >> .env.local

# 5. Start development server
npm run dev

# ✅ Frontend: http://localhost:3000
```

### **🤖 Backend (Telegram Bot) Setup**

```bash
# 1. Go to bot directory
cd ../telegram-bot

# 2. Install dependencies  
npm install

# 3. Create environment file
cat > .env << EOF
TELEGRAM_BOT_TOKEN=
PORT=3002
FRONTEND_URL=http://localhost:3000
EOF

# 4. Run in demo mode (without token)
npm start

# ✅ Bot API: http://localhost:3002
```

---

## 🤖 **Telegram Bot Setup**

### **📱 Creating a Bot**

1. Send message to **@BotFather**: https://t.me/BotFather
2. Type `/newbot` command
3. Choose bot name: `Blend Sentinel Risk Monitor`
4. Choose username: `blend_sentinel_bot` (or similar)
5. **Copy the token**: `1234567890:ABC-DEF1234ghIkl...`

### **🔑 Token Configuration**

```bash
# Edit .env file
nano telegram-bot/.env

# Add token:
TELEGRAM_BOT_TOKEN=1234567890:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
```

### **🆔 Getting Chat ID**

```bash
# Run chat ID script
cd telegram-bot
node get-chat-id.js

# Send message to your bot on Telegram
# Chat ID will be printed to console: 123456789
```

### **📋 Creating Subscription**

```bash
# Create subscription
curl -X POST http://localhost:3002/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "walletAddress": "YOUR_STELLAR_WALLET_ADDRESS",
    "chatId": "YOUR_CHAT_ID",
    "riskThreshold": 80
  }'
```

### **🧪 Testing Notification**

```bash
# Send test notification
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

## 📱 **Usage**

### **🔗 1. Wallet Connection**

1. Go to **http://localhost:3000/sentinel**
2. Activate your **Freighter wallet** in browser
3. Click **"Connect Wallet"** button
4. **Approve permissions**

### **📊 2. Dashboard Overview**

- **Overall Health Factor** - General position health
- **Active Positions** - Pool-based position details  
- **Risk Scores** - Risk analysis for each position
- **Notification Status** - Last alert status

### **⚠️ 3. Risk Monitoring**

System automatically:
- ✅ **Checks positions every 30 seconds**
- ✅ **Sends Telegram notification when risk score 80+**
- ✅ **Sends emergency alert when Health Factor < 1.2**
- ✅ **Tracks position changes in real-time**

### **📱 4. Telegram Notifications**

Message you receive in high risk situations:

```
🚨 BLEND SENTINEL ALERT

🚨 HIGH RISK WARNING! 1 of your positions has risk score 80+ level.

📊 High Risk Positions:
1. USDC Pool
   💰 Collateral: $100,000
   💸 Debt: $85,000  
   📈 Risk Score: 85/100
   🏥 Health Factor: 1.18

🔗 Check your positions:
http://localhost:3000/sentinel
```

---

## 🔌 **API Reference**

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
# Deploy with Vercel CLI
cd blend-ui
npm install -g vercel
vercel --prod

# Add environment variables:
# NEXT_PUBLIC_BOT_API_URL=https://your-bot-api.com
```

### **☁️ VPS Bot Deployment**

```bash
# Deploy bot to VPS
scp -r telegram-bot/ user@your-server:/opt/blend-sentinel/
ssh user@your-server

cd /opt/blend-sentinel/telegram-bot
npm install --production

# Production deployment with PM2
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

Use [GitHub Issues](https://github.com/your-username/blend-sentinel/issues) for bug reports:

```markdown
**Bug Description:**
Brief description

**Steps to Reproduce:**
1. Go to '...'
2. Click on '....'
3. See error

**Expected Behavior:**
What should have happened

**Screenshots:**
If available

**Environment:**
- OS: [e.g. macOS]
- Browser: [e.g. Chrome]
- Node.js: [e.g. 18.17.0]
```

---

## 📄 **License**

This project is licensed under **MIT License**. See [LICENSE](LICENSE) file for details.

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

This tool is for **informational purposes only** and is **not financial advice**. There are always risks in DeFi protocols:

- 💸 **Smart contract risks** 
- 📉 **Market volatility**
- 🔧 **Technical failures**
- ⚡ **Slippage and MEV**

**Please do your own research** and only use funds you can afford to lose.

---

## 📞 **Contact & Support**

- 🌐 **Website**: [blend-sentinel.com](https://blend-sentinel.com)
- 📱 **Telegram**: [@blend_sentinel_bot](https://t.me/blend_sentinel_bot)
- 🐦 **Twitter**: [@BlendSentinel](https://twitter.com/BlendSentinel)
- 📧 **Email**: [support@blend-sentinel.com](mailto:support@blend-sentinel.com)
- 💬 **Discord**: [Blend Sentinel Community](https://discord.gg/blend-sentinel)

---

## 🙏 **Acknowledgments**

- **[Blend Capital](https://blend.capital/)** - Amazing DeFi protocol on Stellar
- **[Stellar Development Foundation](https://stellar.org/)** - Blockchain infrastructure  
- **[Freighter Wallet](https://freighter.app/)** - Stellar wallet integration
- **[Telegram](https://telegram.org/)** - Notification platform
- **Community contributors** - Beta testers and feedback

---

<div align="center">

**🛡️ Blend Sentinel - Smart risk management for DeFi security on Stellar network**

[![Follow on Twitter](https://img.shields.io/twitter/follow/BlendSentinel?style=social)](https://twitter.com/BlendSentinel)
[![Star on GitHub](https://img.shields.io/github/stars/your-username/blend-sentinel?style=social)](https://github.com/your-username/blend-sentinel)

**⭐ Don't forget to star this project if you like it!**

</div> 