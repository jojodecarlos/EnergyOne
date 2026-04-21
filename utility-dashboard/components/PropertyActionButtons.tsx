"use client";

export default function PropertyActionButtons({
  onSave,
  onDelete,
  onCancel,
}: {
  onSave: () => void;
  onDelete: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="flex justify-start gap-4 w-full">

      <button
        className="font-bold text-sm px-6 py-2.5 rounded-full border border-[#A7C9D6] bg-[#A7C9D6] text-white hover:bg-[#8ebdd1]"
        onClick={onSave}
      >
        Save Property
      </button>

      <button
        className="font-bold text-sm px-6 py-2.5 rounded-full border border-red-200 bg-red-50 text-red-600"
        onClick={onDelete}
      >
        Delete Property
      </button>

      <button
        className="font-bold text-sm px-6 py-2.5 rounded-full border border-gray-400 bg-white text-gray-700"
        onClick={onCancel}
      >
        Cancel
      </button>

    </div>
  );
}