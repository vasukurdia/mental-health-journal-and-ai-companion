import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/layout/Navbar';
import ChatMessage from '../components/chatbot/ChatMessage';
import ChatInput from '../components/chatbot/ChatInput';
import { chatService } from '../services/chatService';
import toast from 'react-hot-toast';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchChatHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchChatHistory = async () => {
    try {
      const data = await chatService.getChatHistory();
      setMessages(data.data.messages || []);
    } catch (error) {
      console.error('Failed to load chat history');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message immediately
    const userMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await chatService.sendMessage(message);
      
      // Add assistant message
      const assistantMessage = {
        role: 'assistant',
        content: response.data.assistantMessage,
        timestamp: response.data.timestamp
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      toast.error('Failed to send message');
      // Remove user message on error
      setMessages(prev => prev.filter(m => m !== userMessage));
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = async () => {
    if (!window.confirm('Are you sure you want to clear your chat history?')) return;

    try {
      await chatService.clearChatHistory();
      setMessages([]);
      toast.success('Chat history cleared');
    } catch (error) {
      toast.error('Failed to clear chat history');
    }
  };

  if (initialLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              AI Mental Health Companion
            </h1>
            <p className="text-gray-600">
              Share your thoughts and feelings in a safe, supportive space
            </p>
          </div>
          {messages.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Clear History
            </button>
          )}
        </div>

        <div className="card min-h-150 flex flex-col">
          {messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Start a Conversation
                </h3>
                <p className="text-gray-500 mb-4">
                  I'm here to listen and support you. Feel free to share what's on your mind.
                </p>
                <div className="space-y-2 text-sm text-left bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium text-gray-700">You can talk about:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Your feelings and emotions</li>
                    <li>Daily stressors and challenges</li>
                    <li>Coping strategies and techniques</li>
                    <li>Personal growth and goals</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {loading && (
                <div className="flex items-start gap-3">
                  <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                    🤖
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          <ChatInput onSend={handleSendMessage} disabled={loading} />
        </div>

        <div className="mt-4 text-xs text-gray-500 text-center">
          <p>
            💡 This AI companion is for support only and is not a substitute for professional mental health care.
            If you're in crisis, please contact a mental health professional or emergency services.
          </p>
        </div>
      </div>
    </>
  );
};

export default ChatbotPage;