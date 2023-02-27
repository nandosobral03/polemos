import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
export const ssr = true;
export const csr = true;

export function load({route}: {route:{id:string}}) {
	if (browser) {
        const token = localStorage.getItem('token') || '';
        if (!token) {
            throw redirect(303,'/login');
        }else{
            throw redirect(300,'/players');
        }
    }
}
