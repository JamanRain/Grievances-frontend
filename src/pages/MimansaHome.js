function MimansaHome({ onSubmit, username }) {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [severity, setSeverity] = useState(1);
  const [grievances, setGrievances] = useState([]);

  const recipient = username === "Mimansa" ? "Raman169" : "Mimansa";

  useEffect(() => {
    axios.get('https://grievances-backend.onrender.com/api/grievances')
      .then(res => {
        const userGrievances = res.data.filter(g => g.username === username);
        setGrievances(userGrievances);
      })
      .catch(err => {
        console.error("Failed to fetch grievances:", err);
      });
  }, [username]);

  const handleSubmit = () => {
    axios.post('https://grievances-backend.onrender.com/api/grievances', {
      username,
      recipient,
      title,
      details,
      severity
    })
    .then(() => {
      onSubmit();
    })
    .catch(err => {
      console.error("Failed to submit grievance:", err);
    });
  };

  return (
    <div className="mimansa-home">
      <h2>💞 Welcome, {username}! Submit your cute grievance 💖</h2>
      <p>You can submit your grievances here for {recipient}'s viewing pleasure 😋</p>

      <input 
        placeholder="Title 💌" 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
      />
      <textarea 
        placeholder="What's bothering you? 😔" 
        value={details} 
        onChange={e => setDetails(e.target.value)} 
      />
      <label>Severity (1-10) ❤️:</label>
      <input 
        type="number" 
        min="1" 
        max="10" 
        value={severity} 
        onChange={e => setSeverity(e.target.value)} 
      />
      <button onClick={handleSubmit}>Submit 💘</button>

      <h3>📋 Your Past Grievances</h3>
      {grievances.map((g, i) => (
        <div key={i} className="grievance-card">
          <h4>{g.title}</h4>
          <p>{g.details}</p>
          <p><b>Severity:</b> {g.severity}</p>
          <p><b>Response:</b> {g.response || "Waiting for reply 💌"}</p>
        </div>
      ))}
    </div>
  );
}



