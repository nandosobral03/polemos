import { env } from "$lib/env";
import type { Event } from "$lib/models/event";
import axios from "axios";
const API_URL = env.API_URL;


const create = async (team:Event) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/events`, team, {
        headers: {
            Authorization: `${token}`,
        },
    });
    return response.data;
}

const update = async (event:Event) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/events/${event.id}`, event, {
        headers: {
            Authorization: `${token}`,
        },
    });
    return response.data;
}


const remove = async (id:string) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/events/${id}`, {
        headers: {
            Authorization: `${token}`,
        },
    });
    return response.data;
}

export default { create, update, remove}