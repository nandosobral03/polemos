/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from 'axios';
import type { Player} from '$lib/models/team';
import { env } from '$lib/env';
import { browser } from '$app/environment';
const url = env.API_URL;
export const csr = true;


export async function load({ params }: { params: { id: string } }) {
	if(browser){
		const token = localStorage.getItem('token') || '';
		const [players] = await Promise.all([
			getGamePlayers(params.id,token),
		]);

		return {
			players,
			gameId: params.id
		};
	}
	else{
		return {
			players: [],
			gameId: params.id
		};
	}
}




const getGamePlayers = async (id: string, token: string): Promise<Player[]> => {
	const { data } = await axios.get(`${url}/game/${id}/player`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`
		}
	});
	return data;
};
