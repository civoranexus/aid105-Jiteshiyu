import { useEffect, useState } from "react";
import { fetchProgressApi } from "../services/progressApi";
import ProgressTracker from "../components/ProgressTracker";
import "./Progress.css";
import Page from "../components/Page";

const Progress = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchProgressApi().then((res) => setItems(res.data));
  }, []);

  const updateLocalStatus = (id, status) => {
    setItems((prev) =>
      prev.map((item) =>
        item.schemeId._id === id
          ? { ...item, status }
          : item
      )
    );
  };

  if (!items.length) {
        return <p className="no-progress">No application progress yet.</p>;
    }

  return (
    <Page>
    <div className="progress-page">
    <h2 className="progress-title">Application Progress</h2>

    {items.map((item) => (
      <div className="progress-card" key={item._id}>
        <h4>{item.schemeId.name}</h4>

        <ProgressTracker
          schemeId={item.schemeId._id}
          currentStatus={item.status}
          onUpdate={(status) =>
            updateLocalStatus(item.schemeId._id, status)
          }
        />
      </div>
    ))}
    </div>
    </Page>
  );

};

export default Progress;
