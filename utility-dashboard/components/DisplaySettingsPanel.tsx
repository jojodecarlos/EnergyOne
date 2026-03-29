"use client";

import { useState } from "react";

type ThemeOption = "light" | "dark";
type FontSizeOption = "small" | "medium" | "large";

export default function DisplaySettingsPanel() {
  const [theme, setTheme] = useState<ThemeOption>("light");
  const [fontSize, setFontSize] = useState<FontSizeOption>("medium");
  const [highContrast, setHighContrast] = useState(false);

  return (
    <div className="rounded-[24px] border border-gray-300 bg-white p-6 shadow-sm">
      <h2 className="text-[20px] font-bold text-black">Display Settings</h2>
      <p className="mt-1 text-sm text-gray-600">
        Adjust appearance and accessibility
      </p>

      <div className="mt-5 border-t border-gray-200 pt-5">
        <h3 className="text-[16px] font-bold text-black">Theme</h3>

        <div className="mt-3 grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={`rounded-md border px-4 py-2 text-sm font-semibold transition ${
              theme === "light"
                ? "border-blue-800 bg-blue-50 text-blue-900"
                : "border-gray-400 bg-white text-black"
            }`}
          >
            Light
          </button>

          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`rounded-md border px-4 py-2 text-sm font-semibold transition ${
              theme === "dark"
                ? "border-blue-800 bg-blue-50 text-blue-900"
                : "border-gray-400 bg-white text-black"
            }`}
          >
            Dark
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-[16px] font-bold text-black">High Contrast Mode</h3>
          <p className="text-sm text-gray-600">
            Increase color contrast for better visibility
          </p>
        </div>

        <button
          type="button"
          onClick={() => setHighContrast(!highContrast)}
          className={`relative h-8 w-14 rounded-full transition ${
            highContrast ? "bg-blue-800" : "bg-gray-400"
          }`}
        >
          <span
            className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${
              highContrast ? "left-7" : "left-1"
            }`}
          />
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-[16px] font-bold text-black">Font Size</h3>

        <div className="mt-3 grid grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => setFontSize("small")}
            className={`rounded-md border px-4 py-2 text-sm font-semibold transition ${
              fontSize === "small"
                ? "border-blue-800 bg-blue-50 text-blue-900"
                : "border-gray-400 bg-white text-black"
            }`}
          >
            Small
          </button>

          <button
            type="button"
            onClick={() => setFontSize("medium")}
            className={`rounded-md border px-4 py-2 text-sm font-semibold transition ${
              fontSize === "medium"
                ? "border-blue-800 bg-blue-50 text-blue-900"
                : "border-gray-400 bg-white text-black"
            }`}
          >
            Medium
          </button>

          <button
            type="button"
            onClick={() => setFontSize("large")}
            className={`rounded-md border px-4 py-2 text-sm font-semibold transition ${
              fontSize === "large"
                ? "border-blue-800 bg-blue-50 text-blue-900"
                : "border-gray-400 bg-white text-black"
            }`}
          >
            Large
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => console.log({ theme, fontSize, highContrast })}
        className="mt-6 rounded-full bg-gray-400 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-500"
      >
        Save Display Settings
      </button>
    </div>
  );
}