import axios from "axios";

const api = axios.create({
  baseURL: "https://abcgjl-smartcusine-backend-api.onrender.com",
});

export default api;