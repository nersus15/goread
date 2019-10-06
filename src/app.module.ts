import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtikelsModule } from './artikels/artikels.module';

@Module({
  imports: [ArtikelsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
