import { Pokemon } from "../entity/pokemon";

export interface IPokemonRepository {
    /**
     * Creates a new Pokemon in the database
     * 
     * @param {Pokemon} pokemon - The Pokemon data transfer object
     * @returns {Promise<Pokemon>} - A promise that resolves with the created Pokemon
     */
    create(pokemon: Pokemon): Promise<Pokemon>;

    /**
     * Delete a pokemon in the database
     * @param {string} id - The id of the Pokemon to de deleted
     * @returns {boolean} - A boolean representing if the pokemon was deleted
     */
    delete(id: string): Promise<boolean>;

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