// import DashboardPage from "./page";
import { Suspense } from "react";
import { LoadingScreen } from "@/components/loading-screen";
import LearningPage from "./page";
export default function Layout() {
  return (
    <div className="bg-gradient-to-br from-slate-200 to-blue-300 dark:from-gray-900 dark:to-blue-900/20">
     
      <Suspense fallback={<LoadingScreen />}>
        <LearningPage />
      </Suspense>
    </div>
  );
}
