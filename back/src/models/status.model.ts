export interface Status {
    id?: string;
    name: string;
    color: string;
    health_increase: number;
    damage_reduction: number;
    user_id?: string;
}


export const isStatus = (status: Status): {correct:boolean, structure: any} => {
    return {
        correct: status.name !== undefined && status.color !== undefined && status.health_increase !== undefined && status.damage_reduction !== undefined,
        structure : statusStructure
    }
}


export const statusStructure = {
    name: "string",
    color: "string",
    health_increase: "number",
    damage_reduction: "number",
}
