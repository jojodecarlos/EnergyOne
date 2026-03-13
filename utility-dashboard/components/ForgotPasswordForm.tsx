"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      setLoading(true);

    
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      
        redirectTo: `${window.location.origin}/reset-password`,
      });

      
      if (error) throw error;

      router.push(`/forgotpw/confirmation?email=${encodeURIComponent(email.trim())}`);
    } catch (err: any) {
      alert(err?.message ?? "Something went wrong sending the reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full flex items-center justify-center py-24">
      <div className="w-full max-w-[860px] flex flex-col items-center text-center px-6">
        {/* Big icon */}
        <div className="mb-6">
          <MailSpeedIcon className="w-28 h-28" />
        </div>

        <h1 className="text-4xl font-semibold text-neutral-800 mb-2">
          Forgot your password?
        </h1>

        <p className="text-neutral-500 mb-10">
          Enter your email to receive a password reset link.
        </p>

        {/* Input */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <div className="w-full max-w-[560px]">
            <div className="flex items-center gap-3 rounded-full border border-neutral-300 bg-white px-5 py-3 shadow-sm">
              <EnvelopeIcon className="w-6 h-6 text-neutral-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full outline-none text-neutral-700 placeholder:text-neutral-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full max-w-[560px] rounded-full bg-[#0B2E83] py-4 text-white text-lg font-semibold shadow-lg disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Email"}
          </button>
        </form>

        {/* Back to login */}
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="mt-7 text-sm text-neutral-700 hover:underline"
        >
          Back to Login
        </button>
      </div>
    </main>
  );
}

function MailSpeedIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M18 52h18M18 36h28M18 68h10"
        stroke="#140000"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M44 44c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v52c0 6.6-5.4 12-12 12H56c-6.6 0-12-5.4-12-12V44Z"
        stroke="#140000"
        strokeWidth="10"
        strokeLinejoin="round"
      />
      <path
        d="M48 48l36 26 36-26"
        stroke="#140000"
        strokeWidth="10"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EnvelopeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5.5 7.5 12 12.2l6.5-4.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}