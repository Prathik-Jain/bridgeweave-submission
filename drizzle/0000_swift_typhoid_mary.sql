CREATE TABLE IF NOT EXISTS "hotel" (
	"id" bigint PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"featured_image" text NOT NULL,
	"location" text NOT NULL,
	"rate" numeric NOT NULL,
	"star_rating" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reservation" (
	"id" bigint PRIMARY KEY NOT NULL,
	"hotel_id" bigint NOT NULL,
	"guest_name" text NOT NULL,
	"total_amount" numeric NOT NULL,
	"check_in" date NOT NULL,
	"check_out" date NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "hotel_name_idx" ON "hotel" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "hotel_star_rating_idx" ON "hotel" ("star_rating");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "hotel_location_idx" ON "hotel" ("location");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "hotel_rate_idx" ON "hotel" ("rate");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reservation_hotel_id_idx" ON "reservation" ("hotel_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reservation_hotel_check_in" ON "reservation" ("check_in");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reservation_hotel_check_out" ON "reservation" ("check_out");