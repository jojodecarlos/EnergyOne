"use client";

export default function MeterTypeCheckboxes({
  value,
  onChange,
}: {
  value: any;
  onChange: (val: any) => void;
}) {

  const toggle = (key: string) => {
    onChange({
      ...value,
      [key]: !value[key],
    });
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

        <button
          type="button"
          onClick={() => toggle("electricity")}
          className={`px-5 py-2 rounded-full border font-medium transition ${getStyle(value.electricity)}`}
        >
          Electricity
        </button>

        <button
          type="button"
          onClick={() => toggle("gas")}
          className={`px-5 py-2 rounded-full border font-medium transition ${getStyle(value.gas)}`}
        >
          Gas
        </button>

        <button
          type="button"
          onClick={() => toggle("water")}
          className={`px-5 py-2 rounded-full border font-medium transition ${getStyle(value.water)}`}
        >
          Water
        </button>

      </div>
    </div>
  );
}