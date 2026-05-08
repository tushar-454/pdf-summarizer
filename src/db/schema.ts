// src/db/schema.ts
import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const pdfs = pgTable("pdfs", {
    id: serial("id").primaryKey(),
    content: varchar("content", { length: 10000 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const summaries = pgTable("summaries", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 256 }).notNull(),
    summary: varchar("summary", { length: 10000 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
