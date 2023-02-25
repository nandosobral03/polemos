export interface Player {
    id?: string;
    name: string;
    image?: string;
    team?: string;
}

export interface Team {
    id: string;
    name: string;
    sponsor: string;
    players: Player[];
}

export interface Sponsor{
    id: string;
    name: string;
}


export interface PlayerInfo{
    id: string;
    name: string;
    image: string;
    team_id: string;
    team: string;
    total_kills: number;
    total_wins: number;
    total_deaths: number;
}