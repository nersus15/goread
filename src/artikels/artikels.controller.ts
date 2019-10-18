import { Controller, Get, Query, ValidationPipe, Post, Body, UsePipes, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ArtikelsService } from './artikels.service';
import { GetArtikelDTO } from './dto/getArtikel.dto';
import { CreateArtikelDTO } from './dto/createArtikel.dto';
import { Artikel } from './artikel.entity';
import { ArtikelStatus } from './artikel-status.enum';
import { ArtikelStatusValidationPipe } from './pipes/artikel-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user-decorator';
import { User } from '../auth/user.entity';

@Controller('artikels')
export class ArtikelsController {
    constructor(private artikeService: ArtikelsService) { }

    @Get()
    getArtikel(@Query(ValidationPipe) getArtikel: GetArtikelDTO) {
        return this.artikeService.getArtikels(getArtikel);
    }
    @Get('id/:id')
    getArtikelById(@Param('id') id: string): Promise<Artikel> {
        return this.artikeService.getArtikelById(id, null);
    }
    @Get('/my')
    @UseGuards(AuthGuard())
    getMyArtikel(@Query(ValidationPipe) getArtikel: GetArtikelDTO, @GetUser() user: User) {
        return this.artikeService.getMyArtikels(getArtikel, user);
    }
    @Post()
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    createArtikel(@Body() createArtikelDTO: CreateArtikelDTO, @GetUser() user: User): Promise<Artikel> {
        return this.artikeService.createArtikel(createArtikelDTO, user);
    }

    @Patch('/:id')
    @UseGuards(AuthGuard())
    updateArtikelStatus(@Param('id') id: string, @GetUser() user: User, @Body() params, @Body('status', ArtikelStatusValidationPipe) status: ArtikelStatus): Promise<Artikel> {
        return this.artikeService.updateStatusArtikel(id, user, status, params);
    }
    @Delete('/:id')
    @UseGuards(AuthGuard())
    deleteArtikel(@Param('id') id: string): Promise<void> {
        return this.artikeService.deleteArtikel(id);
    }

}
