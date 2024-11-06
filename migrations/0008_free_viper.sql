ALTER TABLE "reviews" DROP CONSTRAINT "reviews_bookInProgressTable_id_books_id_fk";
--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "book_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "reviews" DROP COLUMN IF EXISTS "bookInProgressTable_id";