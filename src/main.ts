import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(ConfigService).get('config');

  await app.listen(appConfig.http.port, () => {
    console.log(
      `---------------------`,
      `\n [MODE] ${appConfig.info.mode}`,
      `\n [DESC] ${appConfig.info.desc}`,
      `\n [HOST] ${appConfig.http.host}`,
      `\n [PORT] ${appConfig.http.port}`,
      `\n---------------------\n\n`,
    );
  });
}

bootstrap();
