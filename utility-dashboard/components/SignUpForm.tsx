"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignUpForm() {
    const router = useRouter();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirm, setEmailConfirm] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const validatepassword = (password: string) => {
        const minLength = 8;
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
        if (password.length < minLength) {
            return false;
        }
        if (!specialChar.test(password)) {
            return false;
        }
        return true;
    }

    const handleSignUp = async () => {
        if (!firstName.trim() || !lastName.trim() || !email.trim() || !emailConfirm.trim() || !password || !passwordConfirm) {
        alert("Please fill in all fields");
        return;
        }
        if (!validatepassword(password)) {
            alert("Password must be at least 8 characters and contain at least one special character");
            return;
        }
        if (email !== emailConfirm) {
            alert("Emails do not match");
            return;
        }
        if (password !== passwordConfirm) {
            alert("Passwords do not match");
            return;
        }
        
        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password,
        });
        if(error){
            alert(error.message);
            return;
        }

        const user = data.user;

        if(user){
            const{error} = await supabase.from("user_settings").insert({
                user_id: user.id,
                first_name: firstName,
                last_name: lastName,
                username: email,
                email: email,
            });

            if(error){
                alert(error.message);
                return;
            }
        }

        router.push("/confirmation");
    }

    return(
        <form className="w-full max-w-md">
            <div className="relative flex space-x-3">
                <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-full border border-gray-700 px-5 py-3
                    text-md text-gray-500 focus:outline-none focus:ring-2 font-inter
                    focus:ring-blue-800 pl-12" 
                />
            </div>

            <div className="relative flex space-x-3 mt-5">
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-full border border-gray-700 px-5 py-3
                    text-md text-gray-500 focus:outline-none focus:ring-2 font-inter
                    focus:ring-blue-800 pl-12"
                />
            </div>

            <div className="relative flex space-x-3 mt-5">
                <Image
                    src="/images/EmailIcon.png"
                    alt="Email Icon"
                    width={30}
                    height={30}
                    className="absolute inset-y-3 left-3 flex items-center
                    pointer-events-none"
                />
    
                <input 
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-full border border-gray-700 px-5 py-3
                    text-md text-gray-500 focus:outline-none focus:ring-2 font-inter
                    focus:ring-blue-800 pl-12"
                />
            </div>

            <div className="relative flex space-x-3 mt-5">
                <Image
                    src="/images/EmailIcon.png"
                    alt="Email Icon"
                    width={30}
                    height={30}
                    className="absolute inset-y-3 left-3 flex items-center
                    pointer-events-none"
                />
                <input 
                    type="email"
                    id="emailConfirm"
                    name="emailConfirm"
                    placeholder="Confirm Email"
                    onChange={(e) => setEmailConfirm(e.target.value)}
                    className="w-full rounded-full border border-gray-700 px-5 py-3
                    text-md text-gray-500 focus:outline-none focus:ring-2 font-inter
                    focus:ring-blue-800 pl-12"
                />
            </div>

            <div className="relative flex space-x-3 mt-5">
                <Image
                    src="/images/PasswordIcon.png"
                    alt="Password Icon"
                    width={30}
                    height={30}
                    className="absolute inset-y-1 left-3 flex items-center 
                    pointer-events-none"
                />
                <input 
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-full border border-gray-700 px-5 py-3
                    text-md text-gray-500 focus:outline-none focus:ring-2 font-inter
                    focus:ring-blue-800 pl-12"
                />
            </div>

            <div>
                <p className="text-sm font-inter text-gray-500">
                    Password must contain 8 characters, and at least one special character
                </p>
            </div>

            <div className="relative flex space-x-3 mt-5">
                <Image
                    src="/images/PasswordIcon.png"
                    alt="Password Icon"
                    width={30}
                    height={30}
                    className="absolute inset-y-1 left-3 flex items-center 
                    pointer-events-none"
                />

                <input
                    type="password"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    placeholder="Confirm Password"
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    className="w-full rounded-full border border-gray-700 px-5 py-3
                    text-md text-gray-500 focus:outline-none focus:ring-2 font-inter
                    focus:ring-blue-800 pl-12"
                />
            </div>

            <button 
                type="button"
                onClick={handleSignUp}
                className="
                w-full bg-[#002A84] hover:bg-blue-600 
                text-white font-bold py-2 px-4 rounded-full 
                shadow-md hover:bg-blue-900 transition duration-300 mt-5"
            >
                Create Account
            </button>
        </form>
    );
}

        