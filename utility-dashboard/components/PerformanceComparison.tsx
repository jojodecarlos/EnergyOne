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

      const today = new Date();
      let startDate: string, endDate: string;

      if (range === "Monthly") {
        startDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split("T")[0];
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split("T")[0];
      } else if (range === "Weekly") {
        const dayOfWeek = today.getDay();
        const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        const monday = new Date(today);
        monday.setDate(today.getDate() + diffToMonday);
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        startDate = monday.toISOString().split("T")[0];
        endDate = sunday.toISOString().split("T")[0];
      } else {
        startDate = new Date(today.getFullYear(), 0, 1).toISOString().split("T")[0];
        endDate = new Date(today.getFullYear(), 11, 31).toISOString().split("T")[0];
      }

      const { data: properties, error: propError } = await supabase
        .from("properties")
        .select("id, orlando_building_id")
        .eq("user_id", user.id);

      if (propError || !properties || properties.length === 0) return;

      const propertyIds = properties.map((p) => p.id);

      const { data: readings, error: readingsError } = await supabase
        .from("meter_readings")
        .select("usage_amount, property_id")
        .in("property_id", propertyIds) 
        .gte("start_date", startDate)
        .lte("end_date", endDate);

      if (!readings || readings.length === 0) {
        setEnergyData([]); 
        return;
      }

      const aggregated: Record<string, number> = {};

      readings.forEach((r) => {
        aggregated["Your Portfolio"] =
          (aggregated["Your Portfolio"] || 0) + Number(r.usage_amount);
      });

      const portfolioUsage = aggregated["Your Portfolio"] || 0;

      const baselineData = [
        { name: "Residential Home", usage: portfolioUsage * 0.6 },
        { name: "Apartment", usage: portfolioUsage * 0.4 },
        { name: "Bank", usage: portfolioUsage * 1.5 },
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