import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  AuthModule,
  CategoryModule,
  UserModule,
  VideoModule,
  CourseModule,
  CommentModule,
  SectionModule,
  ExerciseModule,
  LikeModule,
  NotificationModule,
} from '@/modules/entities';
import { PrismaModule } from '@/modules/database';
import { CloudinaryModule, S3Module } from '@/modules/storage';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    // ClientsModule.registerAsync([
    //   {
    //     name: 'RABBITMQ_SERVICE',
    //     imports: [ConfigModule],
    //     useFactory: (config: ConfigService) => ({
    //       transport: Transport.RMQ,
    //       options: {
    //         urls: [`${config.get('RABBITMQ_URL')}`],
    //         queue: `${config.get('RABBITMQ_QUEUE')}`,
    //         queueOptions: {
    //           durable: false,
    //         },
    //       },
    //     }),
    //     inject: [ConfigService],
    //   },
    // ]),
    PrismaModule,
    AuthModule,
    UserModule,
    CategoryModule,
    VideoModule,
    S3Module,
    CloudinaryModule,
    CourseModule,
    CommentModule,
    SectionModule,
    ExerciseModule,
    LikeModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
