/*
  Warnings:

  - A unique constraint covering the columns `[track_id,date]` on the table `events` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "events" ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "style" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "events_track_id_date_key" ON "events"("track_id", "date");
