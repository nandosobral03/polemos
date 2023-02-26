import { env } from "$lib/env";
import type { Sponsor } from "$lib/models/team";
import axios from "axios";
import { createToast } from "./toast.store";
const API_URL = env.API_URL;


const create = async (name:string) => {
    try{

        const token = localStorage.getItem("token");
        const response = await axios.post(`${API_URL}/sponsors`, {name}, {
            headers: {
                Authorization: `${token}`,
            },
        });
        createToast("Sponsor created", "success");
        return response.data;
    }
    catch(error){
        createToast("Error creating sponsor", "error");
    }
}

const update = async (sponsor:Sponsor) => {
    try{
        const token = localStorage.getItem("token");
        const response = await axios.put(`${API_URL}/sponsors/${sponsor.id}`, sponsor, {
            headers: {
                Authorization: `${token}`,
            },
        });
        createToast("Sponsor updated", "success");
        return response.data;
    }
    catch(error){
        createToast("Error updating sponsor", "error");
        throw error;
    }
}


const remove = async (id:string) => {
    try{
        const token = localStorage.getItem("token");
        const response = await axios.delete(`${API_URL}/sponsors/${id}`, {
            headers: {
                Authorization: `${token}`,
            },
        });
        createToast("Sponsor deleted", "success");
        return response.data;
    }
    catch(error){
        createToast("Error deleting sponsor", "error");
        throw error;
    }
}

export default { create, update, remove}