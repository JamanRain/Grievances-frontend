import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import MimansaHome from './pages/MimansaHome';
import RamanDashboard from './pages/RamanDashboard';
import ThankYouPage from './pages/ThankYouPage';

function App() {
  const [username, setUsername] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleLogin = (name) => {
    setUsername(name);
    if (name === "Mimansa") {
      setWaiting(true);
      setTimeout(() => {
        setLoggedIn(true);
        setWaiting(false);
      }, 10000); // 10s delay
    } else {
      setLoggedIn(true);
    }
  };

  if (!loggedIn) {
    return <LoginPage onLogin={handleLogin} waiting={waiting} username={username} />;
  }

  if (submitted) {
    return <ThankYouPage username={username} />;
  }

  return username === "Mimansa"
    ? <MimansaHome onSubmit={() => setSubmitted(true)} />
    : <RamanDashboard />;
}

export default App;
