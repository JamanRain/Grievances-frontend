import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RamanDashboard.css';

function RamanDashboard() {
  const [grievances, setGrievances] = useState([]);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    fetchGrievances();
  }, []);

  const fetchGrievances = () => {
    axios.get('http://localhost:5000/api/grievances')
      .then(res => setGrievances(res.data))
      .catch(err => console.error("Failed to fetch grievances", err));
  };

  const handleSubmit = (id) => {
    const response = responses[id];
    if (!response) return;

    axios.put(`http://localhost:5000/api/grievances/${id}/respond`, { response })
      .then(() => {
        setGrievances(prev => prev.map(g => g._id === id ? { ...g, response } : g));
        setResponses(prev => ({ ...prev, [id]: '' }));
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this grievance? 💔")) {
      axios.delete(`http://localhost:5000/api/grievances/${id}`)
        .then(() => {
          setGrievances(prev => prev.filter(g => g._id !== id));
        })
        .catch(err => console.error("Failed to delete grievance", err));
    }
  };

  return (
    <div className="raman-dashboard">
      <h2>💗 Hello Raman! These are the grievances from Mimansa 💞</h2>
      {grievances.map((g, i) => (
        <div key={i} className="grievance-box">
          <h4>💌 {g.title}</h4>
          <p>{g.details}</p>
          <p><b>Severity:</b> {g.severity} 😟</p>
          <p><b>Your Response:</b> {g.response || 'No response yet 💭'}</p>

          {!g.response && (
            <>
              <textarea
                placeholder="Write your heartfelt response 💕"
                value={responses[g._id] || ''}
                onChange={(e) =>
                  setResponses(prev => ({ ...prev, [g._id]: e.target.value }))
                }
              />
              <div className="button-row">
                <button onClick={() => handleSubmit(g._id)}>Submit Response 💌</button>
                <button className="delete-btn" onClick={() => handleDelete(g._id)}>
                  Delete Grievance 🗑️
                </button>
              </div>
            </>
          )}

          {g.response && (
            <button className="delete-btn" onClick={() => handleDelete(g._id)}>
              Delete Grievance 🗑️
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default RamanDashboard;
