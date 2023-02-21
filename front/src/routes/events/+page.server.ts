import type { Event } from '$lib/models/event';
import axios from 'axios';
import dotenv from 'dotenv';
const url = process.env.API_URL;
export const prerender = true;


export async function load() {
    dotenv.config();
    const token = await login();
    return {
        events: await getEvents(token),
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


const getEvents = async (token:string) : Promise<Event[]> =>{
    const {data} = await axios.get(`${url}/events`,{
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${token}`
        }
    });
    return data;
}