-- CreateTable
CREATE TABLE "Usuario" (
    "ID" SERIAL NOT NULL,
    "CPF" TEXT NOT NULL,
    "Nome" TEXT NOT NULL,
    "Username" TEXT NOT NULL,
    "Senha" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Celular" TEXT NOT NULL,
    "Assinatura" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Curso" (
    "ID" SERIAL NOT NULL,
    "Nome" TEXT NOT NULL,
    "Tipo" TEXT NOT NULL,
    "UserN" TEXT NOT NULL,
    "Publicado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "CursoNaTrilha" (
    "TrilhaID" INTEGER NOT NULL,
    "CursoID" INTEGER NOT NULL,

    CONSTRAINT "CursoNaTrilha_pkey" PRIMARY KEY ("CursoID","TrilhaID")
);

-- CreateTable
CREATE TABLE "Trilha" (
    "ID" SERIAL NOT NULL,
    "Nome" TEXT NOT NULL,
    "Publicado" BOOLEAN NOT NULL DEFAULT false,
    "UserN" TEXT NOT NULL,

    CONSTRAINT "Trilha_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Aula" (
    "ID" SERIAL NOT NULL,
    "Nome" TEXT NOT NULL,
    "CursoID" INTEGER,
    "Publicado" BOOLEAN NOT NULL DEFAULT false,
    "Texto" TEXT NOT NULL,
    "Video" TEXT NOT NULL,
    "Audio" TEXT NOT NULL,
    "Tags" TEXT NOT NULL,

    CONSTRAINT "Aula_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_CPF_key" ON "Usuario"("CPF");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_Username_key" ON "Usuario"("Username");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_Email_key" ON "Usuario"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_Celular_key" ON "Usuario"("Celular");

-- AddForeignKey
ALTER TABLE "Curso" ADD CONSTRAINT "Curso_UserN_fkey" FOREIGN KEY ("UserN") REFERENCES "Usuario"("Username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CursoNaTrilha" ADD CONSTRAINT "CursoNaTrilha_TrilhaID_fkey" FOREIGN KEY ("TrilhaID") REFERENCES "Trilha"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CursoNaTrilha" ADD CONSTRAINT "CursoNaTrilha_CursoID_fkey" FOREIGN KEY ("CursoID") REFERENCES "Curso"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trilha" ADD CONSTRAINT "Trilha_UserN_fkey" FOREIGN KEY ("UserN") REFERENCES "Usuario"("Username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aula" ADD CONSTRAINT "Aula_CursoID_fkey" FOREIGN KEY ("CursoID") REFERENCES "Curso"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
