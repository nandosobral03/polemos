import type { Event, Status } from '$lib/models/event';
import axios from 'axios';
import { env } from '$lib/env.dev';
const url = env.API_URL;
export const ssr = false;
export const csr = true;


export async function load( {params}:{params:{id:string}}) {
    const token  = localStorage.getItem('token') || '';
    const {id} = params;
    return {
        event: await getEventData(token,id),
        statuses: await getStatuses(token),
    };
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