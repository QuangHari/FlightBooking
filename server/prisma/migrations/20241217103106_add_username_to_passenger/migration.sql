/*
  Warnings:

  - A unique constraint covering the columns `[Username]` on the table `Passenger` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Username` to the `Passenger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Passenger" ADD COLUMN     "Username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Passenger_Username_key" ON "Passenger"("Username");
