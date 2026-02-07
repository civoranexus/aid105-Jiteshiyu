import { submitFeedbackApi } from "../services/feedbackApi";
import Button from "../components/ui/Button";

const FeedbackButtons = ({ schemeId }) => {
  const handleFeedback = async (rating) => {
    await submitFeedbackApi(schemeId, rating);
    alert("Feedback submitted");
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <Button onClick={() => handleFeedback("HELPFUL")}>
        👍 Helpful
      </Button>

      <Button onClick={() => handleFeedback("NOT_HELPFUL")}>
        👎 Not Helpful
      </Button>
    </div>
  );
};

export default FeedbackButtons;
