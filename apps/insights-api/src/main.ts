/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { EnvironmentService } from './app/configuration/environment/environment.service';
import { config } from './docs/document-builder';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const environment = app.get(EnvironmentService);

  if (!environment.isProduction) {
    app.enableCors();
  }

  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = environment.port;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
