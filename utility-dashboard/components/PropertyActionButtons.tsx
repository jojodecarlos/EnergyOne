"use client";

export default function PropertyActionButtons() {
  return (
    <div className="flex justify-start gap-4 w-full">
      
      {/* 1. SAVE (Left) */}
      <button
        type="button"
        className="font-bold text-sm px-6 py-2.5 rounded-full transition-colors duration-200 border border-[#A7C9D6] bg-[#A7C9D6] text-white hover:bg-[#8ebdd1]"
        onClick={() => console.log("Save clicked")}
      >
        Save Property
      </button>

      {/* 2. DELETE (Middle) */}
      <button
        type="button"
        className="font-bold text-sm px-6 py-2.5 rounded-full transition-colors duration-200 border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300 shadow-sm"
        onClick={() => console.log("Delete clicked")}
      >
        Delete Property
      </button>

      {/* 3. CANCEL (Right) */}
      <button
        type="button"
        className="font-bold text-sm px-6 py-2.5 rounded-full transition-colors duration-200 border border-gray-400 bg-white text-gray-700 hover:bg-gray-50 shadow-sm"
        onClick={() => console.log("Cancel clicked")}
      >
        Cancel
      </button>

    </div>
  );
}