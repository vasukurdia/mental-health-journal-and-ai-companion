const { GoogleGenAI } = require('@google/genai');

class GeminiService {
  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });
  }

  async generateResponse(userMessage, conversationHistory = []) {
    try {

      const systemPrompt = `
You are a compassionate mental health assistant. Provide supportive responses under 200 words.

You may provide general information about any country.

However, when the user message involves crisis support, emotional distress,
mental health emergencies, self-harm, suicidal thoughts, abuse, violence,
or any situation requiring real-world help or intervention:

→ Always provide ONLY India-specific support details.
→ Do NOT provide helpline numbers, crisis contacts, or emergency services from any country other than India.
→ Mention Indian helplines such as:
   - Aasra 24x7 Helpline: +91 9820466726
   - iCall: +91 9152987821
   - KIRAN Mental Health Helpline: 1800-599-0019
   - Emergency: Dial 112
→ Keep tone empathetic, supportive, non-judgmental.
→ Encourage reaching out to trusted people and nearby medical help.
      `;

      let context = '';
      if (conversationHistory.length > 0) {
        context = conversationHistory.slice(-6)
          .map(msg => `${msg.role}: ${msg.content}`)
          .join('\n');
      }

      const fullPrompt = `${systemPrompt}\n\n${context ? context + '\n\n' : ''}User: ${userMessage}\n\nAssistant:`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: fullPrompt
      });

      return response.text;
    } catch (error) {
      console.error('Gemini Error:', error.message);
      return "I'm having trouble right now. Please try again later.";
    }
  }
}

module.exports = new GeminiService();