import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import MimansaHome from './pages/MimansaHome';
import RamanDashboard from './pages/RamanDashboard';
import ThankYouPage from './pages/ThankYouPage';

function App() {
  const [username, setUsername] = useState('');
  const [tempName, setTempName] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleLogin = (name) => {
    if (name === "Mimansa") {
      setTempName(name);           // Store temporarily
      setWaiting(true);            // Show waiting message
      setTimeout(() => {
        setUsername(name);         // Login after wait
        setWaiting(false);
      }, 10000);                   // 10 seconds wait
    } else {
      setUsername(name);           // Instant login for others
    }
  };

  const handleGrievanceSubmit = () => {
    setSubmitted(true);
  };

  // While no user is fully logged in
  if (!username) {
    return <LoginPage onLogin={handleLogin} waiting={waiting} nameTyped={tempName} />;
  }

  if (username === "Mimansa") {
    return submitted ? (
      <ThankYouPage />
    ) : (
      <MimansaHome onSubmit={handleGrievanceSubmit} />
    );
  }

  if (username === "Raman169") {
    return <RamanDashboard />;
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Sorry 😞</h2>
      <p>This portal is reserved for Mimansa and Raman only 💖</p>
    </div>
  );
}

export default App;


