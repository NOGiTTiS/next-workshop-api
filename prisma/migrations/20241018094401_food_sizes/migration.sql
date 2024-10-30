/*
  Warnings:

  - You are about to drop the column `moneyAddes` on the `FoodSize` table. All the data in the column will be lost.
  - Added the required column `moneyAdded` to the `FoodSize` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FoodSize" DROP COLUMN "moneyAddes",
ADD COLUMN     "moneyAdded" INTEGER NOT NULL;
