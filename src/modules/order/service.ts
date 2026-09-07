import { DatabaseClient } from '../../db/client';
import { NotificationModule } from '../notification';
import { ordersTable } from './db.schema';
import { eventBus } from '../../eventBus';

export type CreateOrderDTO = { customerEmail: string; total: number };

export const createOrderService = (db: DatabaseClient, notificationModule: NotificationModule) => {
  const createOrder = async (data: CreateOrderDTO) => {
    const totalCents = Math.round(data.total * 100);

    // 1. Database execution
    const [newOrder] = await db.insert(ordersTable).values({
      customerEmail: data.customerEmail,
      totalCents: totalCents,
      status: 'SUCCESS'
    }).returning();

    // 2. Synchronous In-Memory Call to another module
    await notificationModule.sendEmail({
      to: 'admin@store.com',
      subject: `New Order: ${newOrder.id}`,
      body: `Total: $${data.total}`
    });

    // 3. Asynchronous Event dispatch
    eventBus.publish('order.created', {
      orderId: newOrder.id,
      customerEmail: newOrder.customerEmail,
      total: data.total
    });

    return { orderId: newOrder.id, status: newOrder.status };
  };

  return { createOrder };
};

export type OrderService = ReturnType<typeof createOrderService>;
