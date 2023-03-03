import axios from 'axios';
import { env } from '$lib/env';
import { browser } from '$app/environment';
import type { Status } from '$lib/models/event';
import { error } from '@sveltejs/kit';
const url = env.API_URL;
export const ssr = true;
export const csr = true;


export async function load({params} : {params: {id: string}}) {
    if(browser){
        const token = localStorage.getItem('token') || '';
        const statuses = await getStatuses(token);
        console.log(statuses);
        console.log(params)
        let status = statuses.filter((status:Status) => status.id != "1").filter((status:Status) => status.id == params.id)[0];
        if(!status){
            throw error(404, 'Not found')
        }
        else{
            status = status || {name: "No status", color: "red", damage_reduction: 1, health_increase: 1, id: "0"};
            return {
                status: status
            };
        }
    }
    else{
        return {
            statuses: []
        };
    }
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