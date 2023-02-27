import { browser } from '$app/environment';
import { env } from '$lib/env';
import type { Team } from '$lib/models/team';
import axios from 'axios';
const url = env.API_URL;
export const csr = true;

export async function load({ params }: { params: { id: string } }) {
	if (browser) {
		const token = localStorage.getItem('token') || '';
		const [teams] = await Promise.all([getTeams(token)]);
		return {
			teams
		};
	} else {
		return {
			teams: []
		};
	}
}

const getTeams = async (token: string): Promise<Team[]> => {
	const { data } = await axios.get(`${url}/teams`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`
		}
	});
	return data;
};
