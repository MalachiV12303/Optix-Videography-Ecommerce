import { pgTable, char, varchar, numeric, text, integer } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const lenses = pgTable("lenses", {
	id: char({ length: 8 }).primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	type: varchar({ length: 20 }).notNull(),
	brand: varchar({ length: 20 }).notNull(),
	price: numeric({ precision: 19, scale:  2 }).notNull(),
	maxap: text().notNull(),
	minfl: integer().notNull(),
	maxfl: integer().notNull(),
	mount: text().array().notNull(),
});

export const cameras = pgTable("cameras", {
	id: char({ length: 8 }).primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	type: varchar({ length: 20 }).notNull(),
	brand: varchar({ length: 20 }).notNull(),
	price: numeric({ precision: 19, scale:  2 }).notNull(),
	description: text(),
	res: integer().default(0).notNull(),
	megapixels: numeric({ precision: 3, scale:  1 }).default('0').notNull(),
	shutter: text().notNull(),
	storage: text().array().notNull(),
	mount: text().array().notNull(),
});

export const aerial = pgTable("aerial", {
	id: char({ length: 8 }).primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	brand: varchar({ length: 20 }).notNull(),
	price: numeric({ precision: 19, scale:  2 }).notNull(),
	description: text(),
	time: varchar({ length: 20 }).notNull(),
	res: integer().default(0).notNull(),
	distance: varchar({ length: 20 }).notNull(),
	altitude: varchar({ length: 20 }).notNull(),
	type: text().array(),
});
