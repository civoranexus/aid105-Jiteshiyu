import "./RecommendationList.css";

const RecommendationList = ({ recommendations }) => {
  if (!recommendations) return null;

  if (recommendations.length === 0) {
    return <p className="empty-text">No schemes found for your profile.</p>;
  }

  return (
    <div className="recommendation-list">
      {recommendations.map((rec) => (
        <div key={rec.scheme_id} className="scheme-card">
          <h3>{rec.scheme_name}</h3>

          <p>
            <strong>Why recommended:</strong> {rec.reason}
          </p>

          <div className="eligibility-section">
            <p className="eligibility-title">Eligibility Check</p>

            <ul className="matched">
              {rec.eligibility.matched.map((item, i) => (
                <li key={i}>✅ {item}</li>
              ))}
            </ul>

            {rec.eligibility.unmet.length > 0 && (
              <ul className="unmet">
                {rec.eligibility.unmet.map((item, i) => (
                  <li key={i}>❌ {item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendationList;