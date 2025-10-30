# DE5 Chat Assistant

## Overview
DE5 is building an AI and blockchain-powered tokenization platform that democratizes capital access, creates liquidity, and supports a more inclusive financial ecosystem. This project implements an AI-powered chat assistant for the DE5 website to help visitors understand DE5’s mission, offerings, and whitepaper insights in a conversational way.

## Features
- **Interactive Chat Widget**: Embeddable chat widget on the DE5 website.
- **Knowledge Retrieval**: Answers questions based on scraped website content and predefined knowledge.
- **Audience Adaptation**: Tailors responses for issuers, investors, and general public.
- **Lead Capture**: Collects user contact details when they express interest.
- **AI Integration**: Uses Hugging Face Inference API for generating responses (free tier).
- **Fallback Handling**: Provides friendly responses when information is unavailable.

## Architecture
- **Frontend**: HTML, CSS, JavaScript chat widget.
- **Backend**: Node.js Express server handling chat logic, knowledge base, and lead storage.
- **Knowledge Base**: Scraped text from https://de5.tech/ stored in knowledge.txt.
- **AI**: Hugging Face API for text generation.
- **Storage**: Leads stored in leads.json.

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/AIdeveloperom/DE5-CHAT-ASSISTANT-FINAL-DEMO.git
   cd DE5-CHAT-ASSISTANT-FINAL-DEMO
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Scrape knowledge base:
   ```
   npm run scrape
   ```
4. Start the server:
   ```
   npm start
   ```
5. Open http://localhost:3000 in your browser to test the demo page.

## Usage
- The chat widget is embedded in public/index.html.
- Send POST requests to /chat with JSON {"message": "your question"}.
- For lead capture, POST to /lead with {"name": "", "email": "", "inquiry": ""}.

## Testing
- Server runs on http://localhost:3000.
- Test chat endpoint with curl or browser.
- Verify AI responses, knowledge retrieval, and lead capture.

## Deployment
- Deploy the Node.js server to a hosting service like Heroku or Vercel.
- Embed the chat widget script in the DE5 website.

## Future Enhancements
- Multilingual support.
- Integration with Discord/Telegram.
- Advanced AI analytics.

## License
MIT License.
