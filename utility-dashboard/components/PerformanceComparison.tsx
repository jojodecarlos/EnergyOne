"use client";

import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { supabase } from "../lib/supabase"; // adjust path
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

export default function PerformanceComparison() {
  const [range, setRange] = useState<"Monthly" | "Weekly" | "Yearly">(
    "Monthly",
  );
  const [energyData, setEnergyData] = useState<
    { name: string; usage: number }[]
  >([]);

  useEffect(() => {
    console.log("PerformanceComparison effect triggered, range:", range);
    const fetchData = async () => {
      console.log("fetchData started");
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        console.log("No user");
        return;
      }
      console.log("User:", user.id);

      const { data: properties, error: propError } = await supabase
        .from("properties")
        .select("id, orlando_building_id")
        .eq("user_id", user.id);

      if (propError) {
        console.error("Properties error:", propError);
        return;
      }
      if (!properties || properties.length === 0) {
        console.log("No properties");
        return;
      }
      console.log("Properties:", properties);

      const propertyIds = properties.map((p) => p.id);
      console.log("Property IDs:", propertyIds);

      const propertyId = propertyIds[0];
      console.log("Using propertyId:", propertyId);
      
      const { data: readings, error: readingsError } = await supabase
        .from("meter_readings")
        .select("usage_amount, property_id")
        .eq("property_id", propertyId);

      console.log("Readings:", readings, "Error:", readingsError);
      if (!readings || readings.length === 0) {
        console.log("No readings found");
        return;
      }

      const aggregated: Record<string, number> = {};
      readings.forEach((r) => {
        const property = properties.find((p) => p.id === r.property_id);
        if (!property) return;
        aggregated["Your Portfolio"] = (aggregated["Your Portfolio"] || 0) + Number(r.usage_amount);
      });
      console.log("Aggregated:", aggregated);

      const portfolioUsage = Object.values(aggregated)[0] || 0;
      const baselineData = [
        { name: "Normal Home", usage: portfolioUsage * 0.6 },
        { name: "Apartment", usage: portfolioUsage * 0.4 },
        { name: "Bank", usage: portfolioUsage * 1.5 },
      ];

      const finalData = [
        ...baselineData,
        ...Object.entries(aggregated).map(([name, usage]) => ({ name, usage })),
      ];
      console.log("Final energyData:", finalData);
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
        label: `Energy Usage (${range})`,
        data: energyData.map((e) => e.usage),
        backgroundColor: labels.map((_, i) => colors[i % colors.length]),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: `Performance Comparison (${range})` },
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
          onChange={(e) =>
            setRange(e.target.value as "Monthly" | "Weekly" | "Yearly")
          }
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
