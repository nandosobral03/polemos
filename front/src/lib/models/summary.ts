export interface PlayerSummary {
    id: string;
    kills: number;
}

export interface GameSummary {
    id: string;
    date: Date;
    user_id: string;
    days: number;
    winner: string;
    summary: PlayerSummary[];
}