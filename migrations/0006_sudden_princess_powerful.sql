CREATE TABLE IF NOT EXISTS "booksinprogress" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256),
	"description" text,
	"progress_percentage" integer DEFAULT 0,
	"book_excerpt" text,
	"author_id" integer,
	"isPublished" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"bookInProgressTable_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"content" text NOT NULL,
	"rating" real NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"bookInProgressTable_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recommended" (
	"recommending_author_id" integer,
	"recommended_author_id" integer,
	CONSTRAINT "recommended_recommending_author_id_recommended_author_id_pk" PRIMARY KEY("recommending_author_id","recommended_author_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booksinprogress" ADD CONSTRAINT "booksinprogress_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_bookInProgressTable_id_books_id_fk" FOREIGN KEY ("bookInProgressTable_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_bookInProgressTable_id_booksinprogress_id_fk" FOREIGN KEY ("bookInProgressTable_id") REFERENCES "public"."booksinprogress"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recommended" ADD CONSTRAINT "recommended_recommending_author_id_users_id_fk" FOREIGN KEY ("recommending_author_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recommended" ADD CONSTRAINT "recommended_recommended_author_id_users_id_fk" FOREIGN KEY ("recommended_author_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
