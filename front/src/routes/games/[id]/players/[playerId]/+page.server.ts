/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Status } from '$lib/models/event';
import type { PlayerEvents } from '$lib/models/player_events';
import type { Player, Team } from '$lib/models/team';
import axios from 'axios';
import dotenv from 'dotenv';
const url = process.env.API_URL;
export const prerender = true;

export async function load({ params }: { params: { id: string, playerId:string } }) {
	dotenv.config();
	const token = await login();
	const [story, players, status] = await Promise.all([
        getPlayerStory(params.playerId, params.id, token),
        getGamePlayers(params.id,token),
        getStatuses(token),
    ]);
	return {
		events: story.events,
        isWinner: story.winner,
		players,
		status,
        playerId: params.playerId,
	}
}

const getPlayerStory = async (playerId: string, id: string, token: string): Promise<{winner:boolean, events:PlayerEvents[]}> => {
	const { data } = await axios.get(`${url}/game/${id}/player/${playerId}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`
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

const getGamePlayers = async (id: string, token: string): Promise<Player[]> => {
    const {data} = await axios.get(`${url}/game/${id}/player`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`
        }
    });
    return data;
}