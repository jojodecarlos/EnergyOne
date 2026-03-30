"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function HistoricalTrends() {
  const [range, setRange] = useState("Monthly");
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch the active user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("performance_scores")
        .select("report_year, site_eui")
        .eq("user_id", user.id) // Securely filtering by the user!
        .order("report_year", { ascending: true });

      if (error || !data) {
        console.error("Error fetching data:", error?.message);
        return;
      }

      const formattedLabels = data.map((item) => item.report_year.toString());
      const formattedValues = data.map((item) => Number(item.site_eui));

      setLabels(formattedLabels);
      setValues(formattedValues);
    };

    fetchData();
  }, []);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Energy Usage (kWh)",
        data: values,
        borderColor: "#002A84",
        backgroundColor: "rgba(0, 42, 132, 0.2)",
        tension: 0.3
      }
    ]
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-black">Historical Energy Trends</h2>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="border border-gray-300 text-black rounded-md px-3 py-1 text-sm"
        >
          <option>Monthly</option>
          <option>Weekly</option>
          <option>Yearly</option>
        </select>
      </div>
      <Line data={chartData} />
    </div>
  );
}