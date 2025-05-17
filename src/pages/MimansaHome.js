import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MimansaHome.css';

function MimansaHome({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [severity, setSeverity] = useState(1);
  const [grievances, setGrievances] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/grievances')
      .then(res => setGrievances(res.data.filter(g => g.username === 'Mimansa')));
  }, []);

  const handleSubmit = () => {
    axios.post('http://localhost:5000/api/grievances', {
      username: "Mimansa",
      title,
      details,
      severity
    }).then(() => onSubmit());
  };

  return (
    <div className="mimansa-home">
      <h2>💞 Welcome to your very own grievance portal, Mimansa 💖</h2>
      <p>As requested, you can submit your cute grievances here for Raman's viewing pleasure 😋</p>

      <input placeholder="Title 💌" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="What's bothering you? 😔" value={details} onChange={e => setDetails(e.target.value)} />
      <label>Severity (1-10) ❤️:</label>
      <input type="number" min="1" max="10" value={severity} onChange={e => setSeverity(e.target.value)} />
      <button onClick={handleSubmit}>Submit 💘</button>

      <h3>📋 Your Past Grievances</h3>
      {grievances.map((g, i) => (
        <div key={i} className="grievance-card">
          <h4>{g.title}</h4>
          <p>{g.details}</p>
          <p><b>Severity:</b> {g.severity}</p>
          <p><b>Raman's Response:</b> {g.response || "Waiting for reply 💌"}</p>
        </div>
      ))}
    </div>
  );
}

export default MimansaHome;


