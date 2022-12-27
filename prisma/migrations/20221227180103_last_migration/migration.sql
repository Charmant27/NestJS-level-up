/*
  Warnings:

  - Changed the type of `adminId` on the `places` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "places" DROP CONSTRAINT "places_adminId_fkey";

-- AlterTable
ALTER TABLE "places" DROP COLUMN "adminId",
ADD COLUMN     "adminId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
