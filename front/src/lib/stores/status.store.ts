import { env } from "$lib/env";
import axios from "axios";
import { createToast } from "./toast.store";
import type { Status } from "$lib/models/event";
const API_URL = env.API_URL;


const create = async (status:Status) => {
    try{
        const {id, ...body} = status;
        const token = localStorage.getItem("token");
        const response = await axios.post(`${API_URL}/statuses`, body, {
            headers: {
                Authorization: `${token}`,
            },
        });
        createToast("Status created", "success");
        return response.data;
    }
    catch(error){
        createToast("Error creating status", "error");
    }
}

const update = async (status:Status) => {
    try{
        const token = localStorage.getItem("token");
        const response = await axios.put(`${API_URL}/statuses/${status.id}`, status, {
            headers: {
                Authorization: `${token}`,
            },
        });
        createToast("Status updated", "success");
        return response.data;
    }
    catch(error){
        createToast("Error updating status", "error");
        throw error;
    }
}


const remove = async (id:string) => {
    try{
        const token = localStorage.getItem("token");
        const response = await axios.delete(`${API_URL}/statuses/${id}`, {
            headers: {
                Authorization: `${token}`,
            },
        });
        createToast("Status deleted", "success");
        return response.data;
    }
    catch(error:any){
        if(error?.response?.data?.includes("FOREIGN KEY")){
            createToast("Cannot delete status, it is being used by an event", "error");
        }else{
            createToast("Error deleting status", "error");
        }
        throw error;
    }
}

export default { create, update, remove}