import { pgSchema, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';

// 1. Explicitly isolate tables inside a different PostgreSQL schema
export const notificationSchema = pgSchema('notification_schema');

export const emailLogsTable = notificationSchema.table('email_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  recipientEmail: varchar('recipient_email', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 255 }).notNull(),
  body: text('body').notNull(),
  sentAt: timestamp('sent_at').defaultNow().notNull(),
});
