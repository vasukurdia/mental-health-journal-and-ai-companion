const { GoogleGenAI } = require('@google/genai');

class GeminiService {
  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });
  }

  async generateResponse(userMessage, conversationHistory = []) {
    try {
      const systemPrompt = 'You are a compassionate mental health assistant. Provide supportive responses under 200 words.';
      
      let context = '';
      if (conversationHistory.length > 0) {
        context = conversationHistory.slice(-6)
          .map(msg => `${msg.role}: ${msg.content}`)
          .join('\n');
      }

      const fullPrompt = `${systemPrompt}\n\n${context ? context + '\n\n' : ''}User: ${userMessage}\n\nAssistant:`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt
      });

      return response.text;
    } catch (error) {
      console.error('Gemini Error:', error.message);
      return "I'm having trouble right now. Please try again.";
    }
  }
}

module.exports = new GeminiService();