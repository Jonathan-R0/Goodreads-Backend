ALTER TABLE "reviews" DROP CONSTRAINT "reviews_bookInProgressTable_id_books_id_fk";
--> statement-breakpoint
ALTER TABLE "comments" DROP CONSTRAINT "comments_bookInProgressTable_id_booksinprogress_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_bookInProgressTable_id_books_id_fk" FOREIGN KEY ("bookInProgressTable_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_bookInProgressTable_id_booksinprogress_id_fk" FOREIGN KEY ("bookInProgressTable_id") REFERENCES "public"."booksinprogress"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
