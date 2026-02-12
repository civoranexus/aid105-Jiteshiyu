import api from "./api";

export const submitFeedbackApi = (schemeId, rating) => {
  return api.post("/feedback", { schemeId, rating });
};
