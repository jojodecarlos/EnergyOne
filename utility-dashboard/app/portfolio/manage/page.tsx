"use client";

import { useState, useEffect } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import PropertySelector, { PropertyData } from '@/components/PropertySelector';
import PropertyAddressFields from '@/components/PropertyAddressFields';
import PropertyActionButtons from '@/components/PropertyActionButtons';
import PropertyMetricsFields from '@/components/PropertyMetricsFields';
import MeterTypeCheckboxes from '@/components/MeterTypeCheckboxes';
import PropertyImageUploader from '@/components/PropertyImageUploader';
import { supabase } from '@/lib/supabase'; // Connecting to your real database

export default function ManagePropertyPage() {
  // 1. Component State
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Tracks if Supabase is still loading

  // 2. The Database Fetch
  useEffect(() => {
    async function fetchProperties() {
      // Fetching without the .order() clause to prevent the "column does not exist" crash
      const { data, error } = await supabase
        .from('properties')
        .select('*');

      if (error) {
        console.error("Error fetching properties:", error.message);
      } else if (data) {
        // We map the database data to match the exact format our frontend expects
        const formattedProperties: PropertyData[] = data.map((prop) => ({
          id: prop.id.toString(),
          // Updated to check for property_name to match your database structure
          name: prop.property_name || prop.name || "Unnamed Property", 
          address: prop.address || "",
          city: prop.city || "",
          state: prop.state || "",
          zip: prop.zip || "",
          propertyType: prop.property_type || prop.propertyType || "Commercial", 
        }));
        
        setProperties(formattedProperties);
      }
      setIsLoading(false);
    }

    fetchProperties();
  }, []); // The empty array ensures this only runs once when the page loads

  // 3. Find the active property based on the dropdown selection
  const activeProperty = properties.find(p => p.id === selectedPropertyId) || null;

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <DashboardHeader />

      <div className="flex-1 w-full max-w-7xl mx-auto p-8">
        
        {/* If Supabase is loading, show a brief loading state. Otherwise, show the dropdown. */}
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
            
            {/* COLUMN 1: Address Info */}
            <div className="flex flex-col gap-4">
               <PropertyAddressFields 
                 propertyData={activeProperty} 
                 onChange={() => {}} 
               />            
            </div>

            {/* COLUMN 2: Metrics */}
            <div className="flex flex-col gap-4">
               <PropertyMetricsFields propertyData={activeProperty} />
               <MeterTypeCheckboxes />
            </div>

            {/* COLUMN 3: Actions & Image */}
            <div className="flex flex-col gap-4 h-full">
               <PropertyActionButtons />
               <PropertyImageUploader onFileSelect={() => {}} />
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}