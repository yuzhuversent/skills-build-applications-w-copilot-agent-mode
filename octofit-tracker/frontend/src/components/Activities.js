import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = `https://${codespace}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Fetching Activities from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Fetched Activities:', results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
        setLoading(false);
      });
  }, [endpoint]);

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h2 className="h4 mb-0">Activities</h2>
      </div>
      <div className="card-body">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : activities.length === 0 ? (
          <p className="text-muted text-center py-3">No activities found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Activity Type</th>
                  <th>Duration</th>
                  <th>Calories</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, idx) => (
                  <tr key={activity.id || idx}>
                    <td>{activity.id}</td>
                    <td>{activity.user || activity.user_id}</td>
                    <td><span className="badge bg-info text-dark">{activity.activity_type || activity.type}</span></td>
                    <td>{activity.duration} min</td>
                    <td>{activity.calories}</td>
                    <td>{activity.date ? new Date(activity.date).toLocaleDateString() : 'N/A'}</td>
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

export default Activities;
