import { PrismaService } from '~/prisma';
import { Module } from '@nestjs/common';
import { CommentService } from './service';
import { CommentController } from './controller';

@Module({
  imports: [],
  controllers: [CommentController],
  providers: [PrismaService, CommentService],
  exports: [CommentService],
})
export class CommentModule {}
