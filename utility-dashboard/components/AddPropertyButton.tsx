import Link from "next/link";

export default function AddPropertyButton() {
  return (
    <Link
      href="/portfolio/manage"
      className="block w-full rounded-full bg-blue-800 px-6 py-4 text-center text-lg font-semibold text-white shadow-md transition hover:bg-blue-900"
    >
      Add/Manage a Property
    </Link>
  );
}