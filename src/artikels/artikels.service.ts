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
    async getMyArtikels(getArtikelDTO: GetArtikelDTO, user: User): Promise<Artikel[]> {
        return this.artikeRepository.getArtikels(getArtikelDTO, user);

    }
    async getArtikelById(id: string, user: User): Promise<Artikel> {
        let artikel;
        if (user) {
            artikel = await this.artikeRepository.findOne({ where: { id, creatorId: user.id } });
        } else {
            artikel = await this.artikeRepository.findOne(id);
        }

        if (!artikel) {
            throw new NotFoundException(`Artikel With id ${id} not Found`);
        }
        return artikel;
    }
    async createArtikel(createArtikelDTO: CreateArtikelDTO, user: User): Promise<Artikel> {
        return this.artikeRepository.createArtikel(createArtikelDTO, user);
    }
    async updateStatusArtikel(id: string, user: User, status: string, params): Promise<Artikel> {
        const artikel = await this.getArtikelById(id, user);
        const { title, content, category } = params;
        if (status) {
            artikel.status = status;
        }
        if (title) {
            artikel.title = title;
        }
        if (content) {
            artikel.content = content;
        }
        if (category) {
            artikel.category = category;
        }
        await artikel.save();
        return artikel;
    }
    async deleteArtikel(id: string, user: User): Promise<void> {
        const result = await this.artikeRepository.delete({ id, creatorId: user.id });
        if (result.affected === 0) {
            throw new NotFoundException(`Artikel With ID "${id}" Not Found`);
        }

    }

}
