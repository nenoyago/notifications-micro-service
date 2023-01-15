import { Notification } from './notification';
import { randomUUID } from 'node:crypto';
import { Content } from './content';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      recipientId: randomUUID(),
      content: new Content('Você recebeu uma solicitação de amizade'),
      category: 'social',
    });
    expect(notification).toBeTruthy();
  });
});
