import { env } from '$lib/env';
import type { PlayerInfo, Team } from '$lib/models/team';
import axios from 'axios';
const url = env.API_URL;
export const ssr = false;
export const csr = true;

export async function load({params}: {params: {id: string}}) {
    const token = localStorage.getItem('token') || '';
    const [player, teams] = await Promise.all([
        getPlayer(token, params.id),
        getTeams(token)
    ]);
    return {
        player,
        teams
    };
}



const getPlayer = async (token:string, id:string) : Promise<PlayerInfo> =>{
    const {data} = await axios.get(`${url}/players/${id}`,{
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${token}`
        }
    });
    return data;
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