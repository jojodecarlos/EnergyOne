"use client";

export default function PropertyAddressFields({
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
    <div className="h-96 w-full flex flex-col justify-center text-center p-4 rounded-xl">

      <input
        className="w-full border border-black bg-[#D9D9D980] px-4 py-2 text-black focus:outline-none focus:ring-1 focus:ring-blue-800"
        placeholder="Address Line 1"
        value={propertyData.address1}
        onChange={(e) => handle("address1", e.target.value)}
      />

      <input
        className="w-full mt-7 border border-black bg-[#D9D9D980] px-4 py-2 text-black"
        placeholder="Address Line 2"
        value={propertyData.address2}
        onChange={(e) => handle("address2", e.target.value)}
      />

      <input
        className="w-full mt-7 border border-black bg-[#D9D9D980] px-4 py-2 text-black"
        placeholder="City"
        value={propertyData.city}
        onChange={(e) => handle("city", e.target.value)}
      />

      <input
        className="w-full mt-7 border border-black bg-[#D9D9D980] px-4 py-2 text-black"
        placeholder="State"
        value={propertyData.state}
        onChange={(e) => handle("state", e.target.value)}
      />

      <input
        className="w-full mt-7 border border-black bg-[#D9D9D980] px-4 py-2 text-black"
        placeholder="ZIP"
        value={propertyData.zip}
        onChange={(e) => handle("zip", e.target.value)}
      />

    </div>
  );
}