CREATE TABLE IF NOT EXISTS "booksinprogressupdate" (
	"id" serial PRIMARY KEY NOT NULL,
	"author_id" integer,
	"book_excerpt" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booksinprogressupdate" ADD CONSTRAINT "booksinprogressupdate_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
