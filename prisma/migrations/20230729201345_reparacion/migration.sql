-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_id_fkey";

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
