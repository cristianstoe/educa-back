/*
  Warnings:

  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_pkey",
ALTER COLUMN "ID" DROP DEFAULT,
ALTER COLUMN "ID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY ("ID");
DROP SEQUENCE "Usuario_ID_seq";
