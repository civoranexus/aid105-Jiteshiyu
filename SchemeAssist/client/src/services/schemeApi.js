import api from "./api";

export const fetchSchemes = () => {
  return api.get("/schemes");
};
