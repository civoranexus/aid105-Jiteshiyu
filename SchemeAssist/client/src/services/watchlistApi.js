import api from "./api";

export const addToWatchlistApi = (schemeId) => {
  return api.post("/watchlist", { schemeId });
};

export const removeFromWatchlistApi = (schemeId) => {
  return api.delete(`/watchlist/${schemeId}`);
};

export const fetchWatchlistApi = () => {
  return api.get("/watchlist");
};
