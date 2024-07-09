import axios from "axios";
const baseURL =
    process.env.NODE_ENV === "production"
        ? "https://weeb-backend.onrender.com/api"
        : "https://weeb-backend.onrender.com/api";

const client = axios.create({ baseURL });
export default client;