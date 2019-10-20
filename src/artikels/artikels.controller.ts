import { Controller, Get, Query, ValidationPipe, Post, Body, UsePipes, Patch, Param, Delete, UseGuards, Logger } from '@nestjs/common';
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
    private logger = new Logger('ArtikelsController');
    constructor(private artikeService: ArtikelsService) { }

    @Get()
    getArtikel(@Query(ValidationPipe) getArtikel: GetArtikelDTO) {
        this.logger.verbose(`retrieving all artikels. Filter: ${JSON.stringify(getArtikel)}`);
        return this.artikeService.getArtikels(getArtikel);
    }
    @Get('id/:id')
    getArtikelById(@Param('id') id: string): Promise<Artikel> {
        this.logger.verbose(`retrieving artikels By id "${id}"`);
        return this.artikeService.getArtikelById(id, null);
    }
    @Get('/my')
    @UseGuards(AuthGuard())
    getMyArtikel(@Query(ValidationPipe) getArtikel: GetArtikelDTO, @GetUser() user: User) {
        this.logger.verbose(`${user.username} retrieving all artikels was created by ${user.username}. Filter: ${JSON.stringify(getArtikel)}`);
        return this.artikeService.getMyArtikels(getArtikel, user);
    }
    @Post()
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    createArtikel(@Body() createArtikelDTO: CreateArtikelDTO, @GetUser() user: User): Promise<Artikel> {
        this.logger.verbose(`User "${user.username}" create new artikels. Data: ${JSON.stringify(createArtikelDTO)}`);
        return this.artikeService.createArtikel(createArtikelDTO, user);
    }

    @Patch('/:id')
    @UseGuards(AuthGuard())
    updateArtikelStatus(@Param('id') id: string, @GetUser() user: User, @Body() params, @Body('status', ArtikelStatusValidationPipe) status: ArtikelStatus): Promise<Artikel> {
        this.logger.verbose(`User "${user.username}" update artikels with id "${id}". new data: ${JSON.stringify(params)}`);
        return this.artikeService.updateStatusArtikel(id, user, status, params);
    }
    @Delete('/:id')
    @UseGuards(AuthGuard())
    deleteArtikel(@Param('id') id: string, @GetUser() user: User): Promise<void> {
        this.logger.verbose(`User "${user.username}" delete artikels with id "${id}"}`);
        return this.artikeService.deleteArtikel(id, user);
    }

}
