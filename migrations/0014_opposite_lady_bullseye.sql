ALTER TABLE "answer" DROP CONSTRAINT "answer_questionId_question_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "answer" ADD CONSTRAINT "answer_questionId_question_id_fk" FOREIGN KEY ("questionId") REFERENCES "public"."question"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
