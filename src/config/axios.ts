import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "X-API-Key": import.meta.env.VITE_API_KEY,
  },
});
