import { Controller, Get, Query, ValidationPipe, Post, Body, UsePipes } from '@nestjs/common';
import { ArtikelsService } from './artikels.service';
import { GetArtikelDTO } from './dto/getArtikel.dto';
import { CreateArtikelDTO } from './dto/createArtikel.dto';
import { Artikel } from './artikel.entity';

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
}
