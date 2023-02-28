import { Pokemon } from "../entity/pokemon";

export interface IPokemonService {
    /**
     * Create a new pokemon.
     * @param pokemon 
     */
    create(pokemon: Pokemon): Promise<Pokemon>;

    /**
     * Delete one pokemon
     * @param id 
     */
    delete(id: string): Promise<boolean>;

    /**
     * Find many Pokemons
     
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

