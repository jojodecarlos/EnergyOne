"use client";

type HistoricalEntry = {
  id: string | number;
  start_date?: string | null;
  end_date?: string | null;
  usage?: number | null;
  cost?: number | null;
  meter_type?: string | null;
};

type HistoricalEntriesTableProps = {
  entries: HistoricalEntry[];
};

function formatDate(value?: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString();
}

function formatUsage(value?: number | null) {
  if (typeof value !== "number") return "—";
  return value.toLocaleString();
}

function formatCost(value?: number | null) {
  if (typeof value !== "number") return "—";
  return `$${value.toFixed(2)}`;
}

export default function HistoricalEntriesTable({
  entries,
}: HistoricalEntriesTableProps) {
  return (
    <div className="rounded-[24px] border border-gray-300 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold text-black">Historical Entries</h2>

      <div className="max-h-[260px] overflow-y-auto rounded-md border border-gray-400">
        <table className="w-full border-collapse text-left">
          <thead className="sticky top-0 bg-[#f5f5f5]">
            <tr>
              <th className="border-b border-gray-400 px-4 py-3 text-sm font-semibold text-black">
                Start Date
              </th>
              <th className="border-b border-gray-400 px-4 py-3 text-sm font-semibold text-black">
                End Date
              </th>
              <th className="border-b border-gray-400 px-4 py-3 text-sm font-semibold text-black">
                Usage
              </th>
              <th className="border-b border-gray-400 px-4 py-3 text-sm font-semibold text-black">
                Cost
              </th>
              <th className="border-b border-gray-400 px-4 py-3 text-sm font-semibold text-black">
                Meter Type
              </th>
            </tr>
          </thead>

          <tbody>
            {entries.length > 0 ? (
              entries.map((entry) => (
                <tr key={entry.id} className="bg-white">
                  <td className="border-b border-gray-300 px-4 py-3 text-sm text-black">
                    {formatDate(entry.start_date)}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-sm text-black">
                    {formatDate(entry.end_date)}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-sm text-black">
                    {formatUsage(entry.usage)}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-sm text-black">
                    {formatCost(entry.cost)}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-sm text-black">
                    {entry.meter_type ?? "—"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-sm text-gray-500"
                >
                  No historical entries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}