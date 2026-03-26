interface SettingsActionRowProps {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
  actionIcon: string;
  iconColor?: string;
}

export default function SettingsActionRow({ title, description, onClick }: SettingsActionRowProps) {
  return (
    <button 
      onClick={onClick}
      className="w-full text-left mb-6 p-6 border-2 border-dashed border-green-400 rounded-3xl bg-green-50 hover:bg-green-100 transition-colors"
    >
      <h2 className="text-xl font-bold text-green-900">{title} (Action Button)</h2>
      <p className="text-sm text-green-700">{description}</p>
    </button>
  );
}