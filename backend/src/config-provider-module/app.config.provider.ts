import { ConfigModule } from '@nestjs/config';

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    database: {
      driver: process.env.DATABASE_DRIVER ?? 'memory',
      url:
        'mongodb://' +
        process.env.DATABASE_HOST +
        ':' +
        process.env.MONGO_DATABASE_PORT +
        '/' +
        process.env.DATABASE_NAME,

      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      host: process.env.DATABASE_HOST ?? 'localhost',
      database_port: Number(process.env.TYPEORM_DATABASE_PORT),
      database_name: process.env.DATABASE_NAME,
      server_port: process.env.SERVER_PORT ?? 3000,
    },
    logger: {
      logger: process.env.LOGGER_TYPE ?? 'devLogger',
    },
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
  logger: AppConfigLogger;
}

export interface AppConfigLogger {
  logger: string;
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
