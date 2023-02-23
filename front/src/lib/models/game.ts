export interface Game {
    id: string;
    date: string;
    user_id: string;
    days: number;
    winner: string;
}

interface Day {
    events: number;
    dead: number;
    number: number;
}

export interface GameInfo {
    id: string;
    date: Date;
    user_id: string;
    days: Day[];
    winner: string;
}


export interface DayInfo {
    
}

export interface CurrentPlayer {
    id: string;
    health: number;
    status: string;
    previousHealth: number;
    previousStatus: string;
}

export interface DayEvent {
    event_id: string;
    players: string[];
}

export interface DayInfo {
    current_players: CurrentPlayer[];
    deaths: string[];
    events: DayEvent[];
}


