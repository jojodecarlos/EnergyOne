"use client";

interface Props {
  title: string;
  description: string;
  onClick?: () => void;
}

export default function SettingsActionRow({
  title,
  description,
  onClick,
}: Props) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between bg-white rounded-2xl shadow-sm px-5 h-[72px] hover:shadow-md transition cursor-pointer"
    >
      <div>
        <p className="font-semibold text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <span className="text-gray-400 text-lg">⌄</span>
    </div>
  );
}