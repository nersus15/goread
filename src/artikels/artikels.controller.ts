import { Controller, Get, Query, ValidationPipe, Post, Body, UsePipes, Patch, Param, Delete } from '@nestjs/common';
import { ArtikelsService } from './artikels.service';
import { GetArtikelDTO } from './dto/getArtikel.dto';
import { CreateArtikelDTO } from './dto/createArtikel.dto';
import { Artikel } from './artikel.entity';
import { ArtikelStatus } from './artikel-status.enum';
import { ArtikelStatusValidationPipe } from './pipes/artikel-status-validation.pipe';

@Controller('artikels')
export class ArtikelsController {
    constructor(private artikeService: ArtikelsService) { }

    @Get()
    getArtikel(@Query(ValidationPipe) getArtikel: GetArtikelDTO) {
        return this.artikeService.getArtikels(getArtikel);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createArtikel(@Body() createArtikelDTO: CreateArtikelDTO): Promise<Artikel> {
        return this.artikeService.createArtikel(createArtikelDTO);
    }

    @Patch('/:id')
    updateArtikelStatus(@Param('id') id: string, @Body('status', ArtikelStatusValidationPipe) status: ArtikelStatus): Promise<Artikel> {
        return this.artikeService.updateStatusArtikel(id, status);
    }
    @Delete('/:id')
    deleteArtikel(@Param('id') id: string): Promise<void> {
        return this.artikeService.deleteArtikel(id);
    }

}
