import api from "./api";

export const fetchProgressApi = () => {
  return api.get("/progress");
};

export const updateProgressApi = (schemeId, status) => {
  return api.post("/progress", { schemeId, status });
};
