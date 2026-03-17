import api from "../api/api";

export const login = (data: any) => {
  return api.post("/auth/login", data);
};