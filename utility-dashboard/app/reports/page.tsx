import DashboardHeader from "@/components/DashboardHeader";
import HistoricalEntriesTable from "@/components/HistoricalEntriesTable";
import { supabase } from "@/lib/supabase";

export default async function ReportsPage() {
  const { data: meterEntries, error } = await supabase
    .from("meters")
    .select("*");

  if (error) {
    console.error("Error fetching meter entries:", error.message);
  }

  const safeEntries = meterEntries ?? [];

  return (
    <main className="min-h-screen bg-[#efefef]">
      <DashboardHeader />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="space-y-6">
          
          {/* Performance Trends (placeholder stays for now) */}
          <div className="rounded-[24px] border border-gray-300 bg-white p-4 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-black">
              Performance Trends
            </h2>
            <div className="flex h-[220px] items-center justify-center rounded-md bg-gray-100 text-gray-500">
              PerformanceChart placeholder
            </div>
          </div>

          {/* YOUR ACTUAL WORK */}
          <HistoricalEntriesTable entries={safeEntries} />

        </div>
      </div>
    </main>
  );
}