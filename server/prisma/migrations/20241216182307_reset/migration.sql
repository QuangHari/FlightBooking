/*
  Warnings:

  - Added the required column `BusinessPrice` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BusinessSeats` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EconomyPrice` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EconomySeats` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "BusinessPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "BusinessSeats" INTEGER NOT NULL,
ADD COLUMN     "EconomyPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "EconomySeats" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Flight" ADD COLUMN     "AircraftID" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "BusinessPrice" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "BusinessSeats" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "EconomyPrice" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "EconomySeats" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Aircraft" (
    "AircraftID" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Images" TEXT[],
    "Capacity" INTEGER NOT NULL,
    "Details" TEXT,

    CONSTRAINT "Aircraft_pkey" PRIMARY KEY ("AircraftID")
);

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_AircraftID_fkey" FOREIGN KEY ("AircraftID") REFERENCES "Aircraft"("AircraftID") ON DELETE RESTRICT ON UPDATE CASCADE;
