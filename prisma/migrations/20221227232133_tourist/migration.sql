/*
  Warnings:

  - Added the required column `place` to the `tourists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tourists" ADD COLUMN     "place" TEXT NOT NULL;
