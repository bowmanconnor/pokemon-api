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

// class HeightWeight {
//     minimum: string
//     maximum: string
// }
// class Evoutions {
//     id: number
//     name: string
// }
// class EvolutionRequirements {
//     amount: number
//     name: string
// }
// class Attacks {
//     fast: AttackClass[]
//     special: AttackClass[]
// }
// class AttackClass {
//     name: string
//     type: string
//     damage: number
// }
// export class Pokemon {
//     id: string;
//     name: string;
//     classification: string;
//     types: string[];
//     resistant: string[];
//     weaknesses: string[];
//     weight: HeightWeight;
//     height: HeightWeight;
//     fleeRate: number;
//     "Previous evolution(s)"?: Evoutions[];
//     evolutionRequirements?: EvolutionRequirements;
//     evolutions?: Evoutions[];
//     maxCP: number;
//     maxHP: number;
//     attacks: Attacks;
//     favorite: boolean;
// }
