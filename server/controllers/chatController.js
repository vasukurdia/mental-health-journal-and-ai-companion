const ChatHistory = require('../models/ChatHistory');
const geminiService = require('../services/geminiService');

// @desc    Send message to chatbot
// @route   POST /api/chat/message
// @access  Private
const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    // Get or create chat history for user
    let chatHistory = await ChatHistory.findOne({ user: req.user._id });
    
    if (!chatHistory) {
      chatHistory = new ChatHistory({
        user: req.user._id,
        messages: []
      });
    }

    // Add user message to history
    chatHistory.messages.push({
      role: 'user',
      content: message
    });

    // Update last active timestamp
    chatHistory.lastActive = Date.now();

    // Generate AI response (simple, without conversation history to avoid issues)
    const aiResponse = await geminiService.generateResponse(message);

    // Add assistant response to history
    chatHistory.messages.push({
      role: 'assistant',
      content: aiResponse
    });

    // Save chat history
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

// @desc    Get chat history
// @route   GET /api/chat/history
// @access  Private
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

// @desc    Clear chat history
// @route   DELETE /api/chat/history
// @access  Private
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