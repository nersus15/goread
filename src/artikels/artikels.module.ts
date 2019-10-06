import { Module } from '@nestjs/common';
import { ArtikelsController } from './artikels.controller';
import { ArtikelsService } from './artikels.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtikelRepository } from './artikels.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ArtikelRepository])],
  controllers: [ArtikelsController],
  providers: [ArtikelsService]
})
export class ArtikelsModule { }
