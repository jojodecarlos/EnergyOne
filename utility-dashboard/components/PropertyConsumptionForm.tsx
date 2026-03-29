'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// TypeScript interfaces
interface Property {
  id: number;
  name: string;
  image_url?: string;
  meter_id: number;
  user_id: string;
}

interface Reading {
  id: number;
  meter_id: number;
  start_date: string;
  end_date: string;
  usage_amount: number;
  total_cost?: number;
}

export default function PropertyConsumptionForm() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch properties when component mounts
  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching properties:", error);
    } else if (data) {
      setProperties(data);
    }
  }

  // Fetch readings whenever a property is selected
  useEffect(() => {
    if (selectedProperty?.meter_id) {
      fetchMeterReadings(selectedProperty.meter_id);
    } else {
      setReadings([]);
    }
  }, [selectedProperty]);

  async function fetchMeterReadings(meter_id: number) {
    setLoading(true);
    const { data, error } = await supabase
      .from("meter_readings")
      .select("*")
      .eq("meter_id", meter_id)
      .order("start_date", { ascending: false });

    if (error) {
      console.error("Error fetching meter readings:", error);
    } else if (data) {
      setReadings(data);
    }
    setLoading(false);
  }

  return (
    <div className="w-full min-h-[600px] rounded-2xl shadow p-8 flex flex-col items-center justify-start bg-white space-y-6">
      
      {/* Property Dropdown */}
      <select 
        className="w-[250px] h-[50px] border rounded-full bg-[#002A84] text-white text-center font-inter font-semibold shadow-md"
        value={selectedProperty?.id || ""}
        onChange={(e) => {
          const property = properties.find(p => p.id === parseInt(e.target.value));
          setSelectedProperty(property || null);
        }}
      >
        <option value="">Choose Property</option>
        {properties.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      {/* Property Image */}
      <div className="w-[250px] h-[250px] bg-gray-200 rounded-xl flex items-center justify-center border border-black text-black font-inter">
        {selectedProperty?.image_url ? (
          <Image 
            src={selectedProperty.image_url}
            alt={selectedProperty?.name || "Property Image"}
            width={200}
            height={200}
            className="rounded-lg"
          />
        ) : "Property Image"}
      </div>

      {/* Table heading */}
      <h3 className="font-semibold font-inter text-center text-black">Input Consumption</h3>

      {/* Labeled Rows */}
      <div className="w-full max-w-2xl space-y-3">
        {loading && <p className="text-center">Loading...</p>}

        {!loading && readings.length === 0 && (
          <p className="text-center text-gray-500">No readings found</p>
        )}

        {!loading && readings.length > 0 && (
          readings.filter(r => r.meter_id === selectedProperty?.meter_id).map((r) => (
            <div
              key={r.id}
              className="p-4 rounded shadow  space-y-1"
            >
              <div className="flex justify-between">
                <span className="font-semibold font-inter text-black">Meter Number:</span>
                <span className="font-inter bg-[#D9D9D9] w-[180px] h-[40px] text-center text-black">{r.meter_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold font-inter text-black">Start Date</span>
                <span className="font-inter bg-[#D9D9D9] w-[180px] h-[40px] text-center text-black">{r.start_date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold font-inter text-black">End Date</span>
                <span className="font-inter bg-[#D9D9D9] w-[180px] h-[40px] text-center text-black">{r.end_date}</span>
              </div>

              <div className="flex mt-3 mb-2">
                <span className="font-semibold font-inter text-black">Usage (kWh, therms, gallons)</span>
              </div>
              <div className="w-full font-inter bg-[#D9D9D9] w-[180px] h-[40px] text-center text-black">
                {r.usage_amount}
              </div>
            
              <div className="flex mt-3 mb-2">
                <span className="font-semibold font-inter text-black">Cost ($)</span>
              </div>
              <div className="w-full font-inter bg-[#D9D9D9] w-[180px] h-[40px] text-center text-black">
                {r.total_cost ?? "-"}
              </div>
              
            </div>
          ))
        )}
      </div>
    </div>
  );
}