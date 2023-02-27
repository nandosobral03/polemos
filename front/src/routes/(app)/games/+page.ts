import type { Game } from '$lib/models/game';
import axios from 'axios';
import { env } from '$lib/env.dev';
import { browser } from '$app/environment';
const url = env.API_URL;
export const ssr = true;
export const csr = true;
export const prerender = false;


export async function load() {
    if(browser){
        const token  = localStorage.getItem('token') || '';
        return {
            games: await getGames(token),
        };
    }else{
        return{
            games: []
        }
    }
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