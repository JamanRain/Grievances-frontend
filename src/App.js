import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import MimansaHome from './pages/MimansaHome';
import RamanDashboard from './pages/RamanDashboard';
import ThankYouPage from './pages/ThankYouPage';
import MessagingPage from './pages/MessagingPage'; // 👈 Import messaging page

function App() {
  const [username, setUsername] = useState('');
  const [tempName, setTempName] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mode, setMode] = useState(''); // 'grievance' or 'chat'

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

  // 2. Ask Mimansa: Chat or Grievance
  if (username === "Mimansa" && !mode) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>💖 Welcome Mimansa 💖</h2>
        <p>Would you like to:</p>
        <button onClick={() => setMode('grievance')}>😡 Submit a Grievance</button>
        <button onClick={() => setMode('chat')}>💌 Do Cute Messaging</button>
      </div>
    );
  }

  // 3. Ask Raman: View Grievances or Chat
  if (username === "Raman169" && !mode) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>💖 Hello Raman 💖</h2>
        <p>What would you like to do?</p>
        <button onClick={() => setMode('grievance')}>📋 Respond to Grievances</button>
        <button onClick={() => setMode('chat')}>💌 Chat with Mimansa</button>
      </div>
    );
  }

  // 4. Mimansa mode logic
  if (username === "Mimansa") {
    if (mode === "grievance") {
      return submitted ? <ThankYouPage /> : <MimansaHome onSubmit={handleGrievanceSubmit} />;
    } else if (mode === "chat") {
      return <MessagingPage username="Mimansa" />;
    }
  }

  // 5. Raman mode logic
  if (username === "Raman169") {
    if (mode === "grievance") {
      return <RamanDashboard />;
    } else if (mode === "chat") {
      return <MessagingPage username="Raman169" />;
    }
  }

  // 6. For others
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Sorry 😞</h2>
      <p>This portal is reserved for Mimansa and Raman only 💖</p>
    </div>
  );
}

export default App;
