
export interface Event {
    id?: string;
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

export const isEvent = (event: Event): {correct:boolean, structure: any} => {
    return {
        correct: event.attacker_count !== undefined 
        && event.victim_count !== undefined && event.event_type !== undefined && event.direct_damage !== undefined 
        && event.reflected_damage !== undefined && event.description !== undefined && event.victim_status !== undefined
        && event.status_odds !== undefined,
        structure : eventStructure
    }
}

export const eventStructure = {
    attacker_count: "number",
    victim_count: "number",
    event_type: "string",
    direct_damage: "number",
    reflected_damage: "number",
    description: "string",
    victim_status: "string",
    status_odds: "number",
}
