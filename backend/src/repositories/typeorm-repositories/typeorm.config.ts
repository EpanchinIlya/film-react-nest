import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppConfig } from 'src/config-provider-module/app.config.provider';
import { FilmEntity } from 'src/entity/film.entity';
import { ScheduleEntity } from 'src/entity/schedule.entity';

export const typeOrmConfig = async (
  config: AppConfig,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: config.database.driver as 'postgres', // Тип базы данных
    host: config.database.host,
    port: config.database.database_port,
    username: config.database.user,
    password: config.database.password,
    database: config.database.database_name,
    entities: [FilmEntity, ScheduleEntity],
    //synchronize: true,
  };
};
