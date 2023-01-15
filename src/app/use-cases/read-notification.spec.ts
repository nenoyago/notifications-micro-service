import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { ReadNotification } from './read-notification';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';

let notificationsRepository: InMemoryNotificationsRepository;
let readNotification: ReadNotification;

describe('Read notification', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    readNotification = new ReadNotification(notificationsRepository);
  });

  it('should be able to read a notification', async () => {
    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date)
    );
  });

  it('should not be able to read a an non existing notification', async () => {
    expect(
      async () =>
        await readNotification.execute({
          notificationId: 'fake-notification-id',
        })
    ).rejects.toThrow(NotificationNotFound);
  });
});
