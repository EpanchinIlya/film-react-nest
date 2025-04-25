import { ConfigModule } from '@nestjs/config';

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    database: {
      driver: process.env.DATABASE_DRIVER ?? 'postgres',
      url:
        'mongodb://' +
        process.env.DATABASE_HOST +
        ':' +
        process.env.MONGO_DATABASE_PORT +
        '/' +
        process.env.DATABASE_NAME,
      //url: process.env.MONGO_DATABASE_URL,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      host: process.env.DATABASE_HOST ?? 'localhost',
      database_port: Number(process.env.TYPEORM_DATABASE_PORT),
      database_name: process.env.DATABASE_NAME,
      server_port: process.env.SERVER_PORT ?? 3000,
    },
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
  user: string;
  password: string;
  host: string;
  database_port: number;
  database_name: string;
  server_port: number;
}
