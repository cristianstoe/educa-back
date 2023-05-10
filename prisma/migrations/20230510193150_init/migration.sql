/*
  Warnings:

  - A unique constraint covering the columns `[Nome]` on the table `Aula` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Aula_Nome_key" ON "Aula"("Nome");
