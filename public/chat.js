const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const leadForm = document.getElementById('lead-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const inquirySelect = document.getElementById('inquiry');
const submitLeadButton = document.getElementById('submit-lead');

let showLeadForm = false;

function addMessage(message, isUser = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
  messageDiv.textContent = message;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;

  addMessage(message, true);
  chatInput.value = '';

  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    addMessage(data.response);

    // Show lead form if response suggests interest
    if (data.response.includes('interested') || data.response.includes('details')) {
      leadForm.style.display = 'block';
    }
  } catch (error) {
    addMessage('Sorry, I couldn\'t connect to the server. Please try again.');
  }
}

async function submitLead() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const inquiry = inquirySelect.value;

  if (!name || !email) {
    alert('Please fill in all fields.');
    return;
  }

  try {
    const response = await fetch('/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, inquiry })
    });
    const data = await response.json();
    if (data.success) {
      addMessage('Thank you! Our team will follow up with you soon.');
      leadForm.style.display = 'none';
      nameInput.value = '';
      emailInput.value = '';
    }
  } catch (error) {
    addMessage('Sorry, there was an error submitting your information.');
  }
}

sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

submitLeadButton.addEventListener('click', submitLead);

// Initial greeting
addMessage('Hello! I\'m the DE5 assistant. How can I help you today?');
