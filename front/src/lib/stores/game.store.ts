import { env } from "$lib/env";
import axios from "axios";
import { createToast } from "./toast.store";
const API_URL = env.API_URL;


const start = async () => {
    try{
        const token = localStorage.getItem("token");
        const response = await axios.post(`${API_URL}/game`, {}, {
            headers: {
                Authorization: `${token}`,
            },
        });
        return response.data;
    }
    catch(error){
        createToast("Error starting game", "error")
        throw error;
    }
}




export default { start }