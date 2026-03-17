import api from "../api/api";

export const getPayments = (params?: any) => {
  return api.get("/payments", { params });
};

export const getPaymentById = (id: number) => {
  return api.get(`/payments/${id}`);
};

export const createPayment = (data: any) => {
  return api.post("/payments", data);
};

export const authorizePayment = (id: number) => {
  return api.post(`/payments/${id}/authorize`);
};

export const rejectPayment = (id: number, reason: string) => {
  return api.post(`/payments/${id}/reject`, { motivo: reason });
};

export const getDashboard = () => {
  return api.get("/dashboard")
}