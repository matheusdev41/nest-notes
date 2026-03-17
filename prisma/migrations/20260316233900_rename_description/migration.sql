/*
  Warnings:

  - You are about to drop the column `desciption` on the `Note` table. All the data in the column will be lost.
  - Added the required column `description` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
ALTER TABLE "Note"
RENAME COLUMN "desciption" TO "description";
