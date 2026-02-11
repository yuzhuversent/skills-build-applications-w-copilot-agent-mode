import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = `https://${codespace}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Fetching Leaderboard from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaders(results);
        console.log('Fetched Leaderboard:', results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching leaderboard:', err);
        setLoading(false);
      });
  }, [endpoint]);

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-warning text-dark">
        <h2 className="h4 mb-0">🏆 Leaderboard</h2>
      </div>
      <div className="card-body">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : leaders.length === 0 ? (
          <p className="text-muted text-center py-3">No leaderboard data available.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-warning">
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Total Points</th>
                  <th>Activities</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {leaders.map((leader, idx) => (
                  <tr key={leader.id || idx}>
                    <td>
                      <span className={`badge ${idx === 0 ? 'bg-warning text-dark' : idx === 1 ? 'bg-secondary' : idx === 2 ? 'bg-danger' : 'bg-light text-dark'}`}>
                        {idx + 1}
                      </span>
                    </td>
                    <td><strong>{leader.user || leader.username}</strong></td>
                    <td><span className="badge bg-success">{leader.total_points || leader.points}</span></td>
                    <td>{leader.activities_count || leader.activities || 'N/A'}</td>
                    <td>{leader.team || 'No Team'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
