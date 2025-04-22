import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'node:path';

import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { FilmsService } from './films/films.service';
import { MemoryRepository } from './repository/memory-repository/memory-repository';
import { MongoRepository } from './repository/mongo-repository/mongo-repository';
import { FILM_REPOSITORY } from './repository/filmRepository';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmSchema } from './repository/mongo-repository/models';
import { AppConfig } from './config/app.config.provider';
import { ConfigProviderModule } from './config/config-provider.module';

@Module({
  imports: [
    ConfigProviderModule,
    MongooseModule.forRootAsync({
      imports: [ConfigProviderModule],
      inject: ['CONFIG'],
      useFactory: async (config: AppConfig) => ({
        uri: config.database.url,
      }),
    }),
    MongooseModule.forFeature([{ name: 'film', schema: FilmSchema }]), // Подключаем схему Film

    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
    }),
  ],
  controllers: [FilmsController, OrderController],
  providers: [
    OrderService,
    FilmsService,
    {
      provide: FILM_REPOSITORY,
      useClass: MongoRepository,
      //useClass: MemoryRepository,
    },
  ],
})
export class AppModule {}
