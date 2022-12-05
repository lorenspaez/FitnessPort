-- DropIndex
DROP INDEX "customers_email_key";

-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "birthday" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "nationality" DROP NOT NULL;

-- AlterTable
ALTER TABLE "pagos" ALTER COLUMN "montoPagado" DROP NOT NULL,
ALTER COLUMN "medioPago" DROP NOT NULL,
ALTER COLUMN "descuentoEmpresa" DROP NOT NULL,
ALTER COLUMN "vencimientoPago" DROP NOT NULL;
