/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from 'axios';
import dotenv from 'dotenv';
import type { Player, Sponsor, Team } from '$lib/models/team';
const url = process.env.API_URL;
export const prerender = true;

export async function load({ params }: { params: { id: string } }) {
	dotenv.config();
	const token = await login();
	const [players] = await Promise.all([
		getGamePlayers(params.id,token),
	]);

	return {
		players,
		gameId: params.id
	};
}

const login = async (): Promise<string> => {
	const { data } = await axios.post(`${url}/auth`, {
		username: process.env.API_USERNAME,
		password: process.env.API_PASSWORD
	});

	return data.token;
};


const getGamePlayers = async (id: string, token: string): Promise<Player[]> => {
	const { data } = await axios.get(`${url}/game/${id}/player`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`
		}
	});
	return data;
};
