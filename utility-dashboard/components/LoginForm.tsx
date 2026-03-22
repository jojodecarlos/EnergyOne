"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginForm() {
    
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 1. Added React.FormEvent to handle standard form submissions
    const handleLogin = async (e: React.FormEvent) => {
        // Prevents the browser from reloading the page natively
        e.preventDefault();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            alert(error.message);
            return;
        }

        // 2. Updated to push directly to the dashboard
        router.push("/dashboard"); 
        
        // 3. Forces Next.js to update the server components with the new auth state
        router.refresh(); 
    };
    
    return(
        // 4. Moved the handler to the form's onSubmit event
        <form onSubmit={handleLogin} className="w-full max-w-md">

            <div className="relative flex space-x-3">
                <Image
                    src="/images/EmailIcon.png"
                    alt="Email Icon"
                    width={30}
                    height={30}
                    className="absolute inset-y-2 left-3 flex items-center pointer-events-none"
                />
                <input 
                    type="email"
                    id="email" // Updated ID to match standard email autofill
                    name="email" 
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-full border border-gray-700 px-5 py-3 text-md text-gray-500 focus:outline-none focus:ring-2 font-inter focus:ring-blue-800 pl-12" 
                />
            </div>

            <div className="relative flex space-x-3 mt-5">
                <Image
                    src="/images/PasswordIcon.png"
                    alt="Password Icon"
                    width={30}
                    height={30}
                    className="absolute inset-y-1 left-3 flex items-center pointer-events-none"
                />

                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-3 border border-gray-700 rounded-full text-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter pl-12"
                />
            </div>

            <div className="flex flex-col mt-1 mb-5 ml-5">
                <button
                    type="button"
                    onClick={() => router.push("/forgotpw")}
                    className="text-md text-blue-700 hover:underline font-inter text-left"
                >
                    Forgot Password?
                </button>
            </div>

            {/* 5. Changed from type="button" to type="submit" */}
            <button 
                type="submit"
                className="w-full bg-[#002A84] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-blue-900 transition duration-300"
            >
                SIGN IN
            </button>

            <div className="flex justify-center text-center space-x-3 mt-5">
                <p className="text-md text-gray-700 font-inter">
                    Don't have an account?  
                </p>
                <button
                    type="button"
                    onClick={() => router.push("/signup")}
                    className="text-md text-blue-800 hover:underline font-inter font-extrabold"
                >
                    Sign Up Now
                </button>
            </div>
        </form>
    );
}