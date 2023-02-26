import { env } from "$lib/env";
import type { Player } from "$lib/models/team";
import axios from "axios";
import { createToast } from "./toast.store";
const API_URL = env.API_URL;


const create = async (player: Player) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${API_URL}/players`, player, {
            headers: {
                Authorization: `${token}`,
            },
        });
        createToast("Player created", "success");
        return response.data;
    }
    catch (error) {
        createToast("Error creating player", "error")
        throw error;
    }

}

const update = async (player: Player) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${API_URL}/players/${player.id}`, player, {
            headers: {
                Authorization: `${token}`,
            },
        });
        createToast("Player updated", "success");
        return response.data;
    }
    catch (error) {
        createToast("Error updating player", "error")
        throw error;
    }

}


const remove = async (id: string) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`${API_URL}/players/${id}`, {
            headers: {
                Authorization: `${token}`,
            },
        });
        createToast("Player deleted", "success");
        return response.data;
    }
    catch (error) {
        createToast("Error deleting player", "error")
        throw error;
    }

}

export default { create, update, remove }