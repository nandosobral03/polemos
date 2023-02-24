/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { DayInfo, Game, GameInfo } from '$lib/models/game';
import type { Event, Status } from '$lib/models/event';
import axios from 'axios';
import dotenv from 'dotenv';
import type { Sponsor, Team } from '$lib/models/team';
import type { GameSummary } from '$lib/models/summary';
const url = process.env.API_URL;
export const prerender = true;

export async function load({ params }: { params: { id: string } }) {
	dotenv.config();
	const token = await login();
	const [game, teams, sponsors, summary] = await Promise.all([
		getGameInfo(params.id, token),
		getTeams(token),
		getSponsors(token),
		getGameSummary(params.id, token)
	]);

    const getSponsorName = (id: string) => sponsors.find((sponsor) => sponsor.id === id)!.name;
	const players = teams
		.map((team) =>
			team.players.map((player) => {
				return { ...player, team: team.name, sponsor: getSponsorName(team.sponsor) };
			})
		)
		.flat();
        
	return {
		winner: players.find((player) => player.id === game.winner)!,
		gameId: params.id,
		mostKills: summary.summary
			.map((player) => {
				return players.find((p) => p.id === player.id)!;
			})
			.map((player) => {
				return {
					...player,
					...summary.summary.find((p) => p.id === player.id)!
				};
			}).sort((a, b) => b.kills - a.kills).slice(0, 3),
        

	};
}

const login = async (): Promise<string> => {
	const { data } = await axios.post(`${url}/auth`, {
		username: process.env.API_USERNAME,
		password: process.env.API_PASSWORD
	});

	return data.token;
};

const getGameSummary = async (id: string, token: string): Promise<GameSummary> => {
	const { data } = await axios.get(`${url}/game/${id}/summary`, {
		headers: {
			Authorization: `${token}`
		}
	});

	return data;
};

const getGameInfo = async (id: string, token: string): Promise<GameInfo> => {
	const { data } = await axios.get(`${url}/game/${id}`, {
		headers: {
			Authorization: `${token}`
		}
	});

	return data;
};

const getTeams = async (token: string): Promise<Team[]> => {
	const { data } = await axios.get(`${url}/teams`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`
		}
	});
	return data;
};

const getSponsors = async (token: string): Promise<Sponsor[]> => {
	const { data } = await axios.get(`${url}/sponsors`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`
		}
	});
	return data;
};
