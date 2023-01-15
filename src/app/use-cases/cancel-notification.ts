import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CancelNotificationRequest
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = request;

    const nofitication = await this.notificationsRepository.findById(
      notificationId
    );

    if (!nofitication) {
      throw new NotificationNotFound();
    }

    nofitication.cancel();

    await this.notificationsRepository.save(nofitication);
  }
}
