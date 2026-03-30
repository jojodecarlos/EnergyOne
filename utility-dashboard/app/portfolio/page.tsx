"use client";

import { useState, useEffect } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import OverallPortfolioScore from "@/components/OverallPortfolioScore";
import BulkImportCard from "@/components/BulkImportCard";
import PropertyListItem from "@/components/PropertyListItem";
import AddPropertyButton from "@/components/AddPropertyButton";
import { supabase } from "@/lib/supabase";

export default function PortfolioPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      // 1. Get the active user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      // 2. Fetch all properties owned by this user
      const { data: propsData, error: propsError } = await supabase
        .from("properties")
        .select("*")
        .eq("user_id", user.id);

      if (propsError || !propsData) {
        console.error("Error fetching properties:", propsError?.message);
        setLoading(false);
        return;
      }

      // 3. Fetch all performance scores for this user
      const { data: scoresData } = await supabase
        .from("performance_scores")
        .select("property_id, energy_star_score")
        .eq("user_id", user.id);

      // 4. Combine them so the list item has both the name and the score!
      const combinedProperties = propsData.map((prop) => {
        const matchingScore = scoresData?.find(
          (score) => score.property_id === prop.id
        );

        return {
          ...prop,
          // Fallback to address since your DB uses property_address
          displayName: prop.property_address || prop.primary_use_type || "Unnamed Property",
          score: matchingScore ? matchingScore.energy_star_score : null,
        };
      });

      setProperties(combinedProperties);
      setLoading(false);
    };

    fetchPortfolio();
  }, []);

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <DashboardHeader />

      <div className="flex-1 w-full max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1 flex flex-col gap-8">
            {/* Notice we removed the properties prop here because we updated this component in the last step to fetch its own data! */}
            <OverallPortfolioScore />
            <BulkImportCard />
          </div>

          <div className="col-span-2 bg-gray-50 rounded-2xl p-6 flex flex-col gap-4 border border-gray-100 shadow-sm">
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
              {loading ? (
                <div className="flex items-center justify-center h-24 text-gray-500">
                  Loading your portfolio...
                </div>
              ) : properties.length > 0 ? (
                properties.map((property) => (
                  <PropertyListItem
                    key={property.id}
                    id={property.id}
                    propertyName={property.displayName}
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