import DashboardHeader from '@/components/DashboardHeader';
import WelcomeBanner from '@/components/WelcomeBanner';
import HistoricalTrends from '@/components/HistoricalTrends';
import PortfolioScore from '@/components/PortfolioScore';
import Recommendations from '@/components/Recommendations';
import PerformanceComparison from '@/components/PerformanceComparison';

export default function DashboardPage() {
  return (
    // light gray background
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* Top Navigation */}
      <DashboardHeader />

      {/* Main Content Area - max-w-7xl keeps it from stretching too wide on giant monitors */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Supabase User Greeting */}
        <WelcomeBanner />

        {/* THE MASTER GRID: 1 col on mobile, 3 cols on desktop */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT SIDE BLOCK (Takes up 2 of the 3 columns) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Top Row: Line Chart spans full width of this left block */}
            <HistoricalTrends />

            {/* Bottom Row: Inner Grid splits the remaining space in half */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PortfolioScore />
              <Recommendations />
            </div>

          </div>

          {/* RIGHT SIDE BLOCK (Takes up 1 of the 3 columns) */}
          <div className="lg:col-span-1">
            {/* This component will naturally stretch down alongside the left block */}
            <PerformanceComparison />
          </div>

        </div>
      </main>
    </div>
  );
}