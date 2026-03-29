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
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const today = new Date();
      let startDate: string, endDate: string;

      if (range === "Monthly") {
        startDate = new Date(today.getFullYear(), today.getMonth(), 1)
          .toISOString()
          .split("T")[0];
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)
          .toISOString()
          .split("T")[0];
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
        startDate = new Date(today.getFullYear(), 0, 1)
          .toISOString()
          .split("T")[0];
        endDate = new Date(today.getFullYear(), 11, 31)
          .toISOString()
          .split("T")[0];
      }

      // User properties
      const { data: properties } = await supabase
        .from("properties")
        .select("id, property_name")
        .eq("user_id", user.id);

      if (!properties) return;

      const propertyIds = properties.map((p) => p.id);

      const { data: readings } = await supabase
        .from("meter_readings")
        .select("usage_amount, property_id")
        .gte("start_date", startDate)
        .lte("end_date", endDate)
        .in("property_id", propertyIds);

      if (!readings) return;

      // Aggregate user data
      const aggregated: Record<string, number> = {};
      readings.forEach((r) => {
        const property = properties.find((p) => p.id === r.property_id);
        if (!property) return;
        aggregated[property.property_name] =
          (aggregated[property.property_name] || 0) + r.usage_amount;
      });

      // Dynamic baseline scaling
      const weeklyBaseline = {
        "Normal Home": 30,
        Apartment: 20,
        Bank: 75,
      };
      const scaleFactor = range === "Weekly" ? 1 : range === "Monthly" ? 4 : 52;
      const baselineData = Object.entries(weeklyBaseline).map(
        ([name, usage]) => ({
          name,
          usage: usage * scaleFactor,
        }),
      );

      setEnergyData([
        ...baselineData,
        ...Object.entries(aggregated).map(([name, usage]) => ({ name, usage })),
      ]);
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
