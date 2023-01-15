import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/types/replace';
import { BaseEntity } from './base';
import { Content } from './content';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  canceledAt?: Date | null;
  readAt?: Date | null;
  createdAt: Date;
}

export class Notification extends BaseEntity {
  private notification: NotificationProps;

  constructor(
    notification: Replace<NotificationProps, { createdAt?: Date }>,
    id?: string
  ) {
    super(id ?? randomUUID());
    this.notification = {
      ...notification,
      createdAt: notification.createdAt ?? new Date(),
    };
  }

  public get recipientId() {
    return this.notification.recipientId;
  }

  public set recipientId(recipientId: string) {
    this.notification.recipientId = recipientId;
  }

  public get content() {
    return this.notification.content;
  }

  public set content(content: Content) {
    this.notification.content = content;
  }

  public get category() {
    return this.notification.category;
  }

  public set category(category: string) {
    this.notification.category = category;
  }

  public get readAt(): Date | null | undefined {
    return this.notification.readAt;
  }

  public read() {
    this.notification.readAt = new Date();
  }

  public unread() {
    this.notification.readAt = null;
  }

  public get canceledAt(): Date | null | undefined {
    return this.notification.canceledAt;
  }

  public cancel() {
    this.notification.canceledAt = new Date();
  }

  public get createdAt() {
    return this.notification.createdAt;
  }
}
