ALTER TABLE "books" 
    ALTER COLUMN "publication_date" SET DATA TYPE timestamp without time zone 
    USING publication_date::timestamp without time zone;
ALTER TABLE "books" 
    ALTER COLUMN "publication_date" SET DEFAULT now();