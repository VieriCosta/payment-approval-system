import api from "../api/api";

export const createUser = (data: any) => {
  return api.post("/users", data);
};

export const getUsers = () => {
  return api.get("/users");
};