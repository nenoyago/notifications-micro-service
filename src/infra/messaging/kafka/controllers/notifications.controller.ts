import { SendNotification } from '@app/use-cases/send-notification';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SendNotificationPayload } from '../dtos/send-notification-payload';

@Controller()
export class NotificationsController {
  constructor(private readonly sendNotificationService: SendNotification) {}

  @EventPattern('notifications.send-notification')
  async handleSendNotification(
    @Payload() { content, category, recipientId }: SendNotificationPayload
  ) {
    await this.sendNotificationService.execute({
      content,
      category,
      recipientId
    });
  }
}
