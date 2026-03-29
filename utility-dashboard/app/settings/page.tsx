"use client";

import DashboardHeader from '@/components/DashboardHeader';
import SettingsAccordion from '@/components/SettingsAccordion';
import DisplaySettingsPanel from '@/components/DisplaySettingsPanel';
import SettingsActionRow from '@/components/SettingsActionRow';
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
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

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
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

          <SettingsActionRow 
            icon="/images/signout-icon.svg" 
            title="Sign out" 
            description="Sign out of your Orlando Energy ONE account"
            onClick={handleSignOut}
          />

        </div>
      </div>
    </main>
  );
}