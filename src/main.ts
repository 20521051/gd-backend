import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { SwaggerConfig } from '@/config/swagger';
import * as bodyParser from 'body-parser';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.enableCors();

  app.setGlobalPrefix('v1/api');

  SwaggerConfig(app);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [`${config.get('RABBITMQ_URL')}`],
      queue: `${config.get('RABBITMQ_QUEUE')}`,
      queueOptions: { durable: false },
      prefetchCount: 1,
    },
  });

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

  const SERVER_URL = config.get<string>('SERVER_URL');
  const PORT = config.get<string>('PORT');
  await app.startAllMicroservices();
  await app.listen(PORT);

  console.log(`[⚡Server] Server is running on: ${SERVER_URL}/v1/api`);
  console.log(`[⚡Swagger] Swagger is running on: ${SERVER_URL}/swagger`);
  console.log(`[⚡RabbitMQ] RabbitMQ is running on: ${config.get('RABBITMQ_URL')}`);
}
bootstrap();
