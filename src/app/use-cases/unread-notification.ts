import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: UnreadNotificationRequest
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = request;

    const nofitication = await this.notificationsRepository.findById(
      notificationId
    );

    if (!nofitication) {
      throw new NotificationNotFound();
    }

    nofitication.unread();

    await this.notificationsRepository.save(nofitication);
  }
}
