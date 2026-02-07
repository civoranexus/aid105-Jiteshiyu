import { addToWatchlistApi } from "../services/watchlistApi";
import FeedbackButtons from "./FeedbackButtons";
import "./RecommendationList.css";
import Button from "../components/ui/Button";
import Page from "../components/Page";

const RecommendationList = ({ recommendations }) => {
  if (!recommendations) return null;

  if (recommendations.length === 0) {
    return <p className="empty-text">No schemes found for your profile.</p>;
  }

  const handleSave = async (schemeId) => {
    try {
      await addToWatchlistApi(schemeId);
      alert("Added to watchlist");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add to watchlist");
    }
  };

  return (
    <Page>
    <div className="recommendation-list">
      {recommendations.map((rec) => {
        const eligibility = rec.eligibility || { matched: [], unmet: [] };

        const explainability = Array.isArray(rec.explainability)
          ? rec.explainability
          : [];

        const feedback = rec.feedback || {
          helpful: 0,
          notHelpful: 0,
        };

        return (
          <div key={rec.scheme_id} className="scheme-card">
            <h3>{rec.scheme_name}</h3>

            <p className="final-score">
              <strong>Final Score:</strong>{" "}
              {rec.final_score !== undefined
                ? rec.final_score.toFixed(2)
                : "N/A"}
            </p>

            <p>
              <strong>Why recommended:</strong>{" "}
              {rec.reason || "No explanation provided"}
            </p>

            <div className="eligibility-section">
              <p className="eligibility-title">Eligibility Check</p>

              {eligibility.matched.length > 0 && (
                <ul className="matched">
                  {eligibility.matched.map((item, i) => (
                    <li key={i}>✅ {item}</li>
                  ))}
                </ul>
              )}

              {eligibility.unmet.length > 0 && (
                <ul className="unmet">
                  {eligibility.unmet.map((item, i) => (
                    <li key={i}>❌ {item}</li>
                  ))}
                </ul>
              )}
            </div>

            {explainability.length > 0 && (
              <div className="explainability-box">
                <p className="match-score">
                  Overall Match:{" "}
                  <strong>{rec.overall_match ?? "N/A"}%</strong>
                </p>

                <ul>
                  {explainability.map((f, i) => (
                    <li
                      key={i}
                      className={`factor ${
                        f.match_level
                          ? f.match_level.toLowerCase()
                          : "neutral"
                      }`}
                    >
                      <p>
                        <strong>{f.factor}</strong> ({f.contribution}%)
                      </p>
                      <p className="factor-msg">{f.message}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="feedback-stats">
              👍 {feedback.helpful} | 👎 {feedback.notHelpful}
            </p>

            <FeedbackButtons schemeId={rec.scheme_id} />

            <Button
              className="scheme-card__save"
              onClick={() => handleSave(rec.scheme_id)}
            >
              Save to Watchlist
            </Button>
          </div>
        );
      })}
    </div>
    </Page>
  );
};

export default RecommendationList;
