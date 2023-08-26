import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule, CategoryModule, PrismaModule, UserModule, VideoModule } from '@/modules';
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
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
