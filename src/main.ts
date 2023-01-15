import { KafkaConsumerService } from '@infra/messaging/kafka/kafka-consumer.service';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices/interfaces';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const kakaConsumerService = app.get(KafkaConsumerService);

  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice<MicroserviceOptions>({
    strategy: kakaConsumerService
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
