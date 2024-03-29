/*
  Warnings:

  - You are about to drop the column `driver_index` on the `laps` table. All the data in the column will be lost.
  - Added the required column `player_id` to the `laps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "laps" DROP COLUMN "driver_index",
ADD COLUMN     "player_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "penalties" (
    "id" SERIAL NOT NULL,
    "event_car_id" INTEGER NOT NULL,
    "session_type" "session_types" NOT NULL,
    "reason" TEXT NOT NULL,
    "penalty" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "violation_in_lap" INTEGER NOT NULL DEFAULT -1,
    "cleared_in_lap" INTEGER NOT NULL DEFAULT -1,
    "player_id" TEXT NOT NULL,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "penalties_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "laps" ADD CONSTRAINT "laps_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "drivers"("player_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "penalties" ADD CONSTRAINT "penalties_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "penalties" ADD CONSTRAINT "penalties_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "drivers"("player_id") ON DELETE RESTRICT ON UPDATE CASCADE;
