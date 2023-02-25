import { env } from "$lib/env";
import type { Player } from "$lib/models/team";
import axios from "axios";
const API_URL = env.API_URL;


const create = async (player:Player) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/players`, player, {
        headers: {
            Authorization: `${token}`,
        },
    });
    return response.data;
}

const update = async (player:Player) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/players/${player.id}`, player, {
        headers: {
            Authorization: `${token}`,
        },
    });
    return response.data;
}


const remove = async (id:string) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/players/${id}`, {
        headers: {
            Authorization: `${token}`,
        },
    });
    return response.data;
}

export default { create, update, remove}