import type { Sponsor, Team } from '$lib/models/team';
import axios from 'axios';
import dotenv from 'dotenv';
const url = process.env.API_URL;
export const prerender = true;


export async function load() {
    dotenv.config();
    const token = await login();
    return {
        roaster: await getTeams(token),
        sponsors: await getSponsors(token)
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


const getTeams = async (token:string) : Promise<Team[]> =>{
    const {data} = await axios.get(`${url}/teams`,{
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${token}`
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