import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { SwaggerConfig } from '@/config/swagger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.enableCors();

  app.setGlobalPrefix('v1/api');

  SwaggerConfig(app);

  //verify request came from facebook
  // app.use(
  //   bodyParser.json({
  //     verify: verifyRequestSignature,
  //   }),
  // );

  // Process application/x-www-form-urlencoded
  app.use(
    bodyParser.urlencoded({
      extended: false,
    }),
  );

  // Process application/json
  app.use(bodyParser.json());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const SWAGGER_API_SERVER = config.get<string>('SWAGGER_API_SERVER');
  const PORT = config.get<string>('PORT');
  await app.listen(PORT);

  console.log(`[⚡Server] Server is running on: ${SWAGGER_API_SERVER}/v1/api`);
  console.log(`[⚡Server] Swagger is running on: ${SWAGGER_API_SERVER}/swagger`);
}
bootstrap();
