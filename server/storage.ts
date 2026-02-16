import { db } from "./db";
import { leads, type InsertLead, type Lead } from "@shared/schema";

export interface IStorage {
  createLead(lead: InsertLead): Promise<Lead>;
}

/**
 * In-memory fallback so the project runs locally without Postgres.
 */
class MemoryStorage implements IStorage {
  private rows: Lead[] = [];
  private idSeq = 1;

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const row: Lead = {
      id: this.idSeq++,
      city: insertLead.city,
      product: insertLead.product,
      currency: insertLead.currency,
      amount: insertLead.amount,
      convertedAmount: null,
      createdAt: new Date(),
    };
    this.rows.unshift(row);
    return row;
  }
}

export class DatabaseStorage implements IStorage {
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const d = db;
    if (!d) {
      throw new Error("Database not configured. Set DATABASE_URL or use MemoryStorage.");
    }
    const [lead] = await d.insert(leads).values(insertLead).returning();
    return lead as Lead;
  }
}

export const storage: IStorage = db ? new DatabaseStorage() : new MemoryStorage();
