"use client";

import Papa from "papaparse";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function BulkImportCard() {
  const [data, setData] = useState<any[]>([]);

  const handleFile = async (file: File) => {
    const text = await file.text();

    const cleanedText = text
      .split('\n')
      .map(line => {
        let t = line.trim();
        if (t.startsWith('"') && t.endsWith('"')) {
          const quoteCount = (t.match(/"/g) || []).length;
          if (quoteCount === 2) {
            return t.substring(1, t.length - 1);
          }
        }
        return t;
      })
      .join('\n');

    Papa.parse(cleanedText, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const parsedData = results.data as any[];

        console.log("Parsed CSV:", parsedData);
        setData(parsedData);

        const { data: userData } = await supabase.auth.getUser();
        const userId = userData.user?.id;

        if (!userId) {
          alert("User not logged in");
          return;
        }

        const formattedData = parsedData.map((row, index) => ({
          user_id: userId,
          property_name: row.property_name || `Imported Property ${index + 1}`,
          property_address:
            row.property_address ||
            `${row.address_line_1 || ""} ${row.address_line_2 || ""}, ${row.city || ""}, ${row.state || ""} ${row.zip || ""}`.trim(),
          building_size_sqft: Number(row.gross_floor_area || row.building_size_sqft || 0),
          primary_use_type: row.property_type || row.primary_use_type || "Unknown",
          weekly_operating_hours: Number(row.weekly_operating_hours || 0),
          number_of_workers: Number(row.number_of_workers || 0),
        }));

        const { error } = await supabase
          .from("properties")
          .insert(formattedData);

        if (error) {
          console.error("Insert error:", error.message);
          alert("Error inserting data");
        } else {
          alert("Data uploaded successfully!");
        }
      },
    });
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="border border-dashed border-gray-400 h-full min-h-[16rem] flex flex-col items-center justify-center text-center p-6 rounded-xl">

      <p className="font-bold text-black mb-3">
        Bulk Import Properties
      </p>

      <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-3">
        Upload CSV
        <input
          type="file"
          accept=".csv"
          onChange={handleUpload}
          className="hidden"
        />
      </label>
    </div>
  );
}