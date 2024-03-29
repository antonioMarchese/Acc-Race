-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "external_id" INTEGER NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);
