import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export default function BrandHeader() {
  return (
    <div className={`text-center ${montserrat.className}`}>
      <p className="text-xs font-bold tracking-[0.28em] text-gray-700 uppercase">
        WELCOME TO
      </p>

      <h1 className="mt-2 text-4xl font-extrabold italic leading-none tracking-tight">
        <span className="text-blue-800">Orlando Energy </span>
        <span className="text-green-700">ONE</span>
      </h1>

      <p className="mt-3 text-sm text-gray-500">
        Sign in to access your energy account
      </p>
    </div>
  );
}