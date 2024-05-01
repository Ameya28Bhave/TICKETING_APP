import { Publisher, OrderCreatedEvent, Subjects } from '@ab2895tickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
