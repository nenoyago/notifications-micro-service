import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { UnreadNotification } from './unread-notification';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';

let notificationsRepository: InMemoryNotificationsRepository;
let unreadNotification: UnreadNotification;

describe('Unread notification', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    unreadNotification = new UnreadNotification(notificationsRepository);
  });

  it('should be able to unread a notification', async () => {
    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a an non existing notification', async () => {
    expect(
      async () =>
        await unreadNotification.execute({
          notificationId: 'fake-notification-id',
        })
    ).rejects.toThrow(NotificationNotFound);
  });
});
