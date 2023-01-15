import { Module } from '@nestjs/common';
import { MessagingModule } from '@infra/messaging/messaging.module';
import { HttpModule } from './infra/http/http.module';

@Module({
  imports: [HttpModule, MessagingModule]
})
export class AppModule {}
