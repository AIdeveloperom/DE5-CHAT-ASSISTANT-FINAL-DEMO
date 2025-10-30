const axios = require('axios');

async function testChat(message) {
  try {
    const response = await axios.post('http://localhost:3000/chat', {
      message: message
    });
    console.log(`Message: "${message}"`);
    console.log('Response:', response.data);
    console.log('---');
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

async function testLead() {
  try {
    const response = await axios.post('http://localhost:3000/lead', {
      name: 'John Doe',
      email: 'john@example.com',
      inquiry: 'Interested in investing'
    });
    console.log('Lead Response:', response.data);
  } catch (error) {
    console.error('Lead Error:', error.response ? error.response.data : error.message);
  }
}

async function runTests() {
  console.log('Testing Chat Responses:');
  await testChat('What is DE5?');
  await testChat('I want to invest in tokens');
  await testChat('I am an SME looking to tokenize assets');
  await testChat('Tell me about the roadmap');

  console.log('Testing Lead Capture:');
  await testLead();
}

runTests();
