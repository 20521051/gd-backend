import { PrismaService } from '~/prisma';
import { Module } from '@nestjs/common';
import { ConsumerService, ProducerService } from './service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, ConsumerService, ProducerService],
  exports: [ConsumerService, ProducerService],
})
export class KafkaModule {}
