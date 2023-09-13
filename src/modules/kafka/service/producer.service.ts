import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer, ProducerRecord, logLevel } from 'kafkajs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  constructor(private config: ConfigService) {}

  async onModuleInit() {
    await this.producer.connect();
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }

  private readonly kafka = new Kafka({
    clientId: this.config.get('APP_NAME'),
    brokers: this.config.get('KAFKA_BROKER'),
    logLevel: logLevel.NOTHING,
  });

  private readonly producer: Producer = this.kafka.producer();

  async produce(record: ProducerRecord) {
    await this.producer.send(record);
  }
}
