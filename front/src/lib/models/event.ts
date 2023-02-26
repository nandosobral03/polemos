export interface Event {
    id: string;
    attacker_count: number;
    victim_count: number;
    event_type: string;
    direct_damage: number;
    reflected_damage: number;
    description: string;
    victim_status: string;
    status_odds: number;
    user_id?: string;
}

export interface Status {
    id: string;
    name: string;
    color: string;
    damage_reduction: number;
    health_increase: number;
    user_id: string;
}

export interface DayEvent {
    players: {
        id: string;
        health: number;
        status: string;
        previousHealth: number;
        previousStatus: string;
        name: string;
        image?: string | undefined;
        team?: string | undefined;
    }[];
    event_id: string;
}