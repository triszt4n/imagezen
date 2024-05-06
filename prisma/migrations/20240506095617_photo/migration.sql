/*
  Warnings:

  - You are about to drop the column `content` on the `Photo` table. All the data in the column will be lost.
  - Added the required column `ext` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "content",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "ext" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
