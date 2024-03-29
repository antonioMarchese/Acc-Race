/*
  Warnings:

  - You are about to drop the `LeaderBoardLine` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "LeaderBoardLine";

-- CreateTable
CREATE TABLE "leader_border_lines" (
    "id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "race_number" INTEGER NOT NULL,
    "lap_count" INTEGER NOT NULL,
    "best_lap" TEXT NOT NULL,
    "total_time" TEXT NOT NULL,
    "is_spectator" BOOLEAN NOT NULL DEFAULT false,
    "player_id" TEXT NOT NULL,
    "car_id" INTEGER NOT NULL,

    CONSTRAINT "leader_border_lines_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "leader_border_lines" ADD CONSTRAINT "leader_border_lines_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leader_border_lines" ADD CONSTRAINT "leader_border_lines_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "drivers"("player_id") ON DELETE RESTRICT ON UPDATE CASCADE;
