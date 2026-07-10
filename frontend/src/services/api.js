import axios from "axios";

// Read API URL from environment variables
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default api;