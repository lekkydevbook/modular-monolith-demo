import { pgSchema, uuid, varchar, integer, timestamp } from 'drizzle-orm/pg-core';

// 1. Explicitly isolate tables inside a dedicated PostgreSQL schema
export const orderingSchema = pgSchema('ordering_schema');

export const ordersTable = orderingSchema.table('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  customerEmail: varchar('customer_email', { length: 255 }).notNull(),
  totalCents: integer('total_cents').notNull(), // Best practice: store money as integers
  status: varchar('status', { length: 50 }).notNull().default('PENDING'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
