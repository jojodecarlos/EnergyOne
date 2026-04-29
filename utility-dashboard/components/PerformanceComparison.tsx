"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { supabase } from "@/lib/supabase"; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type RangeOption = "Monthly" | "Weekly" | "Yearly";

interface PerformanceComparisonProps {
  range: RangeOption;
  setRange: (range: RangeOption) => void;
}

export default function PerformanceComparison({
  range,
  setRange,
}: PerformanceComparisonProps) {
  
  const [energyData, setEnergyData] = useState<{ name: string; usage: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: properties, error: propError } = await supabase
        .from("properties")
        .select("id, property_address, primary_use_type")
        .eq("user_id", user.id);

      if (propError || !properties || properties.length === 0) return;

      const propertyIds = properties.map((p) => p.id);

      const { data: readings } = await supabase
        .from("meter_readings")
        .select("usage_amount, property_id")
        .in("property_id", propertyIds); 

      const aggregated: Record<string, number> = {};

      properties.forEach((p) => {
        let displayName = "Unnamed Property";
        if (p.property_address && p.property_address !== "null") {
          displayName = p.property_address;
        } else if (p.primary_use_type && p.primary_use_type !== "null") {
          displayName = p.primary_use_type;
        }
        aggregated[displayName] = 0;
      });

      if (readings && readings.length > 0) {
        readings.forEach((r) => {
          const property = properties.find((p) => p.id === r.property_id);
          if (!property) return;
          
          let displayName = "Unnamed Property";
          if (property.property_address && property.property_address !== "null") {
            displayName = property.property_address;
          } else if (property.primary_use_type && property.primary_use_type !== "null") {
            displayName = property.primary_use_type;
          }
          
          aggregated[displayName] += Number(r.usage_amount);
        });
      }

      let totalUsage = 0;
      Object.values(aggregated).forEach(val => totalUsage += val);

      const baseValue = totalUsage > 0 
        ? totalUsage / properties.length 
        : (range === "Weekly" ? 150 : range === "Monthly" ? 600 : 7200);

      const baselineData = [
        { name: "Normal Home", usage: baseValue * 0.6 },
        { name: "Apartment", usage: baseValue * 0.4 },
        { name: "Bank", usage: baseValue * 1.5 },
      ];

      const finalData = [
        ...baselineData,
        ...Object.entries(aggregated).map(([name, usage]) => ({ name, usage })),
      ];
      
      setEnergyData(finalData);
    };

    fetchData();
  }, [range]);

  const labels = energyData.map((e) => e.name);
  const colors = [
    "#facd03",
    "#4F46E5",
    "#f10808",
    "#1F7A5A",
    "#10B981",
    "#6366F1",
    "#EF4444",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: `Energy Usage (Lifetime)`,
        data: energyData.map((e) => e.usage),
        backgroundColor: labels.map((_, i) => colors[i % colors.length]),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: `Performance Comparison (All-Time)` },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-black text-[30px] w-[231px] font-md font-Outfit">
          Performance Comparison
        </h2>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value as RangeOption)}
          className="text-black border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
        >
          <option>Monthly</option>
          <option>Weekly</option>
          <option>Yearly</option>
        </select>
      </div>
      
      <Bar data={data} options={options} />
    </div>
  );
}