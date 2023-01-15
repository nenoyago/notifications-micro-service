import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

let notificationsRepository: InMemoryNotificationsRepository;
let countRecipientNotifications: CountRecipientNotifications;

describe('Count recipient notifications', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository
    );
  });

  it('should be able to count recipient notifications', async () => {
    const recipients = [
      'fake-recipient-1',
      'fake-recipient-1',
      'fake-recipient-2',
    ];

    recipients.forEach(async recipientId => {
      await notificationsRepository.create(makeNotification({ recipientId }));
    });

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'fake-recipient-1',
    });

    expect(count).toEqual(2);
  });
});
