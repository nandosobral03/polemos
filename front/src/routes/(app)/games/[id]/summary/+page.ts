/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { GameInfo } from '$lib/models/game';
import axios from 'axios';
import type { Sponsor, Team } from '$lib/models/team';
import type { GameSummary } from '$lib/models/summary';
import { env } from '$lib/env';
const url = env.API_URL;
export const ssr = false;
export const csr = true;

export async function load({ params }: { params: { id: string } }) {
	const token = localStorage.getItem('token') || '';
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
		},
		params: {
			includePlayers: "true"
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
