CREATE TABLE IF NOT EXISTS "aerial" (
	"id" char(8) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"brand" varchar(20) NOT NULL,
	"price" numeric(19, 2) NOT NULL,
	"description" text,
	"time" varchar(20) NOT NULL,
	"res" integer DEFAULT 0 NOT NULL,
	"distance" varchar(20) NOT NULL,
	"altitude" varchar(20) NOT NULL
);
