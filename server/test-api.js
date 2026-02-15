require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

async function test() {
  console.log('🔍 Testing NEW Gemini API (@google/genai)...\n');
  console.log('API Key:', process.env.GEMINI_API_KEY?.substring(0, 15) + '...\n');

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: "Say hello in 5 words"
    });

    console.log('✅ SUCCESS!');
    console.log('Response:', response.text);
    console.log('\n🎉 Your setup is working perfectly!\n');

  } catch (error) {
    console.error('❌ ERROR:', error.message);
    console.log('\n🔧 Solutions:');
    console.log('1. Get new key: https://aistudio.google.com/app/apikey');
    console.log('2. Check .env format (no quotes)');
    console.log('3. Try model: gemini-3-flash-preview\n');
  }
}

test();