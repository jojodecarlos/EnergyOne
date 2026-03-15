"use client";

export default function Recommendations() {

  // placeholder score (change const score to test each level)
  const score = 70;

  let status = "";
  let color = "";
  let recommendation = "";

  if (score < 40) {
    status = "Poor";
    color = "bg-red-500";
    recommendation = "Major efficiency improvements needed.";
  } 
  else if (score < 60) {
    status = "Fair";
    color = "bg-yellow-500";
    recommendation = "Some efficiency improvements recommended.";
  } 
  else if (score < 80) {
    status = "Good";
    color = "bg-blue-500";
    recommendation = "Minor efficiency improvements possible.";
  } 
  else {
    status = "Outstanding";
    color = "bg-green-500";
    recommendation = "Energy usage is excellent. Maintain current practices.";
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full">

      <h2 className="text-lg font-semibold mb-4">
        Energy Efficiency Score
      </h2>

      <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
        <div
          className={`${color} h-6`}
          style={{ width: `${score}%` }}
        ></div>
      </div>

      <p className="mt-3 font-semibold">
        Score: {score} — {status}
      </p>

      <p className="text-sm text-gray-600 mt-2">
        {recommendation}
      </p>

    </div>
  );
}