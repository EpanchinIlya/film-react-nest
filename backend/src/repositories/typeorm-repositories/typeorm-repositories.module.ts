import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';
import { AppConfig } from 'src/config-provider-module/app.config.provider';
import { ConfigProviderModule } from 'src/config-provider-module/config-provider.module';
import { FilmEntity } from 'src/entity/film.entity';
import { ScheduleEntity } from 'src/entity/schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigProviderModule],
      inject: ['CONFIG'],
      useFactory: async (config: AppConfig) => typeOrmConfig(config),
    }),
    TypeOrmModule.forFeature([FilmEntity, ScheduleEntity]),
  ],
  exports: [TypeOrmModule],
})
export class TypeormRepositoriesModule {}
