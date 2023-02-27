import type { Event } from '$lib/models/event';
import axios from 'axios';
import { env } from '$lib/env.dev';
import { browser } from '$app/environment';
const url = env.API_URL;
export const ssr = true;
export const csr = true;

export async function load() {
    if(browser){
        const token  = localStorage.getItem('token') || '';
        const events = await getEvents(token);
        return {
            events
        };
    }else{
        return {
            events: []
        }
    }
    
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