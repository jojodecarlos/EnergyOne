'use client'

import { Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip
} from "chart.js"

ChartJS.register(ArcElement, Tooltip)

export default function PortfolioScore() {

  const score = 72

  const data = {
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: ["#3B82F6", "#E5E7EB"],
        borderWidth: 0,
      },
    ],
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">
        Portfolio Score
      </h2>

      <div className="w-40">
        <Doughnut data={data} />
      </div>

      <p className="mt-4 text-gray-500">
        Good performance. Some areas can still improve.
      </p>
    </div>
  )
}