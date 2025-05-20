import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RamanDashboard.css';

function RamanDashboard({ username }) {
  const [grievances, setGrievances] = useState([]);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    fetchGrievances();
  }, [username]);

  const fetchGrievances = () => {
    axios.get('https://grievances-backend.onrender.com/api/grievances')
      .then(res => {
        const receivedGrievances = res.data.filter(g => g.recipient === username);
        setGrievances(receivedGrievances);
      })
      .catch(err => console.error("Failed to fetch grievances", err));
  };

  const handleResponseChange = (id, text) => {
    setResponses({ ...responses, [id]: text });
  };

  const handleSendResponse = (id) => {
    axios.put(`https://grievances-backend.onrender.com/api/grievances/${id}`, {
      response: responses[id]
    })
    .then(() => {
      fetchGrievances();
      setResponses({ ...responses, [id]: '' });
    })
    .catch(err => console.error("Failed to send response", err));
  };

  const handleDelete = (id) => {
    axios.delete(`https://grievances-backend.onrender.com/api/grievances/${id}`)
      .then(fetchGrievances)
      .catch(err => console.error("Failed to delete grievance", err));
  };

  return (
    <div className="raman-dashboard">
      <h2>💗 Hello {username}! These are grievances sent to you 💞</h2>
      {grievances.map(g => (
        <div key={g._id} className="grievance-card">
          <h4>{g.title}</h4>
          <p>{g.details}</p>
          <p><b>From:</b> {g.username}</p>
          <p><b>Severity:</b> {g.severity}</p>
          <p><b>Current Response:</b> {g.response || "No response yet"}</p>

          <textarea
            placeholder="Type your response here..."
            value={responses[g._id] || ''}
            onChange={e => handleResponseChange(g._id, e.target.value)}
          />
          <button onClick={() => handleSendResponse(g._id)}>Send Response</button>
          <button onClick={() => handleDelete(g._id)} className="delete-btn">Delete</button>
        </div>
      ))}
    </div>
  );
}

export default RamanDashboard;


