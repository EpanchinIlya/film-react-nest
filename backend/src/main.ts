import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigProviderModule } from './config-provider-module/config-provider.module';
import { AppConfig } from './config-provider-module/app.config.provider';

async function bootstrap() {
  const tempApp =
    await NestFactory.createApplicationContext(ConfigProviderModule);
  const appConfig = tempApp.get<AppConfig>('CONFIG');
  await tempApp.close();

  const app = await NestFactory.create(AppModule.register(appConfig));
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.listen(3000, () => {
    console.log(`Сервер запущен на порту 3000`);
  });
}

bootstrap();
