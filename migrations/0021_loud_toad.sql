ALTER TABLE "booksinprogressupdate" ADD COLUMN "book_in_progress_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booksinprogressupdate" ADD CONSTRAINT "booksinprogressupdate_book_in_progress_id_booksinprogress_id_fk" FOREIGN KEY ("book_in_progress_id") REFERENCES "public"."booksinprogress"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
