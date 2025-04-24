/* eslint-disable prettier/prettier */
import { DynamicModule, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'node:path';

import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { FilmsService } from './films/films.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MemoryRepository } from './repositories/memory-repository/memory-repository';
import { MongoRepository } from './repositories/mongo-repository/mongo-repository';
import { FILM_REPOSITORY } from './repositories/filmRepository';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import {
  FilmSchema,
  FilmWithScheduleDto,
} from './repositories/mongo-repository/models';
import { AppConfig } from './config-provider-module/app.config.provider';
import { ConfigProviderModule } from './config-provider-module/config-provider.module';
import { Model } from 'mongoose';
import { PostgresRepository } from './repositories/typeorm-repositories/postgresRepository';
import { Repository } from 'typeorm';

import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { FilmEntity } from './entity/film.entity';
import { ScheduleEntity } from './entity/schedule.entity';
import { TypeormRepositoriesModule } from './repositories/typeorm-repositories/typeorm-repositories.module';

// @Module({
//   imports: [
//     ConfigProviderModule,
   
//     ServeStaticModule.forRoot({
//       rootPath: path.join(__dirname, '..', 'public', 'content', 'afisha'),
//       serveRoot: '/content/afisha',
//     }),



// ...(process.env.DATABASE_DRIVER === 'mongodb'
//   ? [
//       MongooseModule.forRootAsync({
//         imports: [ConfigProviderModule],
//         inject: ['CONFIG'],
//         useFactory: async (config: AppConfig) => ({
//           uri: config.database.url,
//         }),
//       }),
//       MongooseModule.forFeature([{ name: 'film', schema: FilmSchema }]),
//     ]
//   : []),



// ...(process.env.DATABASE_DRIVER === 'postgres'
//       ? [
//           TypeormRepositoriesModule,
//           TypeOrmModule.forFeature([FilmEntity, ScheduleEntity]),
//         ]
//       : []),


   
//   ],
//   controllers: [FilmsController, OrderController],
//   providers: [
//     OrderService,
//     FilmsService,

//     {
//       provide: FILM_REPOSITORY,
//       inject: [
//         'CONFIG',
        
//         ...(process.env.DATABASE_DRIVER === 'mongodb'
//           ? [getModelToken('film')]
//           : []),

//         ...(process.env.DATABASE_DRIVER === 'postgres'
//           ? [getRepositoryToken(FilmEntity), getRepositoryToken(ScheduleEntity)]
//           : []),
       
//       ],
//       useFactory: (
//         config: AppConfig,
//         ...args: any[]
      
//       ) => {
       
//         switch (config.database.driver) {
//           case 'mongodb':
//             return new MongoRepository(args[0] as Model<FilmWithScheduleDto>);
//           case 'postgres':
//             return new PostgresRepository( args[0] as Repository<FilmEntity>,
//                                            args[1] as Repository<ScheduleEntity>
//                                           );
//           case 'memory':
//             return new MemoryRepository();
//           default:
//             throw new Error(
//               `Unknown repository type: ${config.database.driver}`,
//             );
//         }
//       },
//     },
//   ],
// })
// export class AppModule {}



@Module({
  imports: [
    ConfigProviderModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
    }),
  ],
})
export class AppModule {
  static register(config: AppConfig): DynamicModule {
    console.log("  ============   Устанавливаем связь с базой: " + config.database.driver+ "     =======================");

    return {
      module: AppModule,
      imports: [
        ...(config.database.driver === 'mongodb'
          ? [
              MongooseModule.forRootAsync({
                imports: [ConfigProviderModule],
                inject: ['CONFIG'],
                useFactory: async (config: AppConfig) => ({
                  uri: config.database.url,
                }),
              }),
              MongooseModule.forFeature([{ name: 'film', schema: FilmSchema }]),
            ]
          : []),
        ...(config.database.driver === 'postgres'
          ? [
              TypeormRepositoriesModule,
              TypeOrmModule.forFeature([FilmEntity, ScheduleEntity]),
            ]
          : []),
      ],
      controllers: [FilmsController, OrderController],
      providers: [
        OrderService,
        FilmsService,
        {
          provide: FILM_REPOSITORY,
          inject: [
            'CONFIG',
            ...(config.database.driver === 'mongodb'
              ? [getModelToken('film')]
              : []),
            ...(config.database.driver === 'postgres'
              ? [getRepositoryToken(FilmEntity), getRepositoryToken(ScheduleEntity)]
              : []),
          ],
          useFactory: (
            config: AppConfig,
            ...args: any[]
          ) => {
            switch (config.database.driver) {
              case 'mongodb':
                return new MongoRepository(args[0] as Model<FilmWithScheduleDto> );
              case 'postgres':
                return new PostgresRepository(args[0] as Repository<FilmEntity>, args[1] as Repository<ScheduleEntity>);
              case 'memory':
                return new MemoryRepository();
              default:
                throw new Error(`Unknown repository type: ${config.database.driver}`);
            }
          },
        },
      ],
    };
  }
}
