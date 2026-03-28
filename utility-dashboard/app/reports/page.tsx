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
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          <div className="rounded-[24px] border border-gray-400 bg-white p-6 shadow-sm">
            <div className="mb-4">
              <button className="w-full rounded-full bg-blue-800 px-4 py-3 text-sm font-semibold text-white">
                Choose Property
              </button>
            </div>

            <div className="mb-6 flex h-[220px] items-center justify-center rounded-[20px] border border-gray-400 bg-gray-200 text-xl font-semibold text-black">
              Property Image
            </div>

            <h2 className="mb-4 text-center text-xl font-bold text-black">
              Input Consumption
            </h2>

            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-sm font-semibold text-black">
                  Billing Info:
                </label>
                <input className="w-full border border-gray-400 px-3 py-2" />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-black">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-400 px-3 py-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-black">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-400 px-3 py-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-black">
                  Usage (kWh, therms, gallons)
                </label>
                <input className="w-full border border-gray-400 px-3 py-2" />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-black">
                  Cost ($)
                </label>
                <input className="w-full border border-gray-400 px-3 py-2" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[24px] border border-gray-300 bg-white p-4 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-black">
                Performance Trends
              </h2>
              <div className="flex h-[220px] items-center justify-center rounded-md bg-gray-100 text-gray-500">
                PerformanceChart placeholder
              </div>
            </div>

            <HistoricalEntriesTable entries={safeEntries} />
          </div>
        </div>
      </div>
    </main>
  );
}