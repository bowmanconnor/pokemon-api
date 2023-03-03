import { Pokemon } from "../entity/pokemon";

export interface IPokemonService {
    /**
     * Find many Pokemons. Handles filtering. Handles get all favorites
     
     * @param query -  Query can handle filtering returned pokemons by all attributes, 
     * including by name and by favorite.
     */
    find(query?: any, skip?: number, limit?: number): Promise<Pokemon[]>;

    /**
     * Find one pokemon by id
     * @param id 
     */
    findByID(values: string): Promise<Pokemon>;


    /**
     * Find one pokemon by name
     * @param id 
     */
    findByName(name: string): Promise<Pokemon>;

    /**
     * Set the value of a pokemons favorite attribute
     * @param id 
     * @param favorite 
     */
    setFavorite(id: string, favorite: boolean): Promise<Pokemon>;

    /**
     * Returns all distinct values from the types attribute
     */
    types(): Promise<any[]>;
}

