import { Module } from '@nestjs/common';
import { ArtikelsModule } from './artikels/artikels.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeOrm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig),
    ArtikelsModule,
    AuthModule
  ]

})
export class AppModule { }
