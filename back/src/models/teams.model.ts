
export interface Team {
    id?: string;
    name: string;
    sponsor: string;
    players: Player[];
}

export interface Player {
    id?: string;
    name: string;
    image: string;
}

export const isTeam = (team: Team): {correct:boolean, structure: any} => {
    if (team.players === undefined) {
        team.players = [];
    }
    return {
        correct: team.name !== undefined && team.sponsor !== undefined && team.players !== undefined && team.players.every(isPlayer),
        structure : teamStructure
    }
}

export const isPlayer = (player: Player): {correct:boolean, structure: any} => {
    return{
        correct: player.name !== undefined,
        structure: playerStructure
    }
}

export const playerStructure = {
    name: "string",
    image: "string",
}

export const teamStructure = {
    name: "string",
    sponsor: "string",
    players: `array of ${JSON.stringify(playerStructure).replace(/"/g, "")}`
}    



export interface GamePlayer extends Player {
    health: number;
    alive: boolean;
    kills: number;
    status: string;
    id: string;
}
