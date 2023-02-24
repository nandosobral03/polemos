import type { Event } from '$lib/models/event';
import type { Game } from '$lib/models/game';
import axios from 'axios';
import dotenv from 'dotenv';
const url = process.env.API_URL;
export const prerender = true;


export async function load() {
    dotenv.config();
    const token = await login();
    return {
        games: await getGames(token),
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


const getGames = async (token:string) : Promise<Game[]> =>{
    const {data} = await axios.get(`${url}/game`,{
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${token}`
        }
    });
    return data;
}