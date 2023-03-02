import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { PokemonService } from '../application/service/pokemon.service';

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
}
