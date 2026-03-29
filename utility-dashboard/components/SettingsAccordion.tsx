"use client";

import { useState } from "react";

interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function SettingsAccordion({
  title,
  description,
  children,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

      {/* HEADER SAME HEIGHT */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between px-5 h-[72px] cursor-pointer hover:shadow-md transition"
      >
        <div>
          <p className="font-semibold text-gray-900">{title}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>

        <span className="text-gray-400 text-lg">
          {open ? "⌃" : "⌄"}
        </span>
      </div>

      {open && (
        <div className="px-5 pb-5 pt-3 border-t bg-gray-50">
          {children}
        </div>
      )}
    </div>
  );
}