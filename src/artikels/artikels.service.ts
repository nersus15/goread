import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtikelRepository } from './artikels.repository';
import { GetArtikelDTO } from './dto/getArtikel.dto';
import { Artikel } from './artikel.entity';
import { CreateArtikelDTO } from './dto/createArtikel.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class ArtikelsService {
    constructor(
        @InjectRepository(ArtikelRepository)
        private artikeRepository: ArtikelRepository
    ) { }
    async getArtikels(getArtikelDTO: GetArtikelDTO): Promise<Artikel[]> {
        return this.artikeRepository.getArtikels(getArtikelDTO, null);

    }
    async getMyArtikels(getArtikelDTO: GetArtikelDTO, user): Promise<Artikel[]> {
        return this.artikeRepository.getArtikels(getArtikelDTO, user);

    }
    async getArtikelById(id: string): Promise<Artikel> {
        const artikel = await this.artikeRepository.findOne(id);
        if (!artikel) {
            throw new NotFoundException(`Artikel With id ${id} not Found`);
        }
        return artikel;
    }
    async createArtikel(createArtikelDTO: CreateArtikelDTO, user: User): Promise<Artikel> {
        return this.artikeRepository.createArtikel(createArtikelDTO, user);
    }
    async updateStatusArtikel(id: string, status: string): Promise<Artikel> {
        const artikel = await this.getArtikelById(id);
        artikel.status = status;
        await artikel.save();
        return artikel;
    }
    async deleteArtikel(id: string): Promise<void> {
        const result = await this.artikeRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Artikel With ID "${id}" Not Found`);
        }

    }

}
