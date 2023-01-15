import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';

let notificationsRepository: InMemoryNotificationsRepository;
let cancelNotification: CancelNotification;

describe('Cancel notification', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    cancelNotification = new CancelNotification(notificationsRepository);
  });

  it('should be able to cancel a notification', async () => {
    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date)
    );
  });

  it('should not be able to cancel a an non existing notification', async () => {
    expect(
      async () =>
        await cancelNotification.execute({
          notificationId: 'fake-notification-id',
        })
    ).rejects.toThrow(NotificationNotFound);
  });
});
