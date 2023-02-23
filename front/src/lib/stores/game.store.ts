import { env } from "$lib/env";
import axios from "axios";
const API_URL = env.API_URL;


const start = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/game`, {}, {
        headers: {
            Authorization: `${token}`,
        },
    });
    return response.data;
}


const getDay = async (gameId: string, day: number) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/game/${gameId}/day/${day}`, {
        headers: {
            Authorization: `${token}`,
        },
    });
    return response.data;
}

export default { start, getDay }