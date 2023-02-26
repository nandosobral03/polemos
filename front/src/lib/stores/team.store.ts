import { env } from "$lib/env";
import type { Player, Team } from "../models/team";
import axios from "axios";
import { createToast } from "./toast.store";
const API_URL = env.API_URL;


const create = async (team: Team) => {
    try {
        const token = localStorage.getItem("token");
        const body = { ...team, players: team.players.map(p => { return { name: p.name } }) };
        const { data } = await axios.post(`${API_URL}/teams`, body, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `${token}`
            }
        });
        createToast("Team created", "success");
        return data;
    }
    catch (error) {
        createToast("Error creating team", "error");
        throw error;
    }
}

const update = async (team: Team) => {
    try {
        const { players, ...body } = team;
        const token = localStorage.getItem("token");
        const { data } = await axios.put(`${API_URL}/teams/${team.id}`, body, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `${token}`
            }
        });
        createToast("Team updated", "success");
        return data;
    }
    catch (error) {
        createToast("Error updating team", "error");
        throw error;
    }
}


const updatePlayerImage = async (playerId: string, image: File) => {
    try {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("image", image);
        const { data } = await axios.put(`${API_URL}/players/image/${playerId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `${token}`
            }
        });
        return data;
    }
    catch (error) {
        createToast("Error updating player image", "error");
        throw error;
    }
}

const updatePlayer = async (player: Player) => {
    try {
        const token = localStorage.getItem("token");
        const { data } = await axios.put(`${API_URL}/players/${player.id}`, { name: player.name }, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `${token}`
            }
        });
        return data;
    }
    catch (error) {
        createToast("Error updating player", "error");
        throw error;
    }
}


const remove = async (id: string) => {
    try {
        const token = localStorage.getItem("token");
        const { data } = await axios.delete(`${API_URL}/teams/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `${token}`
            }
        });
        createToast("Team deleted", "success");
        return data;
    }
    catch (error) {
        createToast("Error deleting team", "error");
        throw error;
    }

}



export default { create, update, updatePlayerImage, updatePlayer, remove };