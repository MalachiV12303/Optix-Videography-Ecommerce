import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from "@vercel/postgres";

if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL environment variable is not set');
}

export const db = drizzle(sql);