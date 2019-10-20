import { EntityRepository, Repository, Timestamp } from "typeorm";
import { Artikel } from "./artikel.entity";
import { CreateArtikelDTO } from "./dto/createArtikel.dto";
import * as uuid from 'uuid';
import { GetArtikelDTO } from "./dto/getArtikel.dto";
import { ArtikelStatus } from "./artikel-status.enum";
import { User } from "src/auth/user.entity";
import { Logger, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Artikel)
export class ArtikelRepository extends Repository<Artikel>{
    private logger = new Logger('ArtikelRepository');
    async createArtikel(createArtikelDTO: CreateArtikelDTO, user: User): Promise<Artikel> {
        const { title, content, category } = createArtikelDTO;
        const artikel = new Artikel();

        artikel.id = uuid();
        artikel.title = title;
        artikel.content = content;
        artikel.category = category;
        artikel.status = ArtikelStatus.DRAFT;
        artikel.creator = user;

        try {
            await artikel.save();
        } catch (err) {
            this.logger.error(`Failed to create artikel for user "${user.username}". Data: ${JSON.stringify(createArtikelDTO)}`, err.stack);

        }

        delete artikel.creator;
        return artikel;
    }
    async getArtikels(getArtikelDTO: GetArtikelDTO, user: User): Promise<Artikel[]> {
        const { keyword, status } = getArtikelDTO;
        const query = this.createQueryBuilder('artikel');
        if (user) {
            query.where('artikel.creatorId=:creatorId', { creatorId: user.id });
        }

        if (status) {
            query.andWhere('artikel.status=:status', { status });
        }
        if (keyword) {
            query.andWhere('artikel.title LIKE :keyword or artikel.content LIKE :keyword or artikel.category LIKE :keyword', { keyword: `%${keyword}%` })
        }
        try {
            const artikels = await query.getMany();
            return artikels;
        } catch (err) {
            if (user) {
                this.logger.error(`Failed to get artikels for user "${user.username}". Filters: ${JSON.stringify(getArtikelDTO)}`, err.stack);
            } else {
                this.logger.error(`Failed to get artikels ", DTO: ${JSON.stringify(getArtikelDTO)}`, err.stack);
            }
            throw new InternalServerErrorException();
        }
    }
}