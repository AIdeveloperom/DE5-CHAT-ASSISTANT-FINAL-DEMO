# DE5 Chat Assistant Development TODO

## Project Setup
- [x] Initialize Node.js project with package.json
- [x] Install dependencies: express, axios, cheerio

## Knowledge Base
- [x] Create scraper.js to scrape and extract text from https://de5.tech/
- [x] Create knowledge.js to store and query scraped content

## Backend
- [x] Build server.js with Express server
- [x] Implement /chat endpoint: handle user messages, retrieve knowledge, generate AI response using Hugging Face API
- [x] Implement /lead endpoint: capture user details and store in leads.json
- [x] Add audience detection (keyword-based: issuer, investor, general)
- [x] Add summarization and fallback responses

## Frontend
- [x] Create public/index.html as demo page with embedded chat widget
- [x] Create public/chat.js for frontend chat logic (send messages, display responses)
- [x] Create public/styles.css for chat widget styling

## Testing and Deployment
- [x] Run scraper to populate knowledge base
- [x] Start the server
- [ ] Test chat widget by opening demo page in browser
- [ ] Verify AI responses, knowledge retrieval, and lead capture
