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
        {/* 💖 Cute logo at top */}
        <img src="/Mylogo.png" alt="Portal Logo" className="login-logo" />
        
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
            <p>💧 Your lips look cracked, since I can't kiss you just yet to hydrate them, please have some water 😋</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
