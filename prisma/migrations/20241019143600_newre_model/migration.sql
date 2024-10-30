/*
  Warnings:

  - You are about to drop the column `foodId` on the `SaleTemp` table. All the data in the column will be lost.
  - You are about to drop the column `qty` on the `SaleTemp` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SaleTemp" DROP CONSTRAINT "SaleTemp_foodId_fkey";

-- AlterTable
ALTER TABLE "SaleTemp" DROP COLUMN "foodId",
DROP COLUMN "qty";
