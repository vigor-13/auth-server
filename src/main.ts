import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(ConfigService).get('config');

  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Auth Server Example')
    .setVersion('1.0.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, swaggerDocument);

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
