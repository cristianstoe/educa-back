/*
  Warnings:

  - The primary key for the `Audio` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Aula` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Curso` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CursoNaTrilha` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Texto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Trilha` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Video` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Audio" DROP CONSTRAINT "Audio_AulaID_fkey";

-- DropForeignKey
ALTER TABLE "Aula" DROP CONSTRAINT "Aula_CursoID_fkey";

-- DropForeignKey
ALTER TABLE "CursoNaTrilha" DROP CONSTRAINT "CursoNaTrilha_CursoID_fkey";

-- DropForeignKey
ALTER TABLE "CursoNaTrilha" DROP CONSTRAINT "CursoNaTrilha_TrilhaID_fkey";

-- DropForeignKey
ALTER TABLE "Texto" DROP CONSTRAINT "Texto_AulaID_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_AulaID_fkey";

-- AlterTable
ALTER TABLE "Audio" DROP CONSTRAINT "Audio_pkey",
ALTER COLUMN "ID" DROP DEFAULT,
ALTER COLUMN "ID" SET DATA TYPE TEXT,
ALTER COLUMN "AulaID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Audio_pkey" PRIMARY KEY ("ID");
DROP SEQUENCE "Audio_ID_seq";

-- AlterTable
ALTER TABLE "Aula" DROP CONSTRAINT "Aula_pkey",
ALTER COLUMN "ID" DROP DEFAULT,
ALTER COLUMN "ID" SET DATA TYPE TEXT,
ALTER COLUMN "CursoID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Aula_pkey" PRIMARY KEY ("ID");
DROP SEQUENCE "Aula_ID_seq";

-- AlterTable
ALTER TABLE "Curso" DROP CONSTRAINT "Curso_pkey",
ALTER COLUMN "ID" DROP DEFAULT,
ALTER COLUMN "ID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Curso_pkey" PRIMARY KEY ("ID");
DROP SEQUENCE "Curso_ID_seq";

-- AlterTable
ALTER TABLE "CursoNaTrilha" DROP CONSTRAINT "CursoNaTrilha_pkey",
ALTER COLUMN "TrilhaID" SET DATA TYPE TEXT,
ALTER COLUMN "CursoID" SET DATA TYPE TEXT,
ADD CONSTRAINT "CursoNaTrilha_pkey" PRIMARY KEY ("CursoID", "TrilhaID");

-- AlterTable
ALTER TABLE "Texto" DROP CONSTRAINT "Texto_pkey",
ALTER COLUMN "ID" DROP DEFAULT,
ALTER COLUMN "ID" SET DATA TYPE TEXT,
ALTER COLUMN "AulaID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Texto_pkey" PRIMARY KEY ("ID");
DROP SEQUENCE "Texto_ID_seq";

-- AlterTable
ALTER TABLE "Trilha" DROP CONSTRAINT "Trilha_pkey",
ALTER COLUMN "ID" DROP DEFAULT,
ALTER COLUMN "ID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Trilha_pkey" PRIMARY KEY ("ID");
DROP SEQUENCE "Trilha_ID_seq";

-- AlterTable
ALTER TABLE "Video" DROP CONSTRAINT "Video_pkey",
ALTER COLUMN "ID" DROP DEFAULT,
ALTER COLUMN "ID" SET DATA TYPE TEXT,
ALTER COLUMN "AulaID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Video_pkey" PRIMARY KEY ("ID");
DROP SEQUENCE "Video_ID_seq";

-- AddForeignKey
ALTER TABLE "CursoNaTrilha" ADD CONSTRAINT "CursoNaTrilha_TrilhaID_fkey" FOREIGN KEY ("TrilhaID") REFERENCES "Trilha"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CursoNaTrilha" ADD CONSTRAINT "CursoNaTrilha_CursoID_fkey" FOREIGN KEY ("CursoID") REFERENCES "Curso"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aula" ADD CONSTRAINT "Aula_CursoID_fkey" FOREIGN KEY ("CursoID") REFERENCES "Curso"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Texto" ADD CONSTRAINT "Texto_AulaID_fkey" FOREIGN KEY ("AulaID") REFERENCES "Aula"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_AulaID_fkey" FOREIGN KEY ("AulaID") REFERENCES "Aula"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Audio" ADD CONSTRAINT "Audio_AulaID_fkey" FOREIGN KEY ("AulaID") REFERENCES "Aula"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
