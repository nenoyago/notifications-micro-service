import { Notification } from '@app/entities/notification';
import { NotificationsRepository } from '@app/repositories/notifications-repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  private _notifications: Notification[] = [];

  get notifications() {
    return this._notifications;
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      item => item.id === notificationId
    );

    if (!notification) {
      return null;
    }

    return notification;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = this.notifications.filter(
      item => item.recipientId === recipientId
    );

    return notifications;
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.notifications.filter(
      item => item.recipientId === recipientId
    ).length;

    return count;
  }

  async create(notification: Notification): Promise<void> {
    this._notifications.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    const nofiticationIndex = this.notifications.findIndex(
      item => item.id === notification.id
    );

    if (nofiticationIndex >= 0) {
      this._notifications[nofiticationIndex] = notification;
    }
  }
}
