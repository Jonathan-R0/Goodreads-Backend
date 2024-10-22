ALTER TABLE "users" ADD COLUMN "biography" text;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");