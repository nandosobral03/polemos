import type { Team } from '$lib/models/team';
import axios from 'axios';
import dotenv from 'dotenv';
const url = process.env.API_URL;
export const prerender = true;


export async function load({params}: {params: {id: string}}) {
    dotenv.config();
    const token = await login();
    const [teams] = await Promise.all([
        getTeams(token)
    ]);
    return {
        teams
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