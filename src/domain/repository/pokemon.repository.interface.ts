import { Pokemon } from "../entity/pokemon";

export interface IPokemonRepository {
    /**
     * Finds all Pokemons. Query all Pokemons with filters . Handles search Pokemon by name. 
     * Returns close match for name and exact match for all other queries.
     * @param {any} [query] - The query to search for Pokemons
     * @param {number} [skip=0] - The number of Pokemons to skip     
     * @param {number} [limit=10] - The number of Pokemons to retrieve
     * @returns {Promise<any>} - A promise that resolves with the found Pokemons
     */
    findMany(query?: any, skip?: number, limit?: number): Promise<any>;

    /**
     * Finds one Pokemon in the database by the inputted dict
     * 
     * @param {object} values - The Pokemon's ID
     * @returns {Promise<Pokemon>} - A promise that resolves with the found Pokemon
     */
    findOne(values: object): Promise<Pokemon>;


    /**
     * Update one Pokemon in the database
     * 
     * @param {Pokemon} id - The Pokemon's ID
     * @param {object} values - Keys and values to update in the pokemon
     * @returns {Promise<Pokemon>} - A promise that resolves with the updated Pokemon
     */
    updateOne(id: string, values: object): Promise<Pokemon>;

    /**
     * Finds all unique values of input attribute of all Pokemons in database
     * @param {string} attribute - Keys and values to update in the pokemon
     * @returns {Promise<any[]>}
    */
    distinct(attribute: string): Promise<any[]>
}