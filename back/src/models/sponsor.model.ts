export interface Sponsor {
    id?: string;
    name: string;
}

export const isSponsor = (sponsor: Sponsor): {correct:boolean, structure: any} => {
    return {
        correct: sponsor.name !== undefined,
        structure : sponsorStructure
    }
}

export const sponsorStructure = {
    name: "string",
}
