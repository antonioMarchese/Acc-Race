-- CreateEnum
CREATE TYPE "event_types" AS ENUM ('LACOPA', 'GT3', 'GT4');

-- CreateEnum
CREATE TYPE "event_styles" AS ENUM ('SPRINT', 'ENDURANCE', 'DOUBLE');

-- CreateEnum
CREATE TYPE "session_types" AS ENUM ('FP', 'R', 'Q');

-- CreateTable
CREATE TABLE "drivers" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "short_name" TEXT,
    "driver_category" INTEGER NOT NULL,
    "helmet_template_key" INTEGER NOT NULL,
    "helmet_base_color" INTEGER NOT NULL,
    "helmet_detail_color" INTEGER NOT NULL,
    "helmet_material_type" INTEGER NOT NULL,
    "helmet_glass_color" INTEGER NOT NULL,
    "helmet_glass_metallic" DOUBLE PRECISION NOT NULL,
    "gloves_template_key" INTEGER NOT NULL,
    "suit_template_key" INTEGER NOT NULL,
    "suit_detail_color1" INTEGER NOT NULL,
    "suit_detail_color2" INTEGER NOT NULL,
    "ai_skill" INTEGER NOT NULL,
    "ai_aggro" INTEGER NOT NULL,
    "ai_rain_skill" INTEGER NOT NULL,
    "ai_consistency" INTEGER NOT NULL,
    "custom_car" TEXT,
    "race_number" INTEGER NOT NULL DEFAULT -1,
    "default_grid_position" INTEGER NOT NULL DEFAULT -1,
    "forced_car_model" INTEGER NOT NULL DEFAULT -1,
    "override_driver_info" INTEGER NOT NULL DEFAULT 1,
    "is_server_admin" INTEGER NOT NULL DEFAULT 1,
    "override_car_model_for_custom_car" INTEGER NOT NULL DEFAULT 0,
    "config_version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeaderBoardLine" (
    "id" TEXT NOT NULL,

    CONSTRAINT "LeaderBoardLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "type" "event_types" NOT NULL,
    "style" "event_styles" NOT NULL,
    "server" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "track_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "drivers_player_id_key" ON "drivers"("player_id");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_track_id_fkey" FOREIGN KEY ("track_id") REFERENCES "tracks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
