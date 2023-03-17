/*
  Warnings:

  - A unique constraint covering the columns `[userName]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ingresos" ADD COLUMN     "adminId" INTEGER,
ADD COLUMN     "adminName" TEXT;

-- AlterTable
ALTER TABLE "pagos" ADD COLUMN     "adminId" INTEGER,
ADD COLUMN     "adminName" TEXT;

-- AlterTable
ALTER TABLE "sheets" ADD COLUMN     "adminId" INTEGER,
ADD COLUMN     "adminName" TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "userName" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "users_userName_key" ON "users"("userName");

-- AddForeignKey
ALTER TABLE "ingresos" ADD CONSTRAINT "ingresos_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sheets" ADD CONSTRAINT "sheets_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagos" ADD CONSTRAINT "pagos_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
