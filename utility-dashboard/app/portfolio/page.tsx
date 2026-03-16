import DashboardHeader from '@/components/DashboardHeader';
import OverallPortfolioScore from '@/components/OverallPortfolioScore';
import BulkImportCard from '@/components/BulkImportCard';
import PropertyListItem from '@/components/PropertyListItem';
import AddPropertyButton from '@/components/AddPropertyButton';
import { supabase } from '@/lib/supabase';

export default async function PortfolioPage() {
  
  const { data: properties, error } = await supabase
    .from('properties')
    .select('*');

  if (error) {
    console.error("Error fetching properties:", error.message);
  }

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <DashboardHeader />

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-7xl mx-auto p-8">
        
        {/* CSS Grid: 1 column on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN (1/3 width) */}
          <div className="col-span-1 flex flex-col gap-8">
            <OverallPortfolioScore />
            <BulkImportCard />
          </div>

          {/* RIGHT COLUMN (2/3 width) - Property List Container */}
          <div className="col-span-2 bg-gray-50 rounded-2xl p-6 flex flex-col gap-4 border border-gray-100 shadow-sm">
            
            {/* Scrollable Container just for the pills */}
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
              
              {properties && properties.length > 0 ? (
                properties.map((property) => (
                  <PropertyListItem key={property.id} propertyData={property} />
                ))
              ) : (
                <div className="flex items-center justify-center h-24 text-gray-500">
                  Add a property to see its score
                </div>
              )}

            </div>
            
            {/* The button stays pinned safely outside the scrolling area */}
            <div className="pt-2">
              <AddPropertyButton />
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}