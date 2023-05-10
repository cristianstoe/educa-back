/*
  Warnings:

  - Added the required column `Tags` to the `Aula` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Aula" ADD COLUMN     "Tags" TEXT NOT NULL;
