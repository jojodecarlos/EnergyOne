'use client';

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { supabase } from "@/lib/supabase";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Property {
  id: number;
  name: string;
}

interface Reading {
  id: number;
  property_id: number;
  date: string;
  usage_amount: number;
}

export default function PerformanceChart() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch properties for logged-in user
  useEffect(() => {
    async function fetchProperties() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("user_id", user.id);

      if (error) console.error(error);
      else {
        setProperties(data);
        if (data.length > 0) setSelectedProperty(data[0].id); // select first property by default
      }
    }

    fetchProperties();
  }, []);

  // Fetch readings whenever selectedProperty changes
  useEffect(() => {
    if (!selectedProperty) return;

    async function fetchReadings() {
      setLoading(true);
      const { data, error } = await supabase
        .from("meter_readings")
        .select("*")
        .eq("property_id", selectedProperty)
        .order("date", { ascending: true });

      if (error) console.error(error);
      else setReadings(data);

      setLoading(false);
    }

    fetchReadings();
  }, [selectedProperty]);

  const filteredReadings = readings;

  // Chart.js data
  const data = {
    labels: filteredReadings.map(r => r.date),
    datasets: [
      {
        label: "Usage Amount",
        data: filteredReadings.map(r => r.usage_amount),
        borderColor: "#1F7A5A",
        backgroundColor: "rgba(31, 122, 90, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: false, text: "Energy Usage Over Time" },
    },
  };

  // Export CSV
  const handleExport = () => {
    const csv = [
      ["Date", "Usage Amount"],
      ...filteredReadings.map(r => [r.date, r.usage_amount])
    ]
      .map(e => e.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `usage_property_${selectedProperty}.csv`);
    link.click();
  };

  return (
    <div className="w-full p-6 bg-white rounded-2xl shadow space-y-4">
      <div className="flex justify-between items-center mb-4">
        {/* Property Dropdown */}
        <span className="text-black font-Outfit font-semibold">Performance Trends</span>

        <select
          className="border rounded-full px-4 py-2 bg-[#002A84] text-white font-semibold shadow-md"
          value={selectedProperty || ""}
          onChange={(e) => setSelectedProperty(parseInt(e.target.value))}
        >
          {properties.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      {/* Line Chart */}
      <div className="w-full h-[400px]">
        <Line data={data} options={options} />
      </div>

      {/* Export Button */}
      <div className="flex justify-end -mt-4">
        <button
          onClick={handleExport}
          className="bg-[#002A84] text-white font-inter font-semibold px-4 py-2 rounded-full shadow hover:bg-blue-700"
        >
          Export Data
        </button>
      </div>

      {loading && <p className="text-center text-gray-500">Loading readings...</p>}
      {!loading && filteredReadings.length === 0 && (
        <p className="text-center text-gray-500">No readings available for this property.</p>
      )}
    </div>
  );
}