import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

/**
 * DATABASE_URL is optional.
 * - If provided, leads are persisted to Postgres via Drizzle.
 * - If not provided, the app still runs (leads are stored in-memory).
 */
export const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : null;

export const db = pool ? drizzle(pool, { schema }) : null;
