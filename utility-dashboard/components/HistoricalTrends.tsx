"use client";

import { useState } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function HistoricalTrends() {

  const [range, setRange] = useState("Monthly");

  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  const data = {
    labels,
    datasets: [
      {
        label: "Energy Usage (kWh)",
        data: [120, 140, 135, 150, 160, 155],
        borderColor: "#002A84",
        backgroundColor: "rgba(0, 42, 132, 0.2)",
        tension: 0.3
      }
    ]
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Historical Energy Trends</h2>

        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="border rounded-md px-3 py-1"
        >
          <option>Monthly</option>
          <option>Weekly</option>
          <option>Yearly</option>
        </select>
      </div>

      <Line data={data} />
    </div>
  );
}