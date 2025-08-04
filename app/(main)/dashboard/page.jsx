import { getUserAccounts } from "@/actions/dashboard";
import { getDashboardData } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import { AccountCard } from "./_components/account-card";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { BudgetProgress } from "./_components/budget-progress";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { DashboardOverview } from "./_components/transaction-overview";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";


  
export default async function DashboardPage() {
  const [accounts, transactions] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
  ]);

  const defaultAccount = accounts?.find((account) => account.isDefault);

  // Get budget for default account
  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  return (
    <div className="min-h-screen p-5 bg-gradient-to-br from-orange-200 via-green-200 to-green-100 dark:from-gray-950 dark:via-blue-950/50 dark:to-indigo-950/30 pt-5">
      {/* Hero Section with Welcome Message */}
      
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-800 dark:via-purple-800 dark:to-indigo-800 text-white mb-8 rounded-md">
        <div className="absolute inset-0 bg-black/10 "></div>
        <div className=" px-6 py-12 flex items-center justify-between  border-2 border-blue-600 rounded-md overflow-hidden">
          <div className="max-w-7xl z-10  ">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Financial Dashboard
            </h1>
            <p className="text-blue-100 text-lg opacity-90">
              Manage your finances with style and precision
            </p>
          </div>
          <div className="fixed top-20 right-8 text-white px-3 py-2 rounded shadow z-50 hover:bg-blue-200">
              <Link href="/transaction/create">
                            <Button className="flex items-center gap-2">
                              <PenBox size={18} />
                              <span className="hidden md:inline">Add Transaction</span>
                            </Button>
                  </Link>
          </div>          
        </div>
        {/* <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-full translate-y-32 -translate-x-32"></div> */}
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-8 pb-8">
        {/* Budget Progress */}
        <div className="transform hover:scale-[1.01] transition-transform duration-200">
          <BudgetProgress
            initialBudget={budgetData?.budget}
            currentExpenses={budgetData?.currentExpenses || 0}
          />
        </div>

        {/* Dashboard Overview */}
        <div className="transform hover:scale-[1.005] transition-transform duration-200">
          <DashboardOverview
            accounts={accounts}
            transactions={transactions || []}
          />
        </div>

        {/* Accounts Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Your Accounts
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Manage and monitor all your financial accounts
              </p>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <CreateAccountDrawer>
              <Card className="group hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-8 pb-8">
                  <div className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Plus className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Add New Account
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    Create a new financial account
                  </p>
                </CardContent>
              </Card>
            </CreateAccountDrawer>
            {accounts.length > 0 &&
              accounts?.map((account) => (
                <div key={account.id} className="transform hover:scale-[1.02] transition-transform duration-200">
                  <AccountCard account={account} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
