import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule, CategoryModule, PrismaModule, UserModule, VideoModule } from '@/modules';
import { AppController } from '@/app.controller';
import { AwsModule } from './modules/aws';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    CategoryModule,
    VideoModule,
    AwsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
