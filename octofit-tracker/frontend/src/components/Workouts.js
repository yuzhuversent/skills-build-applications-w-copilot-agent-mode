import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = `https://${codespace}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('Fetching Workouts from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Fetched Workouts:', results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching workouts:', err);
        setLoading(false);
      });
  }, [endpoint]);

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-danger text-white">
        <h2 className="h4 mb-0">Workouts</h2>
      </div>
      <div className="card-body">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : workouts.length === 0 ? (
          <p className="text-muted text-center py-3">No workouts found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead className="table-danger">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Difficulty</th>
                  <th>Duration</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout, idx) => (
                  <tr key={workout.id || idx}>
                    <td>{workout.id}</td>
                    <td><strong>{workout.name}</strong></td>
                    <td><span className="badge bg-primary">{workout.type || workout.workout_type}</span></td>
                    <td>
                      <span className={`badge ${workout.difficulty === 'Easy' ? 'bg-success' : workout.difficulty === 'Medium' ? 'bg-warning text-dark' : 'bg-danger'}`}>
                        {workout.difficulty || 'N/A'}
                      </span>
                    </td>
                    <td>{workout.duration} min</td>
                    <td>{workout.description || 'No description'}</td>
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

export default Workouts;
