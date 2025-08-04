/*
  Warnings:

  - You are about to alter the column `virtualBalance` on the `investment_portfolios` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `portfolioValue` on the `investment_portfolios` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `totalReturns` on the `investment_portfolios` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `returnsPercent` on the `investment_portfolios` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "investment_portfolios" ALTER COLUMN "virtualBalance" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "portfolioValue" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "totalReturns" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "returnsPercent" SET DATA TYPE DECIMAL(65,30);

-- CreateTable
CREATE TABLE "portfolio_positions" (
    "id" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "shares" DECIMAL(65,30) NOT NULL,
    "buyPrice" DECIMAL(65,30) NOT NULL,
    "currentValue" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "portfolio_positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investment_transactions" (
    "id" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "shares" DECIMAL(65,30) NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "investment_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "portfolio_positions_portfolioId_idx" ON "portfolio_positions"("portfolioId");

-- CreateIndex
CREATE UNIQUE INDEX "portfolio_positions_portfolioId_symbol_key" ON "portfolio_positions"("portfolioId", "symbol");

-- CreateIndex
CREATE INDEX "investment_transactions_portfolioId_idx" ON "investment_transactions"("portfolioId");

-- CreateIndex
CREATE INDEX "investment_transactions_symbol_idx" ON "investment_transactions"("symbol");

-- AddForeignKey
ALTER TABLE "portfolio_positions" ADD CONSTRAINT "portfolio_positions_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "investment_portfolios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investment_transactions" ADD CONSTRAINT "investment_transactions_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "investment_portfolios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
