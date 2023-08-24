import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule, PrismaModule, UserModule } from '@/modules';
import { AppController } from '@/app.controller';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from '~/auth/guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    UserModule,
    AuthModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
