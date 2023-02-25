/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Event, Status } from '$lib/models/event';
import type { Team } from '$lib/models/team';
import axios from 'axios';
import dotenv from 'dotenv';
const url = process.env.API_URL;
export const prerender = true;

export async function load({ params }: { params: { id: string, playerId:string } }) {
	dotenv.config();
	const token = await login();
	const [events, teams, status] = await Promise.all([
        getPlayerEvents(params.playerId, params.id, token),
        getTeams(token),
        getStatuses(token),
    ]);
	return {
		events,
		teams,
		status
	}
}

const getPlayerEvents = async (playerId: string, id: string, token: string): Promise<Event[]> => {
	const { data } = await axios.get(`${url}/game/${id}/player/${playerId}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`
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

const getStatuses = async (token:string) : Promise<Status[]> =>{
    const {data} = await axios.get(`${url}/statuses`,{
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${token}`
        }
    });
    return data;
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

