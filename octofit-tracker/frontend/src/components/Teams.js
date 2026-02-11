import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = `https://${codespace}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Fetching Teams from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Fetched Teams:', results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
        setLoading(false);
      });
  }, [endpoint]);

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-success text-white">
        <h2 className="h4 mb-0">Teams</h2>
      </div>
      <div className="card-body">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : teams.length === 0 ? (
          <p className="text-muted text-center py-3">No teams found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead className="table-success">
                <tr>
                  <th>ID</th>
                  <th>Team Name</th>
                  <th>Members</th>
                  <th>Description</th>
                  <th>Created Date</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, idx) => (
                  <tr key={team.id || idx}>
                    <td>{team.id}</td>
                    <td><strong>{team.name}</strong></td>
                    <td><span className="badge bg-primary">{team.member_count || team.members?.length || 0} members</span></td>
                    <td>{team.description || 'No description'}</td>
                    <td>{team.created_at ? new Date(team.created_at).toLocaleDateString() : 'N/A'}</td>
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

export default Teams;
