const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function scrapeWebsite(url) {
  try {
    const response = await axios.get(url, { httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }) });
    const $ = cheerio.load(response.data);
    let content = '';

    // Extract text from main content areas
    $('h1, h2, h3, h4, h5, h6, p, li, div, span, a').each((i, elem) => {
      const text = $(elem).text().trim();
      if (text && text.length > 10) { // Filter out short texts
        content += text + '\n';
      }
    });

    // Also extract meta descriptions
    const description = $('meta[name="description"]').attr('content');
    if (description) {
      content += 'Description: ' + description + '\n';
    }

    // Save to file
    fs.writeFileSync('knowledge.txt', content);
    console.log('Knowledge base scraped and saved to knowledge.txt');
    console.log('Content length:', content.length);
  } catch (error) {
    console.error('Error scraping website:', error);
  }
}

// Scrape DE5 website
scrapeWebsite('https://de5.tech/');
