import type { Sponsor } from '$lib/models/team';
import axios from 'axios';
import { env } from '$lib/env';
import { browser } from '$app/environment';
const url = env.API_URL;
export const ssr = true;
export const csr = true;


export async function load() {
    if(browser){
        const token = localStorage.getItem('token') || '';
        return {
            sponsors: await getSponsors(token)
        };
    }
    else{
        return {
            sponsors: []
        };
    }
}




const getSponsors = async (token:string) : Promise<Sponsor[]> =>{
    const {data} = await axios.get(`${url}/sponsors`,{
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${token}`
        }
    });
    return data;
}