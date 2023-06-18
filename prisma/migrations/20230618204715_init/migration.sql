-- CreateTable
CREATE TABLE "Usuario" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "CPF" TEXT NOT NULL,
    "Nome" TEXT NOT NULL,
    "Username" TEXT NOT NULL,
    "Senha" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Celular" TEXT NOT NULL,
    "Assinatura" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Curso" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "Nome" TEXT NOT NULL,
    "Tipo" TEXT NOT NULL,
    "UserN" TEXT NOT NULL,
    "Publicado" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Curso_UserN_fkey" FOREIGN KEY ("UserN") REFERENCES "Usuario" ("Username") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CursoNaTrilha" (
    "TrilhaID" TEXT NOT NULL,
    "CursoID" TEXT NOT NULL,

    PRIMARY KEY ("CursoID", "TrilhaID"),
    CONSTRAINT "CursoNaTrilha_TrilhaID_fkey" FOREIGN KEY ("TrilhaID") REFERENCES "Trilha" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CursoNaTrilha_CursoID_fkey" FOREIGN KEY ("CursoID") REFERENCES "Curso" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Trilha" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "Nome" TEXT NOT NULL,
    "Publicado" BOOLEAN NOT NULL DEFAULT false,
    "UserN" TEXT NOT NULL,
    CONSTRAINT "Trilha_UserN_fkey" FOREIGN KEY ("UserN") REFERENCES "Usuario" ("Username") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Aula" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "Nome" TEXT NOT NULL,
    "CursoID" TEXT NOT NULL,
    "Tags" TEXT NOT NULL,
    "Publicado" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Aula_CursoID_fkey" FOREIGN KEY ("CursoID") REFERENCES "Curso" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Texto" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "Assunto" TEXT NOT NULL,
    "Conteudo" TEXT NOT NULL,
    "AulaID" TEXT NOT NULL,
    CONSTRAINT "Texto_AulaID_fkey" FOREIGN KEY ("AulaID") REFERENCES "Aula" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Video" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "Assunto" TEXT NOT NULL,
    "Conteudo" TEXT NOT NULL,
    "AulaID" TEXT NOT NULL,
    CONSTRAINT "Video_AulaID_fkey" FOREIGN KEY ("AulaID") REFERENCES "Aula" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Audio" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "Assunto" TEXT NOT NULL,
    "Conteudo" TEXT NOT NULL,
    "AulaID" TEXT NOT NULL,
    CONSTRAINT "Audio_AulaID_fkey" FOREIGN KEY ("AulaID") REFERENCES "Aula" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
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
