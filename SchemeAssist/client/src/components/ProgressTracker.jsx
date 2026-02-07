import { updateProgressApi } from "../services/progressApi";
import "./ProgressTracker.css";
import Page from "../components/Page";

const STATUSES = [
  "Not Started",
  "Applied",
  "Under Review",
  "Approved",
  "Rejected",
];

const ProgressTracker = ({ schemeId, currentStatus, onUpdate }) => {
  const handleChange = async (e) => {
    const newStatus = e.target.value;
    await updateProgressApi(schemeId, newStatus);
    onUpdate(newStatus);
  };

  return (
    <Page>
    <select
        value={currentStatus}
        onChange={handleChange}
        className={`progress-select ${currentStatus.toLowerCase().replace(" ", "-")}`}
    >
      {STATUSES.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
    </Page>
  );
};

export default ProgressTracker;
