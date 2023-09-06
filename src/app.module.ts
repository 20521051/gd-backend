import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  AuthModule,
  AwsModule,
  CategoryModule,
  CloudinaryModule,
  PrismaModule,
  UserModule,
  VideoModule,
  HeliaModule,
  CourseModule,
} from '@/modules';
import { AppController } from '@/app.controller';

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
    HeliaModule,
    CloudinaryModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
