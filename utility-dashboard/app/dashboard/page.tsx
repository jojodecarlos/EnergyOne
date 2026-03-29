import DashboardHeader from "@/components/DashboardHeader";
import WelcomeBanner from "@/components/WelcomeBanner";
import HistoricalTrends from "@/components/HistoricalTrends";
import OverallPortfolioScore from "@/components/OverallPortfolioScore";
import Recommendations from "@/components/Recommendations";
import PerformanceComparison from "@/components/PerformanceComparison";
import { supabase } from "@/lib/supabase";

export default async function DashboardPage() {
  const { data: properties, error } = await supabase
    .from("properties")
    .select("*");

  if (error) {
    console.error("Error fetching properties:", error.message);
  }

  const safeProperties = properties ?? [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader />

      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <WelcomeBanner />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <HistoricalTrends />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <OverallPortfolioScore properties={safeProperties} />
              <Recommendations />
            </div>
          </div>

          <div className="lg:col-span-1">
            <PerformanceComparison />
          </div>
        </div>
      </main>
    </div>
  );
}