-- CreateTable
CREATE TABLE "investment_portfolios" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "virtualBalance" DOUBLE PRECISION NOT NULL DEFAULT 10000.0,
    "portfolioValue" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "totalReturns" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "returnsPercent" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "investment_portfolios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "investment_portfolios_userId_key" ON "investment_portfolios"("userId");

-- CreateIndex
CREATE INDEX "investment_portfolios_userId_idx" ON "investment_portfolios"("userId");

-- AddForeignKey
ALTER TABLE "investment_portfolios" ADD CONSTRAINT "investment_portfolios_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
