"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function DashboardHeader() {

  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="p-4 flex justify-between items-center mt-1">
      
      <h1 className="w-fit text-[58px] w-[486px] font-inter font-black italic leading-none tracking-tight">
        <span className="text-blue-800">Orlando Energy</span>
        <span className="text-[#1F7A5A]"> ONE</span>
      </h1>

      <div className="w-fit text-black gap-7 
      text-[24px] w-[99px] font-inter 
      border border-solid border-black rounded-full 
      px-4 py-2 font-md">

        <a
          href="/dashboard"
          className={`px-4 py-2 rounded-full ${
            pathname === "/dashboard"
              ? "bg-[#1F7A5A] text-white shadow-md"
              : "hover:bg-gray-200 transition duration-300"
          }`}
        >
          Dashboard
        </a>

        <a
          href=""
          className={`px-4 py-2 rounded-full ${
            pathname === "/portfolio"
              ? "bg-[#1F7A5A] text-white shadow-md"
              : "hover:bg-gray-200 transition duration-300"
          }`}
        >
          View Portfolio
        </a>

        <a
          href=""
          className={`px-4 py-2 rounded-full ${
            pathname === "/reports"
              ? "bg-[#1F7A5A] text-white shadow-md"
              : "hover:bg-gray-200 transition duration-300"
          }`}
        >
          Reports
        </a>

        <a
          href=""
          className={`px-4 py-2 rounded-full ${
            pathname === "/settings"
              ? "bg-[#1F7A5A] text-white shadow-md"
              : "hover:bg-gray-200 transition duration-300"
          }`}
        >
          Settings
        </a>

        <button
          onClick={handleLogout}
          className="rounded-full px-4 py-2 hover:bg-red-700 hover:text-white hover:cursor-pointer transition duration-300"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}