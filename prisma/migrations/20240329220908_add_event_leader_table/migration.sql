/*
  Warnings:

  - You are about to drop the column `car_id` on the `leader_border_lines` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[external_id]` on the table `cars` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `car_model` to the `leader_border_lines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_car_id` to the `leader_border_lines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_id` to the `leader_border_lines` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "leader_border_lines" DROP CONSTRAINT "leader_border_lines_car_id_fkey";

-- AlterTable
ALTER TABLE "leader_border_lines" DROP COLUMN "car_id",
ADD COLUMN     "car_model" INTEGER NOT NULL,
ADD COLUMN     "event_car_id" INTEGER NOT NULL,
ADD COLUMN     "event_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cars_external_id_key" ON "cars"("external_id");

-- AddForeignKey
ALTER TABLE "leader_border_lines" ADD CONSTRAINT "leader_border_lines_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leader_border_lines" ADD CONSTRAINT "leader_border_lines_car_model_fkey" FOREIGN KEY ("car_model") REFERENCES "cars"("external_id") ON DELETE RESTRICT ON UPDATE CASCADE;
