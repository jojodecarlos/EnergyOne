"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Recommendations() {
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const fetchScore = async () => {
      // Fetch the active user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("performance_scores")
        .select("energy_star_score")
        .eq("user_id", user.id) // Securely filtering by the user!
        .limit(1);

      if (error) {
        console.error("Error fetching score:", error.message);
        return;
      }

      if (data && data.length > 0) {
        setScore(data[0].energy_star_score);
      }
    };

    fetchScore();
  }, []);

  if (score === null) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md w-full">
        <h2 className="text-lg font-semibold mb-4 text-black">
          Energy Efficiency Score
        </h2>
        <p className="text-gray-500">
          No data available yet.
        </p>
      </div>
    );
  }

  let status = "";
  let color = "";
  let recommendation = "";

  if (score < 40) {
    status = "Poor";
    color = "bg-red-500";
    recommendation = "Major efficiency improvements needed.";
  } else if (score < 60) {
    status = "Fair";
    color = "bg-yellow-500";
    recommendation = "Some efficiency improvements recommended.";
  } else if (score < 80) {
    status = "Good";
    color = "bg-blue-500";
    recommendation = "Minor efficiency improvements possible.";
  } else {
    status = "Outstanding";
    color = "bg-green-500";
    recommendation = "Energy usage is excellent. Maintain current practices.";
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4 text-black">
        Energy Efficiency Score
      </h2>

      <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
        <div
          className={`${color} h-6`}
          style={{ width: `${score}%` }}
        ></div>
      </div>

      <p className="mt-3 font-semibold text-black">
        Score: {score} — {status}
      </p>

      <p className="text-sm text-gray-600 mt-2">
        {recommendation}
      </p>
    </div>
  );
}