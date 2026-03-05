"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordSuccess() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") ?? "";

  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    if (!email) {
      alert("No email found to resend to. Go back and enter your email again.");
      router.push("/forgotpw");
      return;
    }

    try {
      setLoading(true);

    
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim());
      if (error) throw error;

      alert("If the account exists, a reset link has been sent again.");
    } catch (err: any) {
      alert(err?.message ?? "Could not resend reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full flex items-center justify-center py-24">
      <div className="w-full max-w-[900px] flex flex-col items-center text-center px-6">
        <div className="mb-6">
          <MailCheckIcon className="w-28 h-28" />
        </div>

        <h1 className="text-4xl font-semibold text-neutral-800 mb-3">
          Check your email!
        </h1>

        <p className="max-w-[760px] text-neutral-500 mb-10">
          Thanks! If you have an account with us, an email will be sent to your inbox.
          Follow the instructions in the email to reset your password. If you do not
          receive the email, please contact support@one.com
        </p>

        <button
          onClick={handleResend}
          disabled={loading}
          className="w-full max-w-[600px] rounded-full bg-[#0B2E83] py-4 text-white text-lg font-semibold shadow-lg disabled:opacity-60"
        >
          {loading ? "Resending..." : "Resend Email"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/login")}
          className="mt-7 text-sm text-neutral-800 hover:underline"
        >
          Back to Login
        </button>
      </div>
    </main>
  );
}

function MailCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M24 40c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v52c0 6.6-5.4 12-12 12H36c-6.6 0-12-5.4-12-12V40Z"
        stroke="#140000"
        strokeWidth="10"
        strokeLinejoin="round"
      />
      <path
        d="M28 44l36 26 36-26"
        stroke="#140000"
        strokeWidth="10"
        strokeLinejoin="round"
      />
      <path
        d="M78 88l10 10 18-22"
        stroke="#140000"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}