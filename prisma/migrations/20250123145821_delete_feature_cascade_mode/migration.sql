-- DropForeignKey
ALTER TABLE "feature" DROP CONSTRAINT "feature_projectId_fkey";

-- AddForeignKey
ALTER TABLE "feature" ADD CONSTRAINT "feature_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
