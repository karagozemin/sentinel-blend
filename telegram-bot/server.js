const express = require('express');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <h2>🚀 Blend Sentinel Bot Aktif!</h2>
    <p>Bu bot, Blend protokolü üzerindeki riskleri takip eder ve Telegram ile uyarı gönderir.</p>
    <ul>
      <li><a href="/health">API Durumu</a></li>
      <li><a href="https://t.me/blend_sentinel_bot">Telegram Botunu Aç</a></li>
      <li><a href="https://github.com/your-repo-url">GitHub Projesi</a></li>
    </ul>
  `);
});





// Telegram Bot Setup
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'DEMO_TOKEN';
let bot = null;

// Only initialize bot if we have a valid token
if (BOT_TOKEN !== 'DEMO_TOKEN') {
  try {
    bot = new TelegramBot(BOT_TOKEN, { polling: true });
    
    // Handle polling errors gracefully
    bot.on('polling_error', (error) => {
      console.log('⚠️ Telegram polling error:', error.message);
      console.log('🔧 Check your TELEGRAM_BOT_TOKEN in .env file');
    });
    
  } catch (error) {
    console.log('❌ Failed to initialize Telegram bot:', error.message);
    bot = null;
  }
}

// In-memory storage for demo purposes (use database in production)
const userSubscriptions = new Map();
const notifications = [];
const authSessions = new Map(); // Store pending auth sessions

// Demo mode chat simulation
const simulateDemoAuth = (authToken) => {
  console.log(`🎭 [DEMO MODE] Simulating Telegram auth for token: ${authToken}`);
  
  setTimeout(() => {
    const authSession = authSessions.get(authToken);
    
    if (authSession && !authSession.completed) {
      // Simulate successful auth
      const demoChat = `demo_chat_${Date.now()}`;
      
      authSession.chatId = demoChat;
      authSession.completed = true;
      authSession.completedAt = new Date().toISOString();
      
      // Create mock user info for demo
      const mockUserInfo = {
        id: 123456789,
        first_name: 'Demo',
        last_name: 'User',
        username: 'demo_user',
        language_code: 'en'
      };
      
      // Subscribe user automatically with mock user info
      userSubscriptions.set(authSession.walletAddress, {
        chatId: demoChat,
        riskThreshold: 80,
        createdAt: new Date().toISOString(),
        lastNotification: null,
        isActive: true,
        userInfo: mockUserInfo
      });
      
      console.log(`✅ [DEMO MODE] Auth completed: ${authSession.walletAddress} -> ${mockUserInfo.first_name} (@${mockUserInfo.username}) - Chat ID: ${demoChat}`);
      console.log(`🎉 [DEMO MODE] User would see: "Welcome to Blend Sentinel, Demo! Wallet connected successfully!"`);
    }
  }, 3000); // Simulate 3 second delay
};

// Telegram Bot Commands (only if bot is available)
if (bot) {
  // Handle /start command
  bot.onText(/\/start(.*)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const authToken = match[1]?.trim();
    
    if (authToken) {
      // User clicked auth link from frontend
      const authSession = authSessions.get(authToken);
      
      if (authSession && !authSession.completed) {
        // Complete the auth
        authSession.chatId = chatId;
        authSession.completed = true;
        authSession.completedAt = new Date().toISOString();
        
        // Store user info from Telegram
        const userInfo = {
          id: msg.from.id,
          first_name: msg.from.first_name,
          last_name: msg.from.last_name || '',
          username: msg.from.username || '',
          language_code: msg.from.language_code || 'en'
        };
        
        // Subscribe user automatically with user info
        userSubscriptions.set(authSession.walletAddress, {
          chatId,
          riskThreshold: 80,
          createdAt: new Date().toISOString(),
          lastNotification: null,
          isActive: true,
          userInfo: userInfo
        });
        
        console.log(`✅ Auth completed: ${authSession.walletAddress} -> ${userInfo.first_name} (@${userInfo.username || 'no_username'}) - Chat ID: ${chatId}`);
        
        // Create display name for user
        const displayName = userInfo.username ? `@${userInfo.username}` : userInfo.first_name;
        
        await bot.sendMessage(chatId, 
          `🎉 *Welcome to Blend Sentinel, ${userInfo.first_name}!*\n\n` +
          `✅ Your wallet has been successfully connected!\n` +
          `📬 You'll receive risk alerts when your positions need attention.\n\n` +
          `🔗 *Wallet:* \`${authSession.walletAddress.slice(0, 8)}...${authSession.walletAddress.slice(-8)}\`\n\n` +
          `🚨 *Alert Threshold:* Risk Score ≥ 80\n\n` +
          `You can now close this chat and return to the Blend Sentinel app.`,
          { parse_mode: 'Markdown' }
        );
        
      } else {
        await bot.sendMessage(chatId, 
          `❌ *Invalid or expired auth link*\n\n` +
          `Please generate a new connection link from the Blend Sentinel app.`,
          { parse_mode: 'Markdown' }
        );
      }
    } else {
      // Regular start command
      await bot.sendMessage(chatId, 
        `🤖 *Welcome to Blend Sentinel Bot!*\n\n` +
        `This bot monitors your DeFi positions on Blend Protocol and sends you risk alerts.\n\n` +
        `🔗 To connect your wallet, please visit:\n` +
        `${process.env.FRONTEND_URL || 'http://localhost:3000'}/sentinel\n\n` +
        `Click "Connect to Telegram" and follow the instructions.`,
        { parse_mode: 'Markdown' }
      );
    }
  });
  
  // Handle other messages
  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    
    // Skip if it's a command
    if (msg.text && msg.text.startsWith('/')) return;
    
    await bot.sendMessage(chatId, 
      `🤖 *Blend Sentinel Bot*\n\n` +
      `I only respond to wallet connection requests.\n\n` +
      `🔗 To connect your wallet, visit:\n` +
      `${process.env.FRONTEND_URL || 'http://localhost:3000'}/sentinel`,
      { parse_mode: 'Markdown' }
    );
  });
  
  console.log('🤖 Telegram bot commands initialized');
}

// API Routes

// Start auth session
app.post('/api/auth/start', (req, res) => {
  const { walletAddress } = req.body;
  
  if (!walletAddress) {
    return res.status(400).json({ 
      error: 'walletAddress is required' 
    });
  }

  // Generate unique auth token
  const authToken = `auth_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Create auth session
  authSessions.set(authToken, {
    walletAddress,
    createdAt: new Date().toISOString(),
    completed: false,
    chatId: null
  });
  
  // Clean up session after 10 minutes
  setTimeout(() => {
    if (authSessions.has(authToken)) {
      authSessions.delete(authToken);
    }
  }, 10 * 60 * 1000);
  
  console.log(`🔑 Auth session started for ${walletAddress}: ${authToken}`);
  
  // If no real bot available, start demo simulation
  const isRealBot = BOT_TOKEN !== 'DEMO_TOKEN' && bot !== null;
  if (!isRealBot) {
    console.log(`🎭 [DEMO MODE] Starting demo auth simulation...`);
    simulateDemoAuth(authToken);
  }
  
  const botUsername = process.env.TELEGRAM_BOT_USERNAME || 'blend_sentinel_bot';
  const telegramUrl = `https://t.me/${botUsername}?start=${authToken}`;
  
  res.json({ 
    success: true, 
    authToken,
    telegramUrl,
    expiresIn: 600, // 10 minutes
    demoMode: !isRealBot
  });
});

// Check auth status
app.get('/api/auth/status/:authToken', (req, res) => {
  const { authToken } = req.params;
  
  const authSession = authSessions.get(authToken);
  
  if (!authSession) {
    return res.status(404).json({ 
      error: 'Auth session not found or expired' 
    });
  }
  
  let displayName = null;
  if (authSession.completed) {
    // Get user info from subscription
    const subscription = userSubscriptions.get(authSession.walletAddress);
    if (subscription && subscription.userInfo) {
      const userInfo = subscription.userInfo;
      displayName = userInfo.username ? `@${userInfo.username}` : userInfo.first_name || 'Telegram User';
    }
  }
  
  res.json({ 
    success: true, 
    completed: authSession.completed,
    walletAddress: authSession.walletAddress,
    chatId: authSession.chatId,
    createdAt: authSession.createdAt,
    completedAt: authSession.completedAt || null,
    displayName: displayName
  });
});

// Health check
app.get('/health', (req, res) => {
  const isRealBot = BOT_TOKEN !== 'DEMO_TOKEN' && bot !== null;
  
  res.json({ 
    status: 'ok', 
    service: 'Blend Sentinel Telegram Bot',
    botConnected: isRealBot,
    demoMode: !isRealBot,
    botToken: BOT_TOKEN === 'DEMO_TOKEN' ? 'DEMO_TOKEN' : 'SET',
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
  
  // Create display name for frontend
  const userInfo = subscription.userInfo || {};
  const displayName = userInfo.username ? `@${userInfo.username}` : userInfo.first_name || 'Telegram User';
  
  res.json({ 
    success: true, 
    subscription: {
      ...subscription,
      walletAddress,
      displayName: displayName
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

// Telegram Login Widget endpoint
app.post('/api/telegram-login', (req, res) => {
  const { walletAddress, telegramUser } = req.body;
  
  if (!walletAddress || !telegramUser) {
    return res.status(400).json({ 
      error: 'walletAddress and telegramUser are required' 
    });
  }

  // Verify required Telegram user fields
  if (!telegramUser.id || !telegramUser.first_name) {
    return res.status(400).json({ 
      error: 'Invalid Telegram user data' 
    });
  }

  // Create user info object
  const userInfo = {
    id: telegramUser.id,
    first_name: telegramUser.first_name,
    last_name: telegramUser.last_name || '',
    username: telegramUser.username || '',
    photo_url: telegramUser.photo_url || '',
    auth_date: telegramUser.auth_date,
    hash: telegramUser.hash
  };
  
  // Create display name
  const displayName = userInfo.username ? `@${userInfo.username}` : userInfo.first_name;

  // Create subscription
  userSubscriptions.set(walletAddress, {
    chatId: telegramUser.id.toString(),
    riskThreshold: 80,
    createdAt: new Date().toISOString(),
    lastNotification: null,
    isActive: true,
    userInfo: userInfo
  });

  console.log(`✅ Telegram Login: ${walletAddress} -> ${userInfo.first_name} (${displayName}) - User ID: ${telegramUser.id}`);
  
  res.json({ 
    success: true, 
    message: 'Successfully connected via Telegram Login',
    displayName: displayName,
    subscription: {
      walletAddress,
      chatId: telegramUser.id.toString(),
      riskThreshold: 80,
      userInfo: userInfo
    }
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