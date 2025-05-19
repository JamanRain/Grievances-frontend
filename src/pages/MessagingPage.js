import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MessagingPage.css';

function MessagingPage({ username }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const receiver = username === "Mimansa" ? "Raman169" : "Mimansa";

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // Poll every 3s
    return () => clearInterval(interval);
  }, []);

const fetchMessages = () => {
  const receiver = username === "Mimansa" ? "Raman169" : "Mimansa";

  axios.get(`https://grievances-backend.onrender.com/api/messages?sender=${username}&receiver=${receiver}`)
    .then(res => setMessages(res.data))
    .catch(err => console.error('Failed to fetch messages', err));
};

const sendMessage = () => {
  if (!newMessage.trim()) return;

  const receiver = username === "Mimansa" ? "Raman169" : "Mimansa";

  axios.post('https://grievances-backend.onrender.com/api/messages', {
    sender: username,
    receiver,
    content: newMessage
  }).then(() => {
    setNewMessage('');
    fetchMessages();
  }).catch(err => console.error('Failed to send message', err));
};


  return (
    <div className="messaging-page">
      <div className="chat-header">💬 Chat with {receiver} 💖</div>
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-bubble ${msg.sender === username ? 'sent' : 'received'}`}
          >
            <span>{msg.content}</span>
            <div className="meta">{msg.sender} • {new Date(msg.timestamp).toLocaleTimeString()}</div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your lovely message... 💌"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send 💘</button>
      </div>
    </div>
  );
}

export default MessagingPage;

