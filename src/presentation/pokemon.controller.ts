import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { stringify } from 'querystring';
import { PokemonService } from '../application/service/pokemon.service';
import { PokemonSummaryDto } from './dto/summaryDTO';

@Controller('pokemon')
export class PokemonController {
    constructor(
        private readonly PokemonService: PokemonService,

    ) { }

    /**
     * Find many pokemons. Query Pokemon returned with filters.
     * @param query - query parameters for filtering and pagination
     */
    @Get()
    async find(@Query() query) {

        let { skip, limit, ...filterQuery } = query
        skip = skip || "0"
        limit = limit || "10"
        try {
            const pokemons = await this.PokemonService.find(filterQuery, skip, limit)
            if (pokemons.length == 0) {
                throw new NotFoundException("No Pokemon match the query: " + stringify(query))
            }
            return { skip: skip, limit: limit, query: filterQuery, data: pokemons.map((p) => new PokemonSummaryDto(p)) }
        } catch (error) {
            if (error.path) {
                throw new BadRequestException(`Path '${error.path}' does not exist in Pokemon`)
            }
            throw error
        }
    }

    /**
     * Get a list of all distinct pokemon types
     */
    @Get('types')
    async types() {
        const types = await this.PokemonService.types();
        if (types.length == 0) {
            throw new NotFoundException("No types found")
        }
        return types
    }

    /**
     * Get a list of all favorite pokemons
     */
    @Get('favorites')
    async favorites() {
        const favorites = await this.PokemonService.favorites();
        if (favorites.length == 0) {
            throw new NotFoundException("No favorites found")
        }
        return favorites.map((p) => new PokemonSummaryDto(p))
    }

    /**
     * Find a pokemon by name
     * @param name - name of the pokemon to find
     */
    @Get('name/:name')
    async findByName(@Param('name') name: string) {

        const pokemon = await this.PokemonService.findByName(name);
        if (!pokemon) {
            throw new NotFoundException(`Pokemon with name: ${name} does not exist`)
        }
        return pokemon
    }

    /**
     * Find a pokemon by id
     * @param id - id of the pokemon to find
     */
    @Get(':id')
    async findByID(@Param('id') id: string) {
        const pokemon = await this.PokemonService.findByID(id);
        if (!pokemon) {
            throw new NotFoundException(`Pokemon with ID: ${id} does not exist`)
        }
        return pokemon
    }

    /**
    * Set a pokemon as favorite
    * @param id - id of the pokemon to set as favorite
    */
    @Put(':id/favorite')
    async favorite(@Param('id') id: string) {
        const pokemon = await this.PokemonService.setFavorite(id, true);
        if (!pokemon) {
            throw new BadRequestException(`Pokemon with ID: ${id} does not exist`)
        }
        return new PokemonSummaryDto(pokemon)
    }

    /**
     * Unset a pokemon as favorite
     * @param id - id of the pokemon to unset as favorite
     */
    @Put(':id/unfavorite')
    async unfavorite(@Param('id') id: string) {
        const pokemon = await this.PokemonService.setFavorite(id, false);
        if (!pokemon) {
            throw new BadRequestException(`Pokemon with ID: ${id} does not exist`)
        }
        return new PokemonSummaryDto(pokemon)
    }


}
