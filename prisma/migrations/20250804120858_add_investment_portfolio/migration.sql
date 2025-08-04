/*
  Warnings:

  - You are about to drop the `investment_portfolios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `investment_transactions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `portfolio_positions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "investment_portfolios" DROP CONSTRAINT "investment_portfolios_userId_fkey";

-- DropForeignKey
ALTER TABLE "investment_transactions" DROP CONSTRAINT "investment_transactions_portfolioId_fkey";

-- DropForeignKey
ALTER TABLE "portfolio_positions" DROP CONSTRAINT "portfolio_positions_portfolioId_fkey";

-- DropTable
DROP TABLE "investment_portfolios";

-- DropTable
DROP TABLE "investment_transactions";

-- DropTable
DROP TABLE "portfolio_positions";
