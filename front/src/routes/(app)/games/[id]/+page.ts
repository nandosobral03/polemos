import type {  GameInfo } from '$lib/models/game';
import axios from 'axios';
import { env } from '$lib/env.dev';
import { browser } from '$app/environment';
const url = env.API_URL;
export const csr = true;
export const ssr = false;

export async function load( {params}:{params:{id:string}}) {
    const token  = localStorage.getItem('token') || '';
    return {
        game: await getGameInfo(params.id ,token)
    };
    
}




const getGameInfo = async (id:string, token: string) : Promise<GameInfo> => {
    const {data} = await axios.get(`${url}/game/${id}`, {
        headers: {
            Authorization: `${token}`
        }
    });

    return data;
}