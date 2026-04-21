"use client";

export default function PropertyMetricsFields({
  propertyData,
  onChange,
}: {
  propertyData: any;
  onChange: (val: any) => void;
}) {

  const handle = (field: string, value: string) => {
    onChange({ [field]: value });
  };

  return (
    <div className="border border-dashed border-gray-400 w-full flex flex-col items-center justify-center p-6 rounded-xl">

      <p className="font-bold mb-4 text-black">
        Property Metrics Fields
      </p>

      <div className="w-full max-w-md">

        <input
          className="w-full border p-2 mb-3 rounded text-black"
          placeholder="Property Type"
          value={propertyData.propertyType}
          onChange={(e) => handle("propertyType", e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3 rounded text-black"
          placeholder="Gross Floor Area"
          value={propertyData.buildingSize}
          onChange={(e) => handle("buildingSize", e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3 rounded text-black"
          placeholder="Weekly Operating Hours"
          value={propertyData.hours}
          onChange={(e) => handle("hours", e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3 rounded text-black"
          placeholder="Number of Workers"
          value={propertyData.workers}
          onChange={(e) => handle("workers", e.target.value)}
        />

      </div>
    </div>
  );
}