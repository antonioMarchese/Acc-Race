/*
  Warnings:

  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_track_id_fkey";

-- DropForeignKey
ALTER TABLE "leader_border_lines" DROP CONSTRAINT "leader_border_lines_event_id_fkey";

-- DropTable
DROP TABLE "Event";

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "type" "event_types" NOT NULL,
    "style" "event_styles" NOT NULL,
    "server" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "track_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "laps" (
    "id" SERIAL NOT NULL,
    "lap_number" INTEGER NOT NULL,
    "lap_time" TEXT NOT NULL,
    "driver_index" INTEGER NOT NULL,
    "is_valid_for_best" BOOLEAN NOT NULL DEFAULT false,
    "event_car_id" INTEGER NOT NULL,
    "split_one" TEXT NOT NULL,
    "split_two" TEXT NOT NULL,
    "split_three" TEXT NOT NULL,
    "session_type" "session_types" NOT NULL,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "laps_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_track_id_fkey" FOREIGN KEY ("track_id") REFERENCES "tracks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leader_border_lines" ADD CONSTRAINT "leader_border_lines_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laps" ADD CONSTRAINT "laps_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
