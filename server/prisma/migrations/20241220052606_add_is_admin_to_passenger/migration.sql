/*
  Warnings:

  - You are about to drop the column `Images` on the `Aircraft` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Aircraft" DROP COLUMN "Images";

-- AlterTable
ALTER TABLE "Passenger" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;
