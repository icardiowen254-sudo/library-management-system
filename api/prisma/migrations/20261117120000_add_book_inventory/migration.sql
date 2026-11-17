-- Add inventory fields to support library copy tracking.
ALTER TABLE "Book" ADD COLUMN "coverImage" TEXT;
ALTER TABLE "Book" ADD COLUMN "totalCopies" INTEGER NOT NULL DEFAULT 1;
ALTER TABLE "Book" ADD COLUMN "availableCopies" INTEGER NOT NULL DEFAULT 1;

ALTER TABLE "Genre" ADD COLUMN "slug" TEXT;
UPDATE "Genre" SET "slug" = LOWER(REGEXP_REPLACE("name", '[^a-zA-Z0-9]+', '-', 'g'));
ALTER TABLE "Genre" ALTER COLUMN "slug" SET NOT NULL;
CREATE UNIQUE INDEX "Genre_slug_key" ON "Genre"("slug");
