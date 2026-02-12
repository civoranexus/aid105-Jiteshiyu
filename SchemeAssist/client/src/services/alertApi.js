import api from "./api";

export const fetchAlertsApi = () => {
  return api.get("/alerts");
};

export const markAlertReadApi = (id) => {
  return api.patch(`/alerts/${id}/read`);
};
