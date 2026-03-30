"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardHeader from '@/components/DashboardHeader';
import PropertySelector, { PropertyData } from '@/components/PropertySelector';
import PropertyAddressFields from '@/components/PropertyAddressFields';
import PropertyActionButtons from '@/components/PropertyActionButtons';
import PropertyMetricsFields from '@/components/PropertyMetricsFields';
import MeterTypeCheckboxes from '@/components/MeterTypeCheckboxes';
import PropertyImageUploader from '@/components/PropertyImageUploader';
import { supabase } from '@/lib/supabase';

function ManagePropertyContent() {
  const searchParams = useSearchParams();
  const urlId = searchParams.get('id'); 

  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error("Error fetching properties:", error.message);
      } else if (data) {
        const formattedProperties: any[] = data.map((prop) => ({
          id: prop.id.toString(),
          name: prop.property_address || prop.primary_use_type || "Unnamed Property", 
          address: prop.property_address || "",
          propertyType: prop.primary_use_type || "", 
          buildingSize: prop.building_size_sqft || "",
        }));
        
        setProperties(formattedProperties);
        
        if (urlId) {
          setSelectedPropertyId(urlId);
        }
      }
      setIsLoading(false);
    }

    fetchProperties();
  }, [urlId]); 

  const activeProperty = properties.find(p => p.id === selectedPropertyId) || null;

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto p-8">
      {isLoading ? (
        <div className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center">
          <p className="text-gray-500 font-medium">Loading your portfolio...</p>
        </div>
      ) : (
        <PropertySelector 
          properties={properties} 
          selectedId={selectedPropertyId}
          onSelect={setSelectedPropertyId} 
        />
      )}

      <div className="border border-gray-400 rounded-3xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="flex flex-col gap-4">
             <PropertyAddressFields 
               propertyData={activeProperty} 
               onChange={() => {}} 
             />            
          </div>

          <div className="flex flex-col gap-4">
             <PropertyMetricsFields propertyData={activeProperty} />
             <MeterTypeCheckboxes />
          </div>

          <div className="flex flex-col gap-4 h-full">
             <PropertyActionButtons />
             <PropertyImageUploader onFileSelect={() => {}} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default function ManagePropertyPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <DashboardHeader />
      <Suspense fallback={<div className="p-8">Loading...</div>}>
        <ManagePropertyContent />
      </Suspense>
    </main>
  );
}