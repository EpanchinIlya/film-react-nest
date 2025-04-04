import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
import { configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { FilmsService } from './films/films.service';
import { MemoryRepository } from './repository/memory-repository/memory-repository';
import { FILM_REPOSITORY } from './repository/filmRepository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public', 'content', 'afisha'), // Путь к папке с файлами
      serveRoot: '/content/afisha', // Статика будет доступна по этому пути
    }),
  ],
  controllers: [FilmsController, OrderController],
  providers: [
    configProvider,
    OrderService,
    FilmsService,
    {
      provide: FILM_REPOSITORY,
      useClass: MemoryRepository,
    },
  ],
})
export class AppModule {}
