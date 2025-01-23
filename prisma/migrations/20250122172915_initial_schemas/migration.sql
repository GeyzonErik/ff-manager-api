-- CreateEnum
CREATE TYPE "environment_type" AS ENUM ('PRO', 'DEV', 'TEST');

-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feature" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "enable" BOOLEAN NOT NULL DEFAULT false,
    "projectId" TEXT NOT NULL,
    "environment" "environment_type" NOT NULL,

    CONSTRAINT "feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api_keys" (
    "projectId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "api_keys_pkey" PRIMARY KEY ("projectId")
);

-- CreateIndex
CREATE UNIQUE INDEX "feature_projectId_name_key" ON "feature"("projectId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "api_keys_projectId_key_key" ON "api_keys"("projectId", "key");

-- AddForeignKey
ALTER TABLE "feature" ADD CONSTRAINT "feature_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
