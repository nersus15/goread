import { Module } from '@nestjs/common';
import { ArtikelsController } from './artikels.controller';
import { ArtikelsService } from './artikels.service';

@Module({
  controllers: [ArtikelsController],
  providers: [ArtikelsService]
})
export class ArtikelsModule {}
