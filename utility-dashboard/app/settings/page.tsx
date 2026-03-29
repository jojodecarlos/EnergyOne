"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/DashboardHeader";
import DisplaySettingsPanel from "@/components/DisplaySettingsPanel";

export default function SettingsPage() {
  const [helpOpen, setHelpOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error logging out:", error.message);
      alert("There was an issue logging out. Please try again.");
      return;
    }

    router.push("/login");
  };
  function handleSignOut() {
    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-[#efefef]">
      <DashboardHeader />

      <div className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-12">

        <h1 className="text-4xl font-extrabold text-[#002A84] mb-10">
          Settings
        </h1>

        <div className="flex flex-col gap-6 w-full">

          <SettingsAccordion 
            icon="/images/view-icon.svg" 
            title="Display Settings" 
            description="Customize appearance and how information is displayed"
          >
            <DisplaySettingsPanel />
          </SettingsAccordion>

          <SettingsActionRow 
            icon="/images/help-icon.svg" 
            title="Help & Support" 
            description="Access guides and support resources"
            onClick={() => {
              console.log("Help & Support clicked");
            }}
          />
      <div className="mx-auto max-w-5xl px-6 py-8">
        <h1 className="mb-6 text-5xl font-bold text-blue-900">Settings</h1>

        <div className="space-y-6">
          <DisplaySettingsPanel />

          <button
            type="button"
            onClick={() => setHelpOpen(!helpOpen)}
            className="flex w-full items-center justify-between rounded-[24px] border border-gray-300 bg-white px-6 py-5 text-left shadow-sm transition hover:bg-gray-50"
          >
            <div>
              <h2 className="text-2xl font-bold text-black">Help &amp; Support</h2>
              <p className="mt-1 text-sm text-gray-600">
                Access guides and support resources
              </p>
            </div>

            <span
              className={`text-3xl font-bold text-black transition-transform ${
                helpOpen ? "rotate-180" : ""
              }`}
            >
              ˅
            </span>
          </button>

          <button
            type="button"
            onClick={handleSignOut}
          />

            className="w-full rounded-[24px] border border-gray-300 bg-white px-6 py-5 text-left shadow-sm transition hover:bg-gray-50"
          >
            <h2 className="text-2xl font-bold text-black">Sign Out</h2>
            <p className="mt-1 text-sm text-gray-600">
              Sign out of your Orlando Energy ONE account
            </p>
          </button>
        </div>
      </div>
    </main>
  );
}