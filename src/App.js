import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import MimansaHome from './pages/MimansaHome';
import RamanDashboard from './pages/RamanDashboard';
import ThankYouPage from './pages/ThankYouPage';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [tempName, setTempName] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleLogin = (name) => {
    if (name === "Mimansa") {
      setTempName(name);
      setWaiting(true);
      setTimeout(() => {
        setUsername(name);
        setWaiting(false);
      }, 10000);
    } else {
      setUsername(name);
    }
  };

  const handleGrievanceSubmit = () => {
    setSubmitted(true);
  };

  // 1. Show login page if not logged in
  if (!username) {
    return <LoginPage onLogin={handleLogin} waiting={waiting} nameTyped={tempName} />;
  }

  // 2. Mimansa view: Submit grievance
  if (username === "Mimansa") {
    return submitted ? <ThankYouPage /> : <MimansaHome onSubmit={handleGrievanceSubmit} />;
  }

  // 3. Raman view: Respond to grievances
  if (username === "Raman169") {
    return <RamanDashboard />;
  }

  // 4. Others: Show error
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Sorry 😞</h2>
      <p>This portal is reserved for Mimansa and Raman only 💖</p>
    </div>
  );
}

export default App;


