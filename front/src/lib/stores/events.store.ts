import { env } from "$lib/env";
import type { Event } from "$lib/models/event";
import axios from "axios";
import { createToast } from "./toast.store";
const API_URL = env.API_URL;


const create = async (team:Event) => {
    const token = localStorage.getItem("token");
    try{
        const response = await axios.post(`${API_URL}/events`, team, {
            headers: {
                Authorization: `${token}`,
            },
        });
        createToast("Event created", "success");
        return response.data;
    }
    catch(error){
        createToast("Error creating event", "error")
        throw error;
    }

}

const update = async (event:Event) => {
    try{
        const token = localStorage.getItem("token");
        const response = await axios.put(`${API_URL}/events/${event.id}`, event, {
            headers: {
                Authorization: `${token}`,
            },
        });
        createToast("Event updated", "success");
        return response.data;
    }    
    catch(error){
        createToast("Error updating event", "error")
        throw error;
    }
}



const remove = async (id:string) => {
   try{
        const token = localStorage.getItem("token");
        const response = await axios.delete(`${API_URL}/events/${id}`, {
            headers: {
                Authorization: `${token}`,
            },
        });
        createToast("Event deleted", "success");
        return response.data;
    }
    catch(error){
        createToast("Error deleting event", "error")
        throw error;
    }

}

export default { create, update, remove}