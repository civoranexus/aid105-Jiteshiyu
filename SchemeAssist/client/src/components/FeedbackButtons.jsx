import { submitFeedbackApi } from "../services/feedbackApi";

const FeedbackButtons = ({ schemeId }) => {
  const handleFeedback = async (rating) => {
    await submitFeedbackApi(schemeId, rating);
    alert("Feedback submitted");
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <button onClick={() => handleFeedback("HELPFUL")}>
        👍 Helpful
      </button>

      <button onClick={() => handleFeedback("NOT_HELPFUL")}>
        👎 Not Helpful
      </button>
    </div>
  );
};

export default FeedbackButtons;
