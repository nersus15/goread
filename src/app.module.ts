import { Module } from '@nestjs/common';
import { ArtikelsModule } from './artikels/artikels.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './artikels/config/typeOrm.config';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig),
    ArtikelsModule
  ]

})
export class AppModule { }
