import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SwaggerConfig = (app: INestApplication) => {
  const config = new ConfigService();
  const swaggerConfig = new DocumentBuilder()
    .setTitle('E-learning website verify certificates using blockchain API Document')
    .setDescription('Description of E-learning website verify certificates using blockchain')
    .addServer(config.get('SWAGGER_API_SERVER'))
    .addBearerAuth(
      {
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      // 'access_token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);
};
