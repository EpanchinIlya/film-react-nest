import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'node:path';
import { configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { FilmsService } from './films/films.service';
import { MemoryRepository } from './repository/memory-repository/memory-repository';
import { MongoRepository } from './repository/mongo-repository/mongo-repository';
import { FILM_REPOSITORY } from './repository/filmRepository';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmSchema } from './repository/mongo-repository/models';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Импортируем ConfigModule для доступа к ConfigService
      inject: [ConfigService], // Инжектим ConfigService в useFactory
      useFactory: async (configService: ConfigService) => {
        const dbUrl = configService.get<string>('DATABASE_URL'); // Чтение строки подключения
        console.log(dbUrl);
        return { uri: dbUrl }; // Возвращаем URI для подключения
      },
    }),
    MongooseModule.forFeature([{ name: 'film', schema: FilmSchema }]), // Подключаем схему Film
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
    }),
  ],
  controllers: [FilmsController, OrderController],
  providers: [
    configProvider,
    OrderService,
    FilmsService,
    {
      provide: FILM_REPOSITORY,
      useClass: MongoRepository,
    },
  ],
})
export class AppModule {}
