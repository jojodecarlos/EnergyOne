import { ReactNode } from "react";

interface SettingsAccordionProps {
  icon: string;
  title: string;
  description: string;
  children: ReactNode;
}

export default function SettingsAccordion({ title, description, children }: SettingsAccordionProps) {
  return (
    <div className="mb-6 p-6 border-2 border-dashed border-blue-400 rounded-3xl bg-blue-50">
      <h2 className="text-xl font-bold text-blue-900">{title} (Accordion Wrapper)</h2>
      <p className="text-sm text-blue-700 mb-4">{description}</p>
      
      {/* This renders the DisplaySettingsPanel inside the box */}
      <div className="bg-white p-4 rounded-xl border border-blue-200">
        {children}
      </div>
    </div>
  );
}