import api from "./axios";

export const registerUser = (data) => api.post("/register", data);
export const loginUser = (data) => api.post("/login", data);

export const getSummary = () => api.get("/summary");

export const getIncome = () => api.get("/income");
export const addIncome = (data) => api.post("/income", data);
export const updateIncome = (id, data) => api.put(`/income/${id}`, data);
export const deleteIncome = (id) => api.delete(`/income/${id}`);

export const getExpenses = () => api.get("/expenses");
export const addExpense = (data) => api.post("/expenses", data);
export const updateExpense = (id, data) => api.put(`/expenses/${id}`, data);
export const deleteExpense = (id) => api.delete(`/expenses/${id}`);