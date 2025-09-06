// src/services/api.js
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

async function handleRes(res) {
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = text;
  }
  if (!res.ok) {
    const errMsg =
      (data && data.message) || data || res.statusText || "Request failed";
    const err = new Error(errMsg);
    err.status = res.status;
    throw err;
  }
  return data;
}

export const api = {
  base: API_BASE,

  async get(path) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}${path}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return handleRes(res);
  },

  async post(path, body, isForm = false) {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: isForm
        ? headers
        : { "Content-Type": "application/json", ...headers },
      body: isForm ? body : JSON.stringify(body),
    });
    return handleRes(res);
  },

  async put(path, body, isForm = false) {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await fetch(`${API_BASE}${path}`, {
      method: "PUT",
      headers: isForm
        ? headers
        : { "Content-Type": "application/json", ...headers },
      body: isForm ? body : JSON.stringify(body),
    });
    return handleRes(res);
  },
};
