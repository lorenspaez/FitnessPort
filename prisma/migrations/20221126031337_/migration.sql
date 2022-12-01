/*
  Warnings:

  - You are about to drop the column `paymentDate` on the `customers` table. All the data in the column will be lost.
  - Added the required column `address` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthday` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customers" DROP COLUMN "paymentDate",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "agreement" TEXT,
ADD COLUMN     "birthday" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "nationality" TEXT NOT NULL,
ADD COLUMN     "objective" TEXT,
ADD COLUMN     "observation" TEXT;

-- CreateTable
CREATE TABLE "pagos" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerId" INTEGER,
    "customerRut" TEXT NOT NULL,
    "customerName" TEXT,
    "customerPlan" TEXT,
    "customerAgreement" TEXT,
    "montoPagado" TEXT NOT NULL,
    "medioPago" TEXT NOT NULL,
    "descuentoEmpresa" TEXT NOT NULL,
    "vencimientoPago" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pagos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pagos_customerId_key" ON "pagos"("customerId");

-- AddForeignKey
ALTER TABLE "pagos" ADD CONSTRAINT "pagos_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
