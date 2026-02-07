import { useEffect, useState } from "react";
import {
  fetchAlertsApi,
  markAlertReadApi,
} from "../services/alertApi";
import "./Alerts.css";
import Button from "../components/ui/Button";
import Page from "../components/Page";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlertsApi().then((res) => setAlerts(res.data));
  }, []);

  const markRead = async (id) => {
    await markAlertReadApi(id);
    setAlerts((prev) =>
      prev.map((a) =>
        a._id === id ? { ...a, isRead: true } : a
      )
    );
  };

  if (!alerts.length) {
    return <p>No alerts yet.</p>;
  }

  return (
    <Page>

    <div className="alerts-container">
      <h2>Alerts</h2>

      {alerts.map((alert) => (
        <div
          key={alert._id}
          className={`alert-item ${
            alert.isRead ? "read" : "unread"
          }`}
        >
          <p>{alert.message}</p>

          {!alert.isRead && (
            <Button onClick={() => markRead(alert._id)}>
              Mark as read
            </Button>
          )}
        </div>
      ))}
    </div>
    </Page>

  );
};

export default Alerts;
