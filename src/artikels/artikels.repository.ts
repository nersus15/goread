import { EntityRepository, Repository, Timestamp } from "typeorm";
import { Artikel } from "./artikel.entity";
import { CreateArtikelDTO } from "./dto/createArtikel.dto";
import * as uuid from 'uuid';
import { GetArtikelDTO } from "./dto/getArtikel.dto";
import { ArtikelStatus } from "./artikel-status.enum";
import { User } from "src/auth/user.entity";

@EntityRepository(Artikel)
export class ArtikelRepository extends Repository<Artikel>{
    async createArtikel(createArtikelDTO: CreateArtikelDTO, user: User): Promise<Artikel> {
        const { title, content, category } = createArtikelDTO;
        const artikel = new Artikel();

        artikel.id = uuid();
        artikel.title = title;
        artikel.content = content;
        artikel.category = category;
        artikel.status = ArtikelStatus.DRAFT;
        artikel.creator = user;
        await artikel.save();
        delete artikel.creator;
        return artikel;
    }
    async getArtikels(getArtikelDTO: GetArtikelDTO): Promise<Artikel[]> {
        const { keyword, status } = getArtikelDTO;
        const query = this.createQueryBuilder('artikel');
        if (status) {
            query.andWhere('artikel.status=:status', { status });
        }
        if (keyword) {
            query.andWhere('artikel.title LIKE :keyword or artikel.content LIKE :keyword or artikel.category LIKE :keyword or artikel.creator LIKE :keyword', { keyword: `%${keyword}%` })
        }
        const artikels = await query.getMany();
        return artikels;
    }
}