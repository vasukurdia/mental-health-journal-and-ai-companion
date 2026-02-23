const ChatHistory = require('../models/ChatHistory');
const geminiService = require('../services/geminiService');

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    let chatHistory = await ChatHistory.findOne({ user: req.user._id });
    
    if (!chatHistory) {
      chatHistory = new ChatHistory({
        user: req.user._id,
        messages: []
      });
    }

    chatHistory.messages.push({
      role: 'user',
      content: message
    });

    chatHistory.lastActive = Date.now();

    const aiResponse = await geminiService.generateResponse(message);

    chatHistory.messages.push({
      role: 'assistant',
      content: aiResponse
    });

    await chatHistory.save();

    res.json({
      success: true,
      data: {
        userMessage: message,
        assistantMessage: aiResponse,
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Failed to process message' 
    });
  }
};

const getChatHistory = async (req, res) => {
  try {
    const chatHistory = await ChatHistory.findOne({ user: req.user._id });

    if (!chatHistory) {
      return res.json({
        success: true,
        data: { messages: [] }
      });
    }

    res.json({
      success: true,
      data: {
        messages: chatHistory.messages,
        sessionStarted: chatHistory.sessionStarted,
        lastActive: chatHistory.lastActive
      }
    });
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

const clearChatHistory = async (req, res) => {
  try {
    await ChatHistory.deleteOne({ user: req.user._id });

    res.json({
      success: true,
      message: 'Chat history cleared successfully'
    });
  } catch (error) {
    console.error('Clear chat history error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

module.exports = {
  sendMessage,
  getChatHistory,
  clearChatHistory
};