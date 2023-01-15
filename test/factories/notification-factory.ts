import { Notification, NotificationProps } from '@app/entities/notification';
import { Content } from '@app/entities/content';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    recipientId: 'fake-recipient-id',
    content: new Content('This is a notification'),
    category: 'social',
    ...override,
  });
}
