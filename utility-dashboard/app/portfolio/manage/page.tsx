import DashboardHeader from '@/components/DashboardHeader';
import PropertyAddressFields from '@/components/PropertyAddressFields';
import PropertyActionButtons from '@/components/PropertyActionButtons';
import PropertyMetricsFields from '@/components/PropertyMetricsFields';
import MeterTypeCheckboxes from '@/components/MeterTypeCheckboxes';
import PropertyImageUploader from '@/components/PropertyImageUploader';

export default function ManagePropertyPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <DashboardHeader />

      <div className="flex-1 w-full max-w-7xl mx-auto p-8">
        
        {/* The large outer border from the wireframe */}
        <div className="border border-gray-400 rounded-3xl p-8">
          
          {/* 3-Column Grid for the form elements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* COLUMN 1: Address Info */}
            <div className="flex flex-col gap-4">
               <PropertyAddressFields />
            </div>

            {/* COLUMN 2: Metrics & Actions */}
            <div className="flex flex-col gap-4">
               <PropertyActionButtons />
               <PropertyMetricsFields />
               <MeterTypeCheckboxes />
            </div>

            {/* COLUMN 3: Save/Delete & Image */}
            <div className="flex flex-col gap-4 h-full">
               <PropertyActionButtons />
               <PropertyImageUploader />
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}