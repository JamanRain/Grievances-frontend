import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage({ onLogin, waiting, nameTyped }) {
  const [name, setName] = useState('');

  const handleClick = () => {
    if (name.trim()) {
      onLogin(name);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>💌 Welcome to the Grievance Portal 💖</h1>
        <input
          type="text"
          placeholder="Enter your name 💕"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleClick}>Login 💘</button>

        {waiting && nameTyped === "Mimansa" && (
          <div className="wait-message">
            <p>💭 Logging you in, please wait my cute complain queen... 😚</p>
            <p> No flirting today, Raman is upset and probably crying in his room holding a pillow😞</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;

