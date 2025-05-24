import React, { useState } from 'react';
import './LoginPage.css';
import axios from 'axios';

function LoginPage({ onLogin, waiting, nameTyped }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = async () => {
    if (!name.trim() || !password.trim()) {
      alert('Please enter both name and password!');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE}/api/auth/login`, {
        name,
        password
      });

      onLogin(name); // Proceed if login successful
    } catch (err) {
      alert('😢 Sorry! Invalid name or password.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/Mylogo.png" alt="Portal Logo" className="login-logo" />
        <h1>💌 Welcome to the Grievance Portal 💖</h1>

        <input
          type="text"
          placeholder="Enter your name 💕"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password 🔐"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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



