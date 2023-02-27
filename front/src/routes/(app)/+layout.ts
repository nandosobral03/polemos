import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
export const ssr = true;
export const csr = true;

export function load({route}: {route:{id:string}}) {
	if (browser) {
        if(route.id !== '/login'){
            const token = localStorage.getItem('token') || '';
            try{
                if (!token) {
                    throw redirect(303,'/login');
                }
            }   
            catch(err){
                throw redirect(303,'/login');
            }
        }
    }
    else{
        return;
    }
}
