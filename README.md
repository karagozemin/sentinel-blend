# 🛡️ Blend Sentinel

**Smart risk monitoring for Blend Protocol positions on Stellar**

[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://sentinel-blend.vercel.app/sentinel)
[![Telegram](https://img.shields.io/badge/Telegram-@blend_sentinel_bot-blue)](https://t.me/blend_sentinel_bot)

## 🚀 Quick Start

### Frontend (Next.js)
```bash
cd blend-ui
npm install
npm run dev
```
Open [http://localhost:3000/sentinel](http://localhost:3000/sentinel)

### Telegram Bot (Node.js)
```bash
cd telegram-bot
npm install
npm start
```
Bot runs on [http://localhost:3002](http://localhost:3002)

## 📊 Features

- **Real-time monitoring** of Blend Protocol positions
- **Risk scoring** based on Health Factor and LTV
- **Telegram alerts** for high-risk positions
- **Multi-pool support** with live data
- **Wallet integration** (Freighter)

## 🔧 Setup

1. **Connect Wallet**: Use Freighter wallet extension
2. **Telegram Bot**: Connect via [@blend_sentinel_bot](https://t.me/blend_sentinel_bot)
3. **Risk Monitoring**: Auto-alerts when risk score ≥ 80

## 🏗️ Architecture

- **Frontend**: Next.js + Material-UI + Blend SDK
- **Backend**: Node.js + Express + Telegram Bot API
- **Blockchain**: Stellar SDK integration
- **Alerts**: Real-time Telegram notifications

## 🛡️ Risk Levels

- 🟢 **Low (0-30)**: Safe position
- 🟡 **Medium (31-70)**: Monitor closely  
- 🔴 **High (71-100)**: Liquidation risk - immediate action needed

## 🌐 Live Demo

- **Dashboard**: [https://sentinel-blend.vercel.app/sentinel](https://sentinel-blend.vercel.app/sentinel)
- **Telegram**: [@blend_sentinel_bot](https://t.me/blend_sentinel_bot)
