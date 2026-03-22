"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PropertyMetricsFields() {

  const [propertyType, setPropertyType] = useState("");
  const [floorArea, setFloorArea] = useState("");
  const [hours, setHours] = useState("");
  const [workers, setWorkers] = useState("");

  const handleSubmit = async () => {

    const { error } = await supabase.from("properties").insert([
      {
        property_type: propertyType,
        gross_floor_area: parseInt(floorArea),
        weekly_operating_hours: parseInt(hours),
        number_of_workers: parseInt(workers)
      }
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Property saved!");
  };

  return (
    <div className="border border-dashed border-gray-400 w-full flex flex-col items-center justify-center text-gray-500 text-center p-6 rounded-xl">

      <p className="font-bold mb-4 text-black">Property Metrics Fields</p>

      <div className="w-full max-w-md">

        <input
          type="text"
          placeholder="Property Type"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="number"
          placeholder="Gross Floor Area"
          value={floorArea}
          onChange={(e) => setFloorArea(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="number"
          placeholder="Weekly Operating Hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="number"
          placeholder="Number of Workers"
          value={workers}
          onChange={(e) => setWorkers(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-700 text-white py-2 rounded mt-3"
        >
          Save Property
        </button>

      </div>

    </div>
  );
}