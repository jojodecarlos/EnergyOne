"use client"; 

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardHeader() {
  const router = useRouter();
  
  const pathname = usePathname();

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
      alert("There was an issue logging out. Please try again.");
      return;
    }
    router.push("/");
    router.refresh();
  };

  const getLinkStyle = (path: string) => {
    const isActive = pathname.startsWith(path);
    return isActive
      ? "px-5 py-2 text-sm font-medium text-white bg-[#2c7a5b] rounded-full shadow-sm"
      : "px-5 py-2 text-sm font-medium text-foreground hover:bg-gray-100 rounded-full transition";
  };

  return (
    <header className="flex justify-between items-center w-full max-w-7xl mx-auto p-8 bg-background">
      
      <div className="text-3xl font-extrabold italic leading-none tracking-tight">
        <span className="text-[#002A84]">Orlando Energy </span>
        <span className="text-[#107c54]">ONE</span>
      </div>

      <nav className="flex items-center bg-background border border-gray-800 rounded-full px-1 py-1 shadow-sm">
        
        <Link href="/dashboard" className={getLinkStyle('/dashboard')}>
          Dashboard
        </Link>
        
        <Link href="/portfolio" className={getLinkStyle('/portfolio')}>
          View Portfolio
        </Link>

        <Link href="/settings" className={getLinkStyle('/settings')}>
          Settings
        </Link>

        <button 
          onClick={handleLogOut}
          className="px-5 py-2 text-sm font-medium text-foreground hover:bg-gray-100 rounded-full transition ml-2"
        >
          Log Out
        </button>
        
      </nav>
    </header>
  );
}