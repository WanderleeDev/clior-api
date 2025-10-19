import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

const configService = new ConfigService();
const isProduction = process.env.NODE_ENV === 'production';
const ssl = isProduction ? { rejectUnauthorized: false } : false;

// @ts-expect-error // TypeORM expects predefined strings for type
export const dataSourceOptions: DataSourceOptions = {
  type: configService.getOrThrow('DB_TYPE'),
  host: configService.getOrThrow<string>('DB_HOST'),
  port: configService.getOrThrow<number>('DB_PORT'),
  username: configService.getOrThrow<string>('DB_USERNAME'),
  password: configService.getOrThrow<string>('DB_PASSWORD'),
  database: configService.getOrThrow<string>('DB_NAME'),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  migrationsTableName: 'migrations',
  migrationsRun: false,
  synchronize: !isProduction,
  logging: !isProduction,
  extra: {
    connectionLimit: 10,
  },
  ssl,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
