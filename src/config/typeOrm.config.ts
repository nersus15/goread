import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const TypeOrmConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSSWORD || dbConfig.password,
    database: process.env.RDS_DB_NAME || dbConfig.db_name,
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize
}