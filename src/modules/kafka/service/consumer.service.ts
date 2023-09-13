import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Consumer, ConsumerRunConfig, Kafka, logLevel } from 'kafkajs';
import { PrismaService } from '~/prisma';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  constructor(private readonly config: ConfigService, private prisma: PrismaService) {}

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
  private readonly consumers: Consumer[] = [];

  private readonly kafka = new Kafka({
    clientId: this.config.get('APP_NAME'),
    brokers: this.config.get('KAFKA_BROKER'),
    logLevel: logLevel.NOTHING,
  });

  async consume(groupId: string, config: ConsumerRunConfig) {
    try {
      const consume: Consumer = this.kafka.consumer({ groupId: groupId });
      await consume.connect();
      await consume.subscribe({ topic: '', fromBeginning: true });
      await consume.run(config);
      this.consumers.push(consume);
    } catch (error) {
      console.log('Error: ', error);
    }
  }
}
