import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtikelRepository } from './artikels.repository';
import { GetArtikelDTO } from './dto/getArtikel.dto';
import { Artikel } from './artikel.entity';
import { CreateArtikelDTO } from './dto/createArtikel.dto';

@Injectable()
export class ArtikelsService {
    constructor(
        @InjectRepository(ArtikelRepository)
        private artikeRepository: ArtikelRepository
    ) { }
    async getArtikels(getArtikelDTO: GetArtikelDTO): Promise<Artikel[]> {
        return this.artikeRepository.getArtikels(getArtikelDTO);

    }
    async createArtikel(createArtikelDTO: CreateArtikelDTO): Promise<Artikel> {
        return this.artikeRepository.createArtikel(createArtikelDTO);
    }
}
