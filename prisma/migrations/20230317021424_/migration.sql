-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "adminId" INTEGER,
ADD COLUMN     "adminName" TEXT;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
