-- CreateTable
CREATE TABLE "Usuario" (
    "ID" SERIAL NOT NULL,
    "CPF" INTEGER NOT NULL,
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
    "UserN" TEXT NOT NULL,

    CONSTRAINT "Trilha_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Aula" (
    "ID" SERIAL NOT NULL,
    "Nome" TEXT NOT NULL,
    "CursoID" INTEGER NOT NULL,

    CONSTRAINT "Aula_pkey" PRIMARY KEY ("ID")
);

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
CREATE UNIQUE INDEX "Usuario_CPF_key" ON "Usuario"("CPF");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_Username_key" ON "Usuario"("Username");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_Email_key" ON "Usuario"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_Celular_key" ON "Usuario"("Celular");

-- CreateIndex
CREATE UNIQUE INDEX "Texto_AulaID_key" ON "Texto"("AulaID");

-- CreateIndex
CREATE UNIQUE INDEX "Video_AulaID_key" ON "Video"("AulaID");

-- CreateIndex
CREATE UNIQUE INDEX "Audio_AulaID_key" ON "Audio"("AulaID");

-- AddForeignKey
ALTER TABLE "Curso" ADD CONSTRAINT "Curso_UserN_fkey" FOREIGN KEY ("UserN") REFERENCES "Usuario"("Username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CursoNaTrilha" ADD CONSTRAINT "CursoNaTrilha_TrilhaID_fkey" FOREIGN KEY ("TrilhaID") REFERENCES "Trilha"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CursoNaTrilha" ADD CONSTRAINT "CursoNaTrilha_CursoID_fkey" FOREIGN KEY ("CursoID") REFERENCES "Curso"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trilha" ADD CONSTRAINT "Trilha_UserN_fkey" FOREIGN KEY ("UserN") REFERENCES "Usuario"("Username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aula" ADD CONSTRAINT "Aula_CursoID_fkey" FOREIGN KEY ("CursoID") REFERENCES "Curso"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Texto" ADD CONSTRAINT "Texto_AulaID_fkey" FOREIGN KEY ("AulaID") REFERENCES "Aula"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_AulaID_fkey" FOREIGN KEY ("AulaID") REFERENCES "Aula"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Audio" ADD CONSTRAINT "Audio_AulaID_fkey" FOREIGN KEY ("AulaID") REFERENCES "Aula"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
