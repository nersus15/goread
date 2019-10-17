import { Module } from '@nestjs/common';
import { ArtikelsController } from './artikels.controller';
import { ArtikelsService } from './artikels.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtikelRepository } from './artikels.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArtikelRepository]),
    AuthModule
  ],
  controllers: [ArtikelsController],
  providers: [ArtikelsService]
})
export class ArtikelsModule { }
