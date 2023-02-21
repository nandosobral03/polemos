import type { Event, Status } from '$lib/models/event';
import axios from 'axios';
import dotenv from 'dotenv';
const url = process.env.API_URL;
export const prerender = true;


export async function load( {params}:{params:{id:string}} ) {
    const {id} = params;
    dotenv.config();
    const token = await login();
    return {
        event: await getEventData(token,id),
        statuses: await getStatuses(token),
    };
}

const login = async () : Promise<string> => {
    const {data} = await axios.post(`${url}/auth`, {
        username: process.env.API_USERNAME,
        password: process.env.API_PASSWORD
    }
    )
    
    ;
    return data.token;
}


const getEventData = async (token:string, id:string) : Promise<Event> =>{
    const {data} = await axios.get(`${url}/events/${id}`,{
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${token}`
        }
    });
    return data;
}

const getStatuses = async (token:string) : Promise<Status[]> =>{
    const {data} = await axios.get(`${url}/statuses`,{
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${token}`
        }
    });
    return data;
}