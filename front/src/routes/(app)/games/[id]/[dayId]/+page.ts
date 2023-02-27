import type { DayInfo, GameInfo } from '$lib/models/game';
import type { Event, Status } from '$lib/models/event';
import axios from 'axios';
import { env } from '$lib/env.dev';
import type { Team } from '$lib/models/team';
const url = env.API_URL;
export const ssr = false;
export const csr = true;


    
export async function load({params}:{params: {id: string, dayId: string}}) {
    const token  = localStorage.getItem('token') || '';
    const [day, events, teams, status, game] = await Promise.all([
        getDay(params.id, params.dayId, token),
        getEvents(token, params.id, params.dayId),
        getTeams(token),
        getStatuses(token),
        getGameInfo(params.id, token)
    ]);

    return {
        day,
        events,
        teams,
        status,
        game: game,
        dayNumber: parseInt(params.dayId) || 1
    };
}



const getDay = async (id: string, dayId: string, token: string) : Promise<DayInfo> => {
    const {data} = await axios.get(`${url}/game/${id}/day/${dayId}`, {
        headers: {
            Authorization: `${token}`
        }
    });
    return data;
}

const getEvents = async (token:string,gameId:string, dayId:string) : Promise<Event[]> => {
    const {data} = await axios.get(`${url}/events`,{
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${token}`,
        },
        params: {
            gameId: gameId,
            dayNumber: dayId
        }
    });
    return data;
}

const getTeams = async (token:string) : Promise<Team[]> =>{
    const {data} = await axios.get(`${url}/teams`,{
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${token}`
        },
        params: {
            includePlayers: "true"
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

const getGameInfo = async (id:string, token: string) : Promise<GameInfo> => {
    const {data} = await axios.get(`${url}/game/${id}`, {
        headers: {
            Authorization: `${token}`
        }
    });

    return data;
}