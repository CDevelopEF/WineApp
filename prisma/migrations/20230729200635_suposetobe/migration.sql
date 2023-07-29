-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_roleId_fkey";

-- DropIndex
DROP INDEX "Users_roleId_key";

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_id_fkey" FOREIGN KEY ("id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
