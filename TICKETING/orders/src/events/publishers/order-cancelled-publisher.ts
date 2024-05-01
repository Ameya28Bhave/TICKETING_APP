import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from '@ab2895tickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
