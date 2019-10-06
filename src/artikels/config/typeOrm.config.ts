import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const TypeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 1024,
    username: 'postgres',
    password: 'kambing15',
    database: 'goread',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true
}