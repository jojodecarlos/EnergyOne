"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function UpdatePasswordForm() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [loading, setLoading] = useState(false);

    const validatePassword = (password: string) => {
        const minLength = 8;
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
        if (password.length < minLength) return false;
        if (!specialChar.test(password)) return false;
        return true;
    }

    const handleUpdate = async () => {
        if (!password || !passwordConfirm) {
            alert("Please fill in all fields");
            return;
        }
        if (!validatePassword(password)) {
            alert("Password must be at least 8 characters and contain at least one special character");
            return;
        }
        if (password !== passwordConfirm) {
            alert("Passwords do not match");
            return;
        }

        setLoading(true);

        // Because the email link securely authenticated them, we just update the user directly
        const { error } = await supabase.auth.updateUser({
            password: password
        });

        setLoading(false);

        if (error) {
            alert(error.message);
            return;
        }

        // On success, force them to log in with their brand new password
        alert("Password updated successfully! Please log in.");
        await supabase.auth.signOut(); 
        router.push("/login");
    }

    return(
        <form className="w-full max-w-md flex flex-col items-center">
            
            {/* New Password Input */}
            <div className="relative flex w-full mt-5">
                <Image
                    src="/images/PasswordIcon.png"
                    alt="Password Icon"
                    width={30}
                    height={30}
                    className="absolute inset-y-3 left-3 flex items-center pointer-events-none"
                />
                <input 
                    type="password"
                    placeholder="New Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-full border border-gray-700 px-5 py-3 text-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-800 pl-12 font-inter"
                />
            </div>

            <p className="text-xs text-gray-500 mt-2 text-left w-full pl-4">
                Must contain 8 characters and one special character.
            </p>

            {/* Confirm Password Input */}
            <div className="relative flex w-full mt-5">
                <Image
                    src="/images/PasswordIcon.png"
                    alt="Password Icon"
                    width={30}
                    height={30}
                    className="absolute inset-y-3 left-3 flex items-center pointer-events-none"
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    className="w-full rounded-full border border-gray-700 px-5 py-3 text-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-800 pl-12 font-inter"
                />
            </div>

            {/* Submit Button */}
            <button 
                type="button"
                onClick={handleUpdate}
                disabled={loading}
                className="w-full bg-[#002A84] hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full shadow-md transition duration-300 mt-8 disabled:bg-gray-400"
            >
                {loading ? "Updating..." : "Update Password"}
            </button>
        </form>
    );
}