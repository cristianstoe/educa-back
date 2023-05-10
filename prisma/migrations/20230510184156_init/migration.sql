/*
  Warnings:

  - You are about to drop the `Audio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Texto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Audio` to the `Aula` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Texto` to the `Aula` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Video` to the `Aula` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Audio" DROP CONSTRAINT "Audio_AulaID_fkey";

-- DropForeignKey
ALTER TABLE "Texto" DROP CONSTRAINT "Texto_AulaID_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_AulaID_fkey";

-- AlterTable
ALTER TABLE "Aula" ADD COLUMN     "Audio" TEXT NOT NULL,
ADD COLUMN     "Texto" TEXT NOT NULL,
ADD COLUMN     "Video" TEXT NOT NULL;

-- DropTable
DROP TABLE "Audio";

-- DropTable
DROP TABLE "Texto";

-- DropTable
DROP TABLE "Video";
