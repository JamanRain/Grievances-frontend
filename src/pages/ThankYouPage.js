import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ThankYouPage.css';

function ThankYouPage() {
  const [grievances, setGrievances] = useState([]);

  useEffect(() => {
    // Fetch all grievances from the deployed backend
    axios.get('https://grievances-backend.onrender.com/api/grievances')
      .then(res => setGrievances(res.data))
      .catch(err => console.error('Error fetching grievances:', err));
  }, []);

  return (
    <div className="thank-you-page">
      <h2>Thank you, Mimansa ❤️</h2>
      <p>
        Your grievance has been sent to Raman. He will get back to you very soon 💌<br />
        (He is probably overthinking what to write 😅)
      </p>

      <h3>📝 Your Past Grievances & Raman’s Responses</h3>
      <div className="grievance-history">
        {grievances.length === 0 ? (
          <p>Loading your grievances... 💭</p>
        ) : (
          grievances.map((g, i) => (
            <div key={i} className="grievance-box">
              <h4>💌 {g.title}</h4>
              <p><strong>What was bothering you:</strong> {g.details}</p>
              <p><strong>Severity:</strong> {g.severity}/10 🥺</p>
              <p><strong>Raman's Response:</strong><br />
                {g.response ? (
                  <span className="response-text">💬 {g.response}</span>
                ) : (
                  <span className="pending-response">⏳ Still waiting for a response...</span>
                )}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ThankYouPage;
