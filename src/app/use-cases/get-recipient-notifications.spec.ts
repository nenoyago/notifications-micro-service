import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

let notificationsRepository: InMemoryNotificationsRepository;
let getRecipientNotifications: GetRecipientNotifications;

describe('Count recipient notifications', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository
    );
  });

  it('should be able to recipient notifications', async () => {
    const recipients = [
      'fake-recipient-1',
      'fake-recipient-1',
      'fake-recipient-2',
    ];

    recipients.forEach(async recipientId => {
      await notificationsRepository.create(makeNotification({ recipientId }));
    });

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'fake-recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'fake-recipient-1' }),
        expect.objectContaining({ recipientId: 'fake-recipient-1' }),
      ])
    );
  });
});
