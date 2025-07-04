const express = require('express');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Telegram Bot Setup
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'DEMO_TOKEN';
const bot = BOT_TOKEN !== 'DEMO_TOKEN' ? new TelegramBot(BOT_TOKEN, { polling: false }) : null;

// In-memory storage for demo purposes (use database in production)
const userSubscriptions = new Map();
const notifications = [];

// API Routes

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'Blend Sentinel Telegram Bot',
    botConnected: !!bot,
    timestamp: new Date().toISOString()
  });
});

// Subscribe to notifications
app.post('/api/subscribe', (req, res) => {
  const { walletAddress, chatId, riskThreshold = 80 } = req.body;
  
  if (!walletAddress || !chatId) {
    return res.status(400).json({ 
      error: 'walletAddress and chatId are required' 
    });
  }

  userSubscriptions.set(walletAddress, {
    chatId,
    riskThreshold,
    createdAt: new Date().toISOString(),
    lastNotification: null,
    isActive: true
  });

  console.log(`✅ User subscribed: ${walletAddress} -> Chat ID: ${chatId}`);
  
  res.json({ 
    success: true, 
    message: 'Successfully subscribed to risk notifications',
    subscription: {
      walletAddress,
      chatId,
      riskThreshold
    }
  });
});

// Send risk notification
app.post('/api/notify', async (req, res) => {
  const { walletAddress, message, positions, riskLevel = 'high' } = req.body;
  
  if (!walletAddress || !message) {
    return res.status(400).json({ 
      error: 'walletAddress and message are required' 
    });
  }

  const subscription = userSubscriptions.get(walletAddress);
  
  if (!subscription || !subscription.isActive) {
    return res.status(404).json({ 
      error: 'No active subscription found for this wallet' 
    });
  }

  const notification = {
    id: Date.now().toString(),
    walletAddress,
    chatId: subscription.chatId,
    message,
    positions: positions || [],
    riskLevel,
    timestamp: new Date().toISOString(),
    status: 'pending'
  };

  // Demo mode - just log the notification
  if (!bot) {
    console.log('🤖 [DEMO MODE] Telegram Notification:');
    console.log('📧 Chat ID:', notification.chatId);
    console.log('💬 Message:', notification.message);
    console.log('📊 Positions:', notification.positions.length);
    console.log('⚠️ Risk Level:', notification.riskLevel);
    console.log('---');
    
    notification.status = 'sent_demo';
    notifications.push(notification);
    
    return res.json({ 
      success: true, 
      message: 'Demo notification logged successfully',
      notification: {
        id: notification.id,
        status: 'sent_demo',
        timestamp: notification.timestamp
      }
    });
  }

  // Real Telegram bot sending
  try {
    const formatMessage = (msg, positions) => {
      let formattedMsg = `🚨 *BLEND SENTINEL ALERT*\n\n${msg}\n\n`;
      
      if (positions && positions.length > 0) {
        formattedMsg += `📊 *High Risk Positions:*\n`;
        positions.forEach((pos, index) => {
          formattedMsg += `${index + 1}. ${pos.poolName}\n`;
          formattedMsg += `   💰 Collateral: $${pos.collateral.toLocaleString()}\n`;
          formattedMsg += `   💸 Debt: $${pos.debt.toLocaleString()}\n`;
          formattedMsg += `   📈 Risk Score: ${pos.riskScore.toFixed(0)}/100\n`;
          formattedMsg += `   🏥 Health Factor: ${pos.healthFactor > 99 ? '∞' : pos.healthFactor.toFixed(2)}\n\n`;
        });
      }
      
      formattedMsg += `🔗 *Check your positions:*\n`;
      formattedMsg += `${process.env.FRONTEND_URL || 'http://localhost:3000'}/sentinel`;
      
      return formattedMsg;
    };

    await bot.sendMessage(
      subscription.chatId, 
      formatMessage(message, positions),
      { parse_mode: 'Markdown' }
    );

    notification.status = 'sent';
    notifications.push(notification);
    
    // Update last notification time
    subscription.lastNotification = notification.timestamp;
    userSubscriptions.set(walletAddress, subscription);

    console.log(`✅ Telegram notification sent to ${subscription.chatId}`);
    
    res.json({ 
      success: true, 
      message: 'Notification sent successfully',
      notification: {
        id: notification.id,
        status: 'sent',
        timestamp: notification.timestamp
      }
    });

  } catch (error) {
    console.error('❌ Telegram send error:', error);
    
    notification.status = 'failed';
    notification.error = error.message;
    notifications.push(notification);
    
    res.status(500).json({ 
      error: 'Failed to send telegram notification',
      details: error.message 
    });
  }
});

// Get user subscription info
app.get('/api/subscription/:walletAddress', (req, res) => {
  const { walletAddress } = req.params;
  const subscription = userSubscriptions.get(walletAddress);
  
  if (!subscription) {
    return res.status(404).json({ 
      error: 'No subscription found for this wallet' 
    });
  }
  
  res.json({ 
    success: true, 
    subscription: {
      ...subscription,
      walletAddress
    }
  });
});

// Get notification history
app.get('/api/notifications/:walletAddress', (req, res) => {
  const { walletAddress } = req.params;
  const userNotifications = notifications
    .filter(n => n.walletAddress === walletAddress)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 50); // Last 50 notifications
  
  res.json({ 
    success: true, 
    notifications: userNotifications 
  });
});

// Unsubscribe
app.delete('/api/subscription/:walletAddress', (req, res) => {
  const { walletAddress } = req.params;
  
  if (userSubscriptions.has(walletAddress)) {
    userSubscriptions.delete(walletAddress);
    console.log(`❌ User unsubscribed: ${walletAddress}`);
    
    res.json({ 
      success: true, 
      message: 'Successfully unsubscribed from notifications' 
    });
  } else {
    res.status(404).json({ 
      error: 'No subscription found for this wallet' 
    });
  }
});

// Admin stats
app.get('/api/admin/stats', (req, res) => {
  res.json({
    totalSubscriptions: userSubscriptions.size,
    totalNotifications: notifications.length,
    activeSubscriptions: Array.from(userSubscriptions.values()).filter(s => s.isActive).length,
    recentNotifications: notifications
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10)
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: error.message 
  });
});

// Start server
app.listen(port, () => {
  console.log('🚀 Blend Sentinel Telegram Bot API started');
  console.log(`📡 Server running on port ${port}`);
  console.log(`🤖 Bot status: ${bot ? 'Connected' : 'Demo Mode'}`);
  
  if (!bot) {
    console.log('⚠️  Set TELEGRAM_BOT_TOKEN environment variable to enable real bot');
  }
  
  console.log('---');
}); 