/*
  Warnings:

  - You are about to drop the column `Audio` on the `Aula` table. All the data in the column will be lost.
  - You are about to drop the column `Publicado` on the `Aula` table. All the data in the column will be lost.
  - You are about to drop the column `Texto` on the `Aula` table. All the data in the column will be lost.
  - You are about to drop the column `Video` on the `Aula` table. All the data in the column will be lost.
  - Made the column `CursoID` on table `Aula` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Aula" DROP CONSTRAINT "Aula_CursoID_fkey";

-- AlterTable
ALTER TABLE "Aula" DROP COLUMN "Audio",
DROP COLUMN "Publicado",
DROP COLUMN "Texto",
DROP COLUMN "Video",
ALTER COLUMN "CursoID" SET NOT NULL;

-- CreateTable
CREATE TABLE "Texto" (
    "ID" SERIAL NOT NULL,
    "Assunto" TEXT NOT NULL,
    "Conteudo" TEXT NOT NULL,
    "AulaID" INTEGER NOT NULL,

    CONSTRAINT "Texto_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Video" (
    "ID" SERIAL NOT NULL,
    "Assunto" TEXT NOT NULL,
    "Conteudo" TEXT NOT NULL,
    "AulaID" INTEGER NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Audio" (
    "ID" SERIAL NOT NULL,
    "Assunto" TEXT NOT NULL,
    "Conteudo" TEXT NOT NULL,
    "AulaID" INTEGER NOT NULL,

    CONSTRAINT "Audio_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Texto_AulaID_key" ON "Texto"("AulaID");

-- CreateIndex
CREATE UNIQUE INDEX "Video_AulaID_key" ON "Video"("AulaID");

-- CreateIndex
CREATE UNIQUE INDEX "Audio_AulaID_key" ON "Audio"("AulaID");

-- AddForeignKey
ALTER TABLE "Aula" ADD CONSTRAINT "Aula_CursoID_fkey" FOREIGN KEY ("CursoID") REFERENCES "Curso"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Texto" ADD CONSTRAINT "Texto_AulaID_fkey" FOREIGN KEY ("AulaID") REFERENCES "Aula"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_AulaID_fkey" FOREIGN KEY ("AulaID") REFERENCES "Aula"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Audio" ADD CONSTRAINT "Audio_AulaID_fkey" FOREIGN KEY ("AulaID") REFERENCES "Aula"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
