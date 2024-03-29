/*
  Warnings:

  - Added the required column `session_type` to the `leader_border_lines` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "leader_border_lines" ADD COLUMN     "session_type" "session_types" NOT NULL;
