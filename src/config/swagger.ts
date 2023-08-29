import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SwaggerConfig = (app: INestApplication) => {
  const config = new ConfigService();
  const swaggerConfig = new DocumentBuilder()
    .setTitle('E-learning website verify certificates using blockchain API Document')
    .setDescription('Description of E-learning website verify certificates using blockchain')
    .addServer(config.get('SWAGGER_API_SERVER'))
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: `Please enter access token below:`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access_token',
    )
    .addBearerAuth(
      {
        description: `Please enter refresh token below:`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'refresh_token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);
};
