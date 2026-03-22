"use client";

import { useState } from "react";

export default function MeterTypeCheckboxes() {
  const [meters, setMeters] = useState({
    electricity: false,
    gas: false,
    water: false,
  });

  const toggleMeter = (type: keyof typeof meters) => {
    setMeters((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const getStyle = (active: boolean) =>
    active
      ? "bg-blue-600 text-white border-blue-600"
      : "bg-white text-gray-800 border-gray-300";

  return (
    <div className="border border-dashed border-gray-400 w-full p-4 rounded-xl">

      <p className="font-bold text-center mb-4 text-black">
        Meter Types
      </p>

      <div className="flex justify-center gap-6 flex-wrap">

        {/* Electricity */}
        <button
          type="button"
          onClick={() => toggleMeter("electricity")}
          className={`px-5 py-2 rounded-full border font-medium transition ${getStyle(meters.electricity)}`}
        >
          Electricity
        </button>

        {/* Gas */}
        <button
          type="button"
          onClick={() => toggleMeter("gas")}
          className={`px-5 py-2 rounded-full border font-medium transition ${getStyle(meters.gas)}`}
        >
          Gas
        </button>

        {/* Water */}
        <button
          type="button"
          onClick={() => toggleMeter("water")}
          className={`px-5 py-2 rounded-full border font-medium transition ${getStyle(meters.water)}`}
        >
          Water
        </button>

      </div>
    </div>
  );
}