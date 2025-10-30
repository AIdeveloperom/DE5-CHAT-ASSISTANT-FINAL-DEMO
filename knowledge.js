const fs = require('fs');

class KnowledgeBase {
  constructor(filePath = 'knowledge.txt') {
    this.filePath = filePath;
    this.content = '';
    this.loadContent();
  }

  loadContent() {
    try {
      this.content = fs.readFileSync(this.filePath, 'utf8');
    } catch (error) {
      console.error('Error loading knowledge base:', error);
      this.content = '';
    }
  }

  search(query) {
    const lowerQuery = query.toLowerCase();
    const lines = this.content.split('\n');
    const results = lines.filter(line =>
      line.toLowerCase().includes(lowerQuery)
    );
    return results.slice(0, 10); // Limit to top 10 results
  }

  getSummary(section) {
    const results = this.search(section);
    if (results.length > 0) {
      return results.join(' ').substring(0, 500) + '...'; // Summary up to 500 chars
    }
    return 'No information available on that topic.';
  }

  getAllContent() {
    return this.content;
  }
}

module.exports = KnowledgeBase;
