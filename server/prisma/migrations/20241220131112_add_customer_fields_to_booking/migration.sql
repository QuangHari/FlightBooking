/*
  Warnings:

  - A unique constraint covering the columns `[CustomerID]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Address` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Age` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CustomerFirstName` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CustomerID` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CustomerLastName` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DateOfBirth` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Gender` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `National` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PassportNumber` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PhoneNumber` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "Address" TEXT NOT NULL,
ADD COLUMN     "Age" INTEGER NOT NULL,
ADD COLUMN     "CustomerFirstName" TEXT NOT NULL,
ADD COLUMN     "CustomerID" TEXT NOT NULL,
ADD COLUMN     "CustomerLastName" TEXT NOT NULL,
ADD COLUMN     "DateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "Gender" TEXT NOT NULL,
ADD COLUMN     "National" TEXT NOT NULL,
ADD COLUMN     "PassportNumber" TEXT NOT NULL,
ADD COLUMN     "PhoneNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_CustomerID_key" ON "Booking"("CustomerID");
