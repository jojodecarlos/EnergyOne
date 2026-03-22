import Link from "next/link";

type PropertyListItemProps = {
  id: string | number;
  propertyName: string;
  score?: number | null;
};

function getScoreColor(score: number) {
  if (score >= 80) return "#1E9E63";
  if (score >= 60) return "#2563EB";
  if (score >= 40) return "#EAB308";
  return "#DC2626";
}

export default function PropertyListItem({
  id,
  propertyName,
  score,
}: PropertyListItemProps) {
  const safeScore = typeof score === "number" && !Number.isNaN(score) ? score : null;
  const ringColor = safeScore !== null ? getScoreColor(safeScore) : "#D1D5DB";

  return (
    <Link
      href={`/portfolio/manage?id=${id}`}
      className="flex items-center gap-6 rounded-2xl bg-white px-6 py-5 shadow-sm border border-gray-200 transition hover:shadow-md"
    >
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 bg-white text-sm font-bold text-black"
        style={{ borderColor: ringColor }}
      >
        {safeScore !== null ? safeScore : "--"}
      </div>

      <div className="flex-1">
        <p className="text-3xl font-bold text-black text-center">
          {propertyName}
        </p>
      </div>
    </Link>
  );
}