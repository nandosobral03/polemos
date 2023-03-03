import axios from 'axios';
import { env } from '$lib/env';
import { browser } from '$app/environment';
import type { Status } from '$lib/models/event';
const url = env.API_URL;
export const ssr = true;
export const csr = true;


export async function load() {
    if(browser){
        const token = localStorage.getItem('token') || '';
        const statuses = await getStatuses(token);
        return {
            statuses: statuses.filter((status:Status) => status.id != "1")
        };
    }
    else{
        return {
            statuses: []
        };
    }
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