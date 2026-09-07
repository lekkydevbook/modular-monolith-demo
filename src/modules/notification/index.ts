import { DatabaseClient } from '../../db/client';
import { emailLogsTable } from './db.schema';
import { eventBus } from '../../eventBus';

export type SendEmailInput = { to: string; subject: string; body: string };

// imported into app.ts
export const createNotificationModule = (db: DatabaseClient) => {
  const sendEmail = async (input: SendEmailInput) => {
    // Write record to the notification module's private database schema
    await db.insert(emailLogsTable).values({
      recipientEmail: input.to,
      subject: input.subject,
      body: input.body
    });

    console.log(`[Notification DB Logged] Email sent to ${input.to}`);
    return { success: true };
  };

  // Async subscriber
  eventBus.subscribe('order.created', async (payload: { orderId: string; customerEmail: string; total: number }) => {
    await sendEmail({
      to: payload.customerEmail,
      subject: `Order Confirmation`,
      body: `Thank you for your purchase of $${payload.total}!`
    });
  });

  return { sendEmail };
};

// imported into order/index.ts
export type NotificationModule = ReturnType<typeof createNotificationModule>;
