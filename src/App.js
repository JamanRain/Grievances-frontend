import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import MimansaHome from './pages/MimansaHome';
import RamanDashboard from './pages/RamanDashboard';
import ThankYouPage from './pages/ThankYouPage';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [tempName, setTempName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleLogin = (name) => {
    setWaiting(true);
    setTempName(name);

    setTimeout(() => {
      setUsername(name);
      setWaiting(false);
    }, 1000);
  };

  const handleGrievanceSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 10000);
  };

  if (!username) {
    return <LoginPage onLogin={handleLogin} waiting={waiting} nameTyped={tempName} />;
  }

  if (submitted) {
    return <ThankYouPage username={username} />;
  }

  return (
    <>
      <MimansaHome onSubmit={handleGrievanceSubmit} username={username} />
      <RamanDashboard username={username} />
    </>
  );
}

export default App;
