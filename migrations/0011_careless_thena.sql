CREATE TABLE IF NOT EXISTS "answer" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" text,
	"questionId" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "answer" ADD CONSTRAINT "answer_questionId_question_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."question"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
