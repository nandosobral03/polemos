import type { Game, GameInfo } from '$lib/models/game';
import axios from 'axios';
import dotenv from 'dotenv';
const url = process.env.API_URL;
export const prerender = true;


export async function load({params}:{params: {id: string}}) {
    dotenv.config();
    const token = await login();
    return {
        game: await getGameInfo(params.id ,token)
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


const getGameInfo = async (id:string, token: string) : Promise<GameInfo> => {
    const {data} = await axios.get(`${url}/game/${id}`, {
        headers: {
            Authorization: `${token}`
        }
    });

    return data;
}