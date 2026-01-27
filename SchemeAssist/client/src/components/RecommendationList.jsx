import "./RecommendationList.css";

const RecommendationList = ({ recommendations }) => {
  if (!recommendations) return null;

  if (recommendations.length === 0) {
    return (
      <p className="empty-text">
        No schemes found for your profile.
      </p>
    );
  }

  return (
    <div className="recommendation-list">
      {recommendations.map((rec) => (
        <div key={rec.scheme_id} className="scheme-card">
          <h3>{rec.scheme_name}</h3>
          <p>
            <strong>Why recommended:</strong> {rec.reason}
          </p>
        </div>
      ))}
    </div>
  );
};

export default RecommendationList;
