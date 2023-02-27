import type { Sponsor, Team } from '$lib/models/team';
import axios from 'axios';
import { env } from '$lib/env';
import { browser } from '$app/environment';
const url = env.API_URL;
export const ssr = false;
export const csr = true;



export async function load() {
    if(browser){
        const token = localStorage.getItem('token') || '';
        return {
            roaster: await getTeams(token),
            sponsors: await getSponsors(token)
        };
    }
    else{
        return {
            roaster: [],
            sponsors: []
        };
    }
}



const getTeams = async (token:string) : Promise<Team[]> =>{
    const {data} = await axios.get(`${url}/teams`,{
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${token}`
        },
        params:{
            "includePlayers": "true"
        }
    });
    return data;
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