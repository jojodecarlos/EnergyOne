"use client";

export interface PropertyData {
  id: string;
  name: string;
  address: string;
  city?: string;
  state?: string;
  zip?: string;
  propertyType?: string;
  buildingSize?: string;
  hours?: string;
  workers?: string;
}

interface PropertySelectorProps {
  properties: PropertyData[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function PropertySelector({ properties, selectedId, onSelect }: PropertySelectorProps) {
  return (
    <div className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-2xl flex items-center gap-6">
      <div className="flex-1">
        <h2 className="text-xl font-bold text-[#002A84] mb-1">Choose a Property to Edit</h2>
        <p className="text-sm text-gray-500">Select an existing property to auto-populate the form, or start fresh to create a new one.</p>
      </div>
      
      <div className="w-1/3">
        <select
          value={selectedId || ""}
          onChange={(e) => onSelect(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg text-black bg-white focus:ring-2 focus:ring-[#002A84] outline-none"
        >
          <option value="">+ Create New Property</option>
          {properties.map((prop) => (
            <option key={prop.id} value={prop.id}>
              {prop.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}