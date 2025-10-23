ALTER TABLE "cameras" RENAME COLUMN "value" TO "price";--> statement-breakpoint
ALTER TABLE "lenses" RENAME COLUMN "value" TO "price";--> statement-breakpoint
ALTER TABLE "cameras" ALTER COLUMN "id" SET DATA TYPE char(8);--> statement-breakpoint
ALTER TABLE "cameras" ALTER COLUMN "name" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "cameras" ALTER COLUMN "type" SET DATA TYPE varchar(20);--> statement-breakpoint
ALTER TABLE "cameras" ALTER COLUMN "brand" SET DATA TYPE varchar(20);--> statement-breakpoint
ALTER TABLE "cameras" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "lenses" ALTER COLUMN "id" SET DATA TYPE char(8);--> statement-breakpoint
ALTER TABLE "lenses" ALTER COLUMN "name" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "lenses" ALTER COLUMN "type" SET DATA TYPE varchar(20);--> statement-breakpoint
ALTER TABLE "lenses" ALTER COLUMN "brand" SET DATA TYPE varchar(20);--> statement-breakpoint
ALTER TABLE "cameras" ADD COLUMN "shutter" text;--> statement-breakpoint
ALTER TABLE "cameras" ADD COLUMN "res" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "cameras" ADD COLUMN "megapixels" numeric(3, 1) DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "cameras" ADD COLUMN "storage" text[];--> statement-breakpoint
ALTER TABLE "cameras" ADD COLUMN "mount" text[];--> statement-breakpoint
ALTER TABLE "lenses" ADD COLUMN "maxap" text NOT NULL;--> statement-breakpoint
ALTER TABLE "lenses" ADD COLUMN "minfl" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "lenses" ADD COLUMN "maxfl" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "lenses" ADD COLUMN "mount" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "cameras" DROP COLUMN IF EXISTS "details";--> statement-breakpoint
ALTER TABLE "lenses" DROP COLUMN IF EXISTS "details";