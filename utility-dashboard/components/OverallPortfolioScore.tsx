"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip);

// Only keep the color and message helpers!
function getScoreColor(score: number) {
  if (score >= 80) return "#1E9E63";
  if (score >= 60) return "#2563EB";
  if (score >= 40) return "#EAB308";
  return "#DC2626";
}

function getScoreMessage(score: number | null) {
  if (score === null) {
    return "Overall score will appear once calculation logic is finalized.";
  }

  if (score >= 80) return "Excellent performance across your portfolio.";
  if (score >= 60) return "Good performance with room for improvement.";
  if (score >= 40) return "Moderate performance. Some areas need attention.";
  return "Low performance. Significant improvement is needed.";
}

export default function OverallPortfolioScore() {
  const [averageScore, setAverageScore] = useState<number | null>(null);

  useEffect(() => {
    const fetchScores = async () => {
      // 1. Get the active user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // 2. Fetch all of their scores
      const { data, error } = await supabase
        .from("performance_scores")
        .select("energy_star_score")
        .eq("user_id", user.id);

      if (error || !data) return;

      // 3. Calculate the average directly here instead of using the old helper
      const validScores = data
        .map((d) => d.energy_star_score)
        .filter((score): score is number => typeof score === "number" && !Number.isNaN(score));

      if (validScores.length > 0) {
        const total = validScores.reduce((sum, score) => sum + score, 0);
        setAverageScore(Math.round(total / validScores.length));
      }
    };

    fetchScores();
  }, []);

  const ringColor = averageScore !== null ? getScoreColor(averageScore) : "#D1D5DB";

  const chartData = {
    datasets: [
      {
        data: averageScore !== null ? [averageScore, 100 - averageScore] : [0, 100],
        backgroundColor:
          averageScore !== null ? [ringColor, "#E5E7EB"] : ["#D1D5DB", "#E5E7EB"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md border border-gray-100">
      <h2 className="text-center text-xl font-bold text-black">
        Overall Portfolio Score
      </h2>
      <p className="mt-1 text-center text-sm text-gray-500">
        Score as of xx/xx/xxxx
      </p>

      <div className="mx-auto mt-6 flex w-40 items-center justify-center">
        <div className="relative h-40 w-40">
          <Doughnut
            data={chartData}
            options={{
              cutout: "72%",
              plugins: { legend: { display: false } },
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-black">
            {averageScore !== null ? averageScore : "--"}
          </div>
        </div>
      </div>

      <p className="mx-auto mt-6 max-w-xs text-center text-sm text-gray-600">
        {getScoreMessage(averageScore)}
      </p>
    </div>
  );
}