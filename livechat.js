// Send message when the Send button is clicked
document.getElementById('sendButton').addEventListener('click', sendMessage);

// Allow sending message on Enter key press
document.getElementById('chatInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  const input = document.getElementById('chatInput');
  const messageText = input.value.trim();
  if (messageText !== '') {
    const chatMessages = document.getElementById('chatMessages');
    
    // Create and append user's message
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'sent');
    messageDiv.innerHTML = `<p>${messageText}</p><span class="timestamp">${getCurrentTime()}</span>`;
    chatMessages.appendChild(messageDiv);
    
    input.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Optionally, simulate a response after a delay
    setTimeout(simulateResponse, 1500);
  }
}

function simulateResponse() {
  const chatMessages = document.getElementById('chatMessages');
  
  // Create and append a simulated response message
  const responseDiv = document.createElement('div');
  responseDiv.classList.add('message', 'received');
  responseDiv.innerHTML = `<p>Thank you for your message! We will get back to you shortly.</p><span class="timestamp">${getCurrentTime()}</span>`;
  chatMessages.appendChild(responseDiv);
  
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}
