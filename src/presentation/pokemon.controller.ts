import { BadRequestException, Controller, Get, NotFoundException, Param, Put } from '@nestjs/common';
import { PokemonService } from '../application/service/pokemon.service';
import { PokemonSummaryDto } from './dto/summaryDTO';

@Controller('pokemon')
export class PokemonController {
    constructor(
        private readonly PokemonService: PokemonService,

    ) { }

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
     * Find a pokemon by naem
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
