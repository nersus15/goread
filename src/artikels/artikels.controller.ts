import { Controller, Get, Query, ValidationPipe, Post, Body, UsePipes, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ArtikelsService } from './artikels.service';
import { GetArtikelDTO } from './dto/getArtikel.dto';
import { CreateArtikelDTO } from './dto/createArtikel.dto';
import { Artikel } from './artikel.entity';
import { ArtikelStatus } from './artikel-status.enum';
import { ArtikelStatusValidationPipe } from './pipes/artikel-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';

@Controller('artikels')
export class ArtikelsController {
    constructor(private artikeService: ArtikelsService) { }

    @Get()
    @UseGuards(AuthGuard())
    getArtikel(@Query(ValidationPipe) getArtikel: GetArtikelDTO) {
        return this.artikeService.getArtikels(getArtikel);
    }
    @Post()
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    createArtikel(@Body() createArtikelDTO: CreateArtikelDTO): Promise<Artikel> {
        return this.artikeService.createArtikel(createArtikelDTO);
    }

    @Patch('/:id')
    @UseGuards(AuthGuard())
    updateArtikelStatus(@Param('id') id: string, @Body('status', ArtikelStatusValidationPipe) status: ArtikelStatus): Promise<Artikel> {
        return this.artikeService.updateStatusArtikel(id, status);
    }
    @Delete('/:id')
    @UseGuards(AuthGuard())
    deleteArtikel(@Param('id') id: string): Promise<void> {
        return this.artikeService.deleteArtikel(id);
    }

}
