export class Pokemon {
    id: string;
    name: string;
    classification: string;
    types: string[]
    resistant: string[]
    weakness: string[]
    weight: {
        minimum: string,
        maximum: string
    };
    height: {
        minimum: string,
        maximum: string
    };
    fleeRate: number;
    previousEvolutions?: {
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
}
