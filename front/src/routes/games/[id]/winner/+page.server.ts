import type { DayInfo, Game, GameInfo } from '$lib/models/game';
import type { Event, Status } from '$lib/models/event';
import axios from 'axios';
import dotenv from 'dotenv';
import type { Sponsor, Team } from '$lib/models/team';
const url = process.env.API_URL;
export const prerender = true;


export async function load({params}:{params: {id: string}}) {
    dotenv.config();
    const token = await login();
    console.log("params", params);
    const [game, teams, sponsors] = await Promise.all([
        getGameInfo(params.id, token),
        getTeams(token),
        getSponsors(token)
    ]);

    const getSponsorName = (id: string) => sponsors.find(sponsor => sponsor.id === id)!.name;

    const {winner , ...rest} = game;

    return {
        winner:
            teams.map(team => 
                team.players.map(player => {return {...player, team: team.name, sponsor: 
                    getSponsorName(team.sponsor)
                }})
            ).flat().find(player => player.id === game.winner)!,
        gameId: params.id,
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

const getTeams = async (token:string) : Promise<Team[]> =>{
    const {data} = await axios.get(`${url}/teams`,{
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${token}`
        }
    });
    return data;
}


const getSponsors = async (token:string) : Promise<Sponsor[]> =>{
    const {data} = await axios.get(`${url}/sponsors`,{
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${token}`
        }
    });
    return data;
}