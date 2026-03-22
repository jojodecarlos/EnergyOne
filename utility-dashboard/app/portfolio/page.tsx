import DashboardHeader from "@/components/DashboardHeader";
import OverallPortfolioScore from "@/components/OverallPortfolioScore";
import BulkImportCard from "@/components/BulkImportCard";
import PropertyListItem from "@/components/PropertyListItem";
import AddPropertyButton from "@/components/AddPropertyButton";
import { supabase } from "@/lib/supabase";

export default async function PortfolioPage() {
  const { data: properties, error } = await supabase
    .from("properties")
    .select("*");

  if (error) {
    console.error("Error fetching properties:", error.message);
  }

  const safeProperties = properties ?? [];

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <DashboardHeader />

      <div className="flex-1 w-full max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1 flex flex-col gap-8">
            <OverallPortfolioScore properties={safeProperties} />
            <BulkImportCard />
          </div>

          <div className="col-span-2 bg-gray-50 rounded-2xl p-6 flex flex-col gap-4 border border-gray-100 shadow-sm">
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
              {safeProperties.length > 0 ? (
                safeProperties.map((property) => (
                  <PropertyListItem
                    key={property.id}
                    id={property.id}
                    propertyName={
                      property.property_name ??
                      property.propertyName ??
                      "Unnamed Property"
                    }
                    score={property.score}
                  />
                ))
              ) : (
                <div className="flex items-center justify-center h-24 text-gray-500">
                  Add a property to see its score
                </div>
              )}
            </div>

            <div className="pt-2">
              <AddPropertyButton />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}