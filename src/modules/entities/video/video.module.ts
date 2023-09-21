import { PrismaService } from '~/prisma';
import { Module } from '@nestjs/common';
import { VideoService } from './service';
import { VideoController } from './controller';

@Module({
  imports: [],
  controllers: [VideoController],
  providers: [PrismaService, VideoService],
  exports: [VideoService],
})
export class VideoModule {}
