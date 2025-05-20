import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ThankYouPage.css';

function ThankYouPage({ username }) {
  const [grievances, setGrievances] = useState([]);

  useEffect(() => {
    axios.get('https://grievances-backend.onrender.com/api/grievances')
      .then(res => {
        setGrievances(res.data.filter(g => g.username === username));
      })
      .catch(err => {
        console.error("Failed to fetch grievances:", err);
      });
  }, [username]);

  return (
    <div className="thank-you">
      <h2>💐 Thank you for your submission, {username}! 💐</h2>
      <p>Your grievance has been lovingly sent 💞</p>

      <h3>📋 Submitted Grievances</h3>
      {grievances.length === 0 ? (
        <p>Loading your grievances... 💭</p>
      ) : (
        grievances.map((g, i) => (
          <div key={i} className="grievance-card">
            <h4>{g.title}</h4>
            <p>{g.details}</p>
            <p><b>Severity:</b> {g.severity}</p>
            <p><b>Recipient:</b> {g.recipient}</p>
            <p><b>Response:</b> {g.response || "Awaiting response 💌"}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ThankYouPage;

