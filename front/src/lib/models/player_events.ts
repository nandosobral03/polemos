export interface CurrentPlayer {
    id: string;
    health: number;
    status: string;
    previousHealth: number;
    previousStatus: string;
}

export interface PlayerEvents {
    id: string;
    attacker_count: number;
    victim_count: number;
    event_type: string;
    direct_damage: number;
    reflected_damage: number;
    description: string;
    victim_status: string;
    status_odds: number;
    user_id: string;
    players: string[];
    number: number;
    current_players: CurrentPlayer[];
}

