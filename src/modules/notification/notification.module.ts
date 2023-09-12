import { PrismaService } from '~/prisma';
import { Module } from '@nestjs/common';
import { NotificationService } from './service';
import { NotificationController } from './controller';

@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [PrismaService, NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
