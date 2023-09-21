import { PrismaService } from '~/prisma';
import { Module } from '@nestjs/common';
import { LikeService } from './service';
import { LikeController } from './controller';

@Module({
  imports: [],
  controllers: [LikeController],
  providers: [PrismaService, LikeService],
  exports: [LikeService],
})
export class LikeModule {}
