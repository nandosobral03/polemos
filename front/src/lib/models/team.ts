export interface Player {
    id?: string;
    name: string;
    image?: string;
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