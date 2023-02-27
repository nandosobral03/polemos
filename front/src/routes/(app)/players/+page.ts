import type { Player} from '$lib/models/team';
import axios from 'axios';
import { env } from '$lib/env.dev';
const url = env.API_URL;
export const ssr = false;
export const csr = true;

export async function load() {
    const token  = localStorage.getItem('token') || '';
    const players = await getPlayer(token);
    return {
        players
    };
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