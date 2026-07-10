import axios from "axios";

const api = axios.create({
    baseURL: "https://to-do-list-wemd.onrender.com/api",
});

export default api;