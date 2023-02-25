import type { Player, Sponsor, Team } from '$lib/models/team';
import axios from 'axios';
import dotenv from 'dotenv';
const url = process.env.API_URL;
export const prerender = true;


export async function load() {
    dotenv.config();
    const token = await login();
    return {
        players: await getPlayer(token)
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

const getPlayer = async (token:string) : Promise<Player[]> =>{
    const {data} = await axios.get(`${url}/players`,{
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${token}`
        }
    });
    return data;
}