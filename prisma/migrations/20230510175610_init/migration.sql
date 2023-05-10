-- AlterTable
ALTER TABLE "Audio" ADD COLUMN     "Publicado" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Aula" ADD COLUMN     "Publicado" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Curso" ADD COLUMN     "Publicado" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Texto" ADD COLUMN     "Publicado" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Trilha" ADD COLUMN     "Publicado" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "Publicado" BOOLEAN NOT NULL DEFAULT false;
