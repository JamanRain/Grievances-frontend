import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage({ onLogin }) {
  const [name, setName] = useState('');
  const [step, setStep] = useState('login'); // 'login' | 'choice'
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (name.trim()) {
      setUsername(name.trim());
      setStep('choice');
    }
  };

  const handleChoice = (choice) => {
    onLogin(username, choice); // Pass name + selected choice
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {step === 'login' && (
          <>
            <h1>💌 Welcome to the Grievance Portal 💖</h1>
            <input
              type="text"
              placeholder="Enter your name 💕"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleLogin}>Login 💘</button>
          </>
        )}

        {step === 'choice' && (
          <>
            {username === "Mimansa" ? (
              <>
                <p>💭 Logging you in, please wait my cute complain queen... 😚</p>
                <p>💧 Your lips look cracked, since I can't kiss you just yet to hydrate them, please have some water 😋</p>
                <h3>What would you like to do?</h3>
                <button onClick={() => handleChoice("grievance")}>Submit a Grievance 💌</button>
                <button onClick={() => handleChoice("message")}>Send a Normal Message 💬</button>
              </>
            ) : (
              <>
                <p>🎩 Welcome back, my charming Romeo Raman!</p>
                <h3>What would you like to do?</h3>
                <button onClick={() => handleChoice("grievance")}>Respond to Grievances 📝</button>
                <button onClick={() => handleChoice("message")}>Open Messaging 💬</button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
