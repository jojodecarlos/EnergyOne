import DashboardHeader from '@/components/DashboardHeader';
import PropertyConsumptionForm from '@/components/PropertyConsumptionForm';
import PerformanceChart from '@/components/PerformanceChart';
import HistoricalEntriesTable from '@/components/HistoricalEntriesTable';

export default function ReportsPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* The Global Navigation */}
      <DashboardHeader />

      {/* Main Content Container */}
      <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
        
        {/* Responsive Grid: 1 column on mobile, 12 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Data Entry Form (Takes up 4 out of 12 columns) */}
          <div className="lg:col-span-4 h-full">
             <PropertyConsumptionForm />
          </div>

          {/* RIGHT COLUMN: Charts and Tables (Takes up 8 out of 12 columns) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
             <PerformanceChart />
             <HistoricalEntriesTable />
          </div>

        </div>
      </div>
    </main>
  );
}