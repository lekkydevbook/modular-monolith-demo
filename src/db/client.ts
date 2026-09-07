import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

// Central database pool shared across the monolith
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/monolith_db',
});

export const db = drizzle(pool);
export type DatabaseClient = typeof db;
