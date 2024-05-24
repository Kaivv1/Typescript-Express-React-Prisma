/*
  Warnings:

  - Added the required column `isFavorite` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isForDeletion` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "isFavorite" BOOLEAN NOT NULL,
ADD COLUMN     "isForDeletion" BOOLEAN NOT NULL;
