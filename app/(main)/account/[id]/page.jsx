import { Suspense } from "react";
import { getAccountWithTransactions } from "@/actions/account";
import { BarLoader } from "react-spinners";
import { TransactionTable } from "../_components/transaction-table";
import { notFound } from "next/navigation";
import { AccountChart } from "../_components/account-chart";
import { Card, CardContent } from "@/components/ui/card";

export default async function AccountPage({ params }) {
  const accountData = await getAccountWithTransactions(params.id);

  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;
  const accountType = account.type.charAt(0) + account.type.slice(1).toLowerCase();

  return (
    <div className="space-y-6">
      {/* Account Header */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0.5))]" />
        <div className="relative z-10">
          <div className="flex flex-col space-y-1 mb-6">
            <span className="text-sm font-medium text-indigo-100">Account Balance</span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              ${parseFloat(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </h1>
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">{account.name}</h2>
              <p className="text-indigo-100">{accountType} Account</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <p className="text-sm text-indigo-100">Total Transactions</p>
              <p className="text-xl font-semibold">{account._count.transactions}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <Suspense
        fallback={
          <Card className="overflow-hidden px-5">
            <CardContent className="p-6">
              <div className="h-[400px] flex items-center justify-center">
                <BarLoader width="95%" color="#6366f1" />
              </div>
            </CardContent>
          </Card>
        }
      >
        <AccountChart transactions={transactions} />
      </Suspense>

      {/* Transactions Section */}
      <div className="space-y-4 px-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold ">Transaction History</h2>
          <span className="text-sm text-muted-foreground">
            Showing {transactions.length} transactions
          </span>
        </div>
        <Suspense
          fallback={
            <div className="h-[400px] flex items-center justify-center rounded-lg border border-dashed">
              <BarLoader width="50%" color="#6366f1" />
            </div>
          }
        >
          <TransactionTable transactions={transactions} />
        </Suspense>
      </div>
    </div>
  );
}
