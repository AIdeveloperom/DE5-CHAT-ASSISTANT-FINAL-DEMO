
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const KnowledgeBase = require('./knowledge');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const knowledgeBase = new KnowledgeBase();

// Function to detect audience
function detectAudience(message) {
  const lowerMsg = message.toLowerCase();
  if (lowerMsg.includes('invest') || lowerMsg.includes('token') || lowerMsg.includes('opportunity')) {
    return 'investor';
  } else if (lowerMsg.includes('issuer') || lowerMsg.includes('sme') || lowerMsg.includes('business') || lowerMsg.includes('tokenize')) {
    return 'issuer';
  }
  return 'general';
}

// Function to generate AI response using Hugging Face
async function generateAIResponse(context, userMessage) {
  try {
    const prompt = `You are a friendly AI chat assistant for DE5, a blockchain-powered tokenization platform. Answer based on this context: ${context}. User: ${userMessage}. Response:`;
    const response = await axios.post('https://api-inference.huggingface.co/models/gpt2', {
      inputs: prompt,
      parameters: { max_length: 150, temperature: 0.7 }
    });
    return response.data[0].generated_text.replace(prompt, '').trim();
  } catch (error) {
    console.error('AI generation error:', error);
    // Fallback to simple response based on knowledge
    if (context.toLowerCase().includes('de5')) {
      return 'DE5 is building an AI and blockchain-powered tokenization platform that democratizes capital access, creates liquidity, and supports a more inclusive financial ecosystem.';
    }
    return 'I\'m sorry, I couldn\'t generate a response right now. Please check our whitepaper for more details.';
  }
}

// Chat endpoint
app.post('/chat', async (req, res) => {
  const { message } = req.body;
  const audience = detectAudience(message);

  // Retrieve knowledge
  const knowledgeResults = knowledgeBase.search(message);
  const context = knowledgeResults.join(' ');

  // Generate AI response
  let aiResponse = await generateAIResponse(context, message);
  console.log('AI Response:', aiResponse);
  // Always use fallback for now since AI is failing
  if (message.toLowerCase().includes('what is de5') || message.toLowerCase().includes('de5')) {
    aiResponse = 'DE5 is building an AI and blockchain-powered tokenization platform that democratizes capital access, creates liquidity, and supports a more inclusive financial ecosystem.';
  } else if (message.toLowerCase().includes('token') || message.toLowerCase().includes('invest')) {
    aiResponse = 'DE5 enables tokenization of assets for better liquidity and investment opportunities.';
  } else {
    aiResponse = 'I\'m here to help with questions about DE5. Please check our whitepaper for more details.';
  }

  // Tailor response based on audience
  let tailoredResponse = aiResponse;
  if (audience === 'investor') {
    tailoredResponse += ' As an investor, you might be interested in our token opportunities. Would you like more details?';
  } else if (audience === 'issuer') {
    tailoredResponse += ' For issuers, DE5 helps tokenize assets for liquidity. Interested in learning more?';
  }

  res.json({ response: tailoredResponse, audience });
});

// Lead capture endpoint
app.post('/lead', (req, res) => {
  const { name, email, inquiry } = req.body;
  const lead = { name, email, inquiry, timestamp: new Date().toISOString() };

  // Store in leads.json
  let leads = [];
  try {
    leads = JSON.parse(fs.readFileSync('leads.json', 'utf8'));
  } catch (e) {
    // File doesn't exist or is empty
  }
  leads.push(lead);
  fs.writeFileSync('leads.json', JSON.stringify(leads, null, 2));

  res.json({ success: true, message: 'Lead captured successfully.' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
