'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function WelcomeBanner() {
  const [name, setName] = useState("")

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const firstName = user.user_metadata?.first_name
        setName(firstName || "User")
      }
    }

    fetchUser()
  }, [])

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-semibold">
        Welcome, {name} 
      </h1>
      <p className="text-gray-500">
        Here's your energy dashboard.
      </p>
    </div>
  )
}