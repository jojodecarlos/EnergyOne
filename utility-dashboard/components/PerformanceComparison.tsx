"use client";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export default function PerformanceComparison() {
  const [range, setRange] = useState<"Monthly" | "Weekly" | "Yearly">("Monthly");

  const energyData = {
    "Monthly": [80, 100, 500, 1000],
    "Weekly": [20, 25, 150, 250],
    "Yearly": [960, 1200, 6000, 12000],
  };
  const data = {
    labels: ["Personal Homes", "Apartments", "Banks", "Your Building"],
    datasets: [
      {
        label: "Average Energy Consumption (kWh)",
        data: energyData[range], 
        backgroundColor: [
          "#facd03",
          "#4F46E5",
          "#f10808",
          "#1F7A5A" 
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Performance Comparison (${range})`,
      },
    },
  };

  return(
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-black text-[30px] w-[231px] font-md font-Outfit">Performance Comparison</h2>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value as "Monthly" | "Weekly" | "Yearly")}
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