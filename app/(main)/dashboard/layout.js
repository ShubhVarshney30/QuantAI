import DashboardPage from "./page";
import { Suspense } from "react";
import { LoadingScreen } from "@/components/loading-screen";
export default function Layout() {
  return (
    <div className="bg-gradient-to-br from-orange-200 to-blue-300 dark:from-gray-900 dark:to-blue-900/20">
     
      <Suspense fallback={<LoadingScreen />}>
        <DashboardPage />
      </Suspense>
    </div>
  );
}
