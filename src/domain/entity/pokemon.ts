export class Pokemon {
    id: string;
    name: string;
    classification: string;
    types: string[]
    resistant: string[]
    weaknesses: string[]
    weight: {
        minimum: string,
        maximum: string
    };
    height: {
        minimum: string,
        maximum: string
    };
    fleeRate: number;
    "Previous evolution(s)"?: {
        id: number,
        name: string
    }[]
    evolutionRequirements?: {
        amount: number,
        name: string
    }
    evolutions?: {
        id: number,
        name: string
    }[]
    maxCP: number;
    maxHP: number;
    attacks: {
        fast: {
            name: string,
            type: string,
            damage: number
        }[],
        special: {
            name: string,
            type: string,
            damage: number
        }[]
    }
    favorite: boolean;

    "Pokémon Class"?: string
    "LEGENDARY"?: string
    "MYTHIC"?: string
    "Common Capture Area"?: string
    "Asia"?: string
    "North America"?: string
    "Western Europe"?: string
    "Australia, New Zealand"?: string
}

