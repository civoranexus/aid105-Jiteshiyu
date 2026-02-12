import api from "./api";

export const compareSchemesApi = (schemeIds) => {
  return api.post("/compare", { schemeIds });
};
