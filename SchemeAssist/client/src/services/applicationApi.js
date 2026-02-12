import api from "./api";

export const fetchApplicationProcess = (schemeId) => {
  return api.get(`/application/${schemeId}`);
};
