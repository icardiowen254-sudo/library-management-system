-- Add inventory fields to support library copy tracking.
ALTER TABLE "Book" ADD COLUMN "coverImage" TEXT;
ALTER TABLE "Book" ADD COLUMN "totalCopies" INTEGER NOT NULL DEFAULT 1;
ALTER TABLE "Book" ADD COLUMN "availableCopies" INTEGER NOT NULL DEFAULT 1;
