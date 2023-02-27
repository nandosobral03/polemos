import type { Status } from '$lib/models/event';
import axios from 'axios';
import { env } from '$lib/env.dev';
import { browser } from '$app/environment';
const url = env.API_URL;
export const ssr = true;
export const csr = true;


export async function load() {
    if(browser){
        const token  = localStorage.getItem('token') || '';
        return {
            statuses: await getStatuses(token),
        };
    }else{
        return{
            statuses: []
        }
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