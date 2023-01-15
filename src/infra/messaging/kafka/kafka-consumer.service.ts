import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['loyal-terrier-9640-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username: String(process.env.KAFKA_CONSUMER_USERNAME),
          password: String(process.env.KAFKA_CONSUMER_PASSWORD)
        },
        ssl: true
      }
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
