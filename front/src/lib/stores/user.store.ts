import axios from 'axios';
import { env } from '$lib/env';
const url = env.API_URL;

export const login = async (username:string, password:string) : Promise<{token:string}> =>{
    const {data} = await axios.post(`${url}/auth`,{
        username,
        password
    });
    return data;
}

export const guestLogin = async () : Promise<{token:string}> =>{
    const {data} = await axios.post(`${url}/auth`,{
        username:"guest",
        password:"guest"
    });
    return data;
}


export default {
    login,
    guestLogin
}