"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function PropertyMetricsFields({ propertyData }: { propertyData?: any }) {
  const [propertyType, setPropertyType] = useState("");
  const [floorArea, setFloorArea] = useState("");
  const [hours, setHours] = useState("");
  const [workers, setWorkers] = useState("");

  useEffect(() => {
    if (propertyData) {
      setPropertyType(propertyData.propertyType || "");
      setFloorArea(propertyData.buildingSize?.toString() || "");
    } else {
      setPropertyType("");
      setFloorArea("");
    }
  }, [propertyData]);

  const handleSubmit = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert("User not logged in");

    // Note: If we want this button to UPDATE an existing property instead of making a new one, 
    // we will need to add an UPSERT function here based on propertyData.id
    const { error } = await supabase.from("properties").insert([
      {
        primary_use_type: propertyType,
        building_size_sqft: parseInt(floorArea) || null,
        user_id: user.id
      }
    ]);

    if (error) {
      alert(error.message);
      return;
    }
    alert("Property saved!");
  };

  return (
    <div className="border border-dashed border-gray-400 w-full flex flex-col items-center justify-center p-6 rounded-xl">
      <p className="font-bold mb-4 text-black">Property Metrics Fields</p>
      <div className="w-full max-w-md">
        
        <input
          type="text"
          placeholder="Property Type"
          value={propertyType} 
          onChange={(e) => setPropertyType(e.target.value)}
          className="w-full border p-2 mb-3 rounded text-black"
        />

        <input
          type="number"
          placeholder="Gross Floor Area"
          value={floorArea} 
          onChange={(e) => setFloorArea(e.target.value)}
          className="w-full border p-2 mb-3 rounded text-black"
        />

        <input
          type="number"
          placeholder="Weekly Operating Hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="w-full border p-2 mb-3 rounded text-black"
        />

        <input
          type="number"
          placeholder="Number of Workers"
          value={workers}
          onChange={(e) => setWorkers(e.target.value)}
          className="w-full border p-2 mb-3 rounded text-black"
        />

        <button onClick={handleSubmit} className="w-full bg-[#002A84] text-white py-2 rounded mt-3">
          Save Property
        </button>
      </div>
    </div>
  );
}