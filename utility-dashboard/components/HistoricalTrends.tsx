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

type HistoricalTrendsProps = {
  range: "Monthly" | "Weekly" | "Yearly";
  setRange: (range: "Monthly" | "Weekly" | "Yearly") => void;
};

export default function HistoricalTrends({ range, setRange }: HistoricalTrendsProps) {
  
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);

  useEffect(() => {
    console.log("HistoricalTrends effect triggered, range:", range);
    const fetchData = async () => {
      console.log("fetchData started");
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log("No user found");
        return;
      }
      console.log("User:", user.id);

      const { data: properties, error: propError } = await supabase
        .from("properties")
        .select("id")
        .eq("user_id", user.id);

      if (propError) {
        console.error("Properties error:", propError);
        return;
      }
      if (!properties || properties.length === 0) {
        console.log("No properties found");
        return;
      }

      const propertyIds = properties.map(p => p.id);
      console.log("Property IDs:", propertyIds);

      let data, error;

      if (range === "Yearly") {
        const result = await supabase
          .from("performance_scores")
          .select("report_year, site_eui")
          .in("property_id", propertyIds)
          .order("report_year", { ascending: true });
        data = result.data;
        error = result.error;
        
        if (data && data.length > 0) {
          const formattedLabels = data.map((item) => item.report_year?.toString() || "");
          const formattedValues = data.map((item) => Number(item.site_eui));
          setLabels(formattedLabels);
          setValues(formattedValues);
          console.log("Yearly data set:", formattedLabels);
          return;
        }
      } else if (range === "Monthly") {
        const propertyId = propertyIds[0];
        console.log("Fetching monthly for property:", propertyId);
        const result = await supabase
          .from("meter_readings")
          .select("start_date, usage_amount")
          .eq("property_id", propertyId)
          .order("start_date", { ascending: true })
          .limit(500);
        data = result.data;
        error = result.error;
        console.log("Monthly result:", data, "error:", error);

        if (data && data.length > 0) {
          const aggregated: Record<string, number> = {};
          data.forEach((r) => {
            const monthKey = r.start_date?.substring(0, 7) || "";
            aggregated[monthKey] = (aggregated[monthKey] || 0) + Number(r.usage_amount);
          });
          const sortedKeys = Object.keys(aggregated).sort();
          setLabels(sortedKeys);
          setValues(sortedKeys.map(k => aggregated[k]));
          console.log("Monthly aggregated:", aggregated);
          return;
        } else {
          console.log("No monthly data found");
        }
      } else {
        const propertyId = propertyIds[0];
        console.log("Fetching weekly for property:", propertyId);
        const result = await supabase
          .from("meter_readings")
          .select("start_date, usage_amount")
          .eq("property_id", propertyId)
          .order("start_date", { ascending: true })
          .limit(500);
        data = result.data;
        error = result.error;
        console.log("Weekly result:", data, "error:", error);

        if (data && data.length > 0) {
          const aggregated: Record<string, number> = {};
          data.forEach((r) => {
            if (!r.start_date) return;
            const date = new Date(r.start_date);
            const dayOfWeek = date.getDay();
            const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
            const monday = new Date(date);
            monday.setDate(date.getDate() + diffToMonday);
            const weekKey = monday.toISOString().split("T")[0];
            aggregated[weekKey] = (aggregated[weekKey] || 0) + Number(r.usage_amount);
          });
          const sortedKeys = Object.keys(aggregated).sort();
          setLabels(sortedKeys);
          setValues(sortedKeys.map(k => aggregated[k]));
          console.log("Weekly aggregated:", aggregated);
          return;
        } else {
          console.log("No weekly data found");
        }
      }

      if (error) {
        console.error("Error:", error.message);
      }
    };

    fetchData();
  }, [range]);

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
          onChange={(e) => setRange(e.target.value as "Monthly" | "Weekly" | "Yearly")}
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