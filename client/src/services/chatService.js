import api from './api';

export const chatService = {
  // Send message to AI chatbot
  sendMessage: async (message) => {
    const response = await api.post('/chat/message', { message });
    return response.data;
  },

  // Get chat history
  getChatHistory: async () => {
    const response = await api.get('/chat/history');
    return response.data;
  },

  // Clear chat history
  clearChatHistory: async () => {
    const response = await api.delete('/chat/history');
    return response.data;
  },

  // Export chat history (optional - client-side function)
  exportChatHistory: async () => {
    try {
      const response = await api.get('/chat/history');
      const chatData = response.data.data;
      
      // Convert to JSON and create download
      const dataStr = JSON.stringify(chatData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const url = window.URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `chat-history-${new Date().toISOString()}.json`;
      link.click();
      
      window.URL.revokeObjectURL(url);
      return true;
    } catch (error) {
      console.error('Export failed:', error);
      throw error;
    }
  }
};