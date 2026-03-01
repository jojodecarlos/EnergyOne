import SimpleHeader from '@/components/SimpleHeader';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    // 'min-h-screen relative' creates the full-page canvas for the absolute header
    // 'flex flex-col justify-center items-center' pushes everything to the exact middle
    <main className="min-h-screen bg-white relative flex flex-col justify-center items-center p-4">
      
      {/* 1. The Top Navigation */}
      <SimpleHeader showSignUpLink={true} />
      
      {/* 2. The Centered Form Container */}
      <div className="w-full max-w-md flex flex-col items-center text-center mt-16 sm:mt-0">
        
        <ForgotPasswordForm />
        
      </div>

    </main>
  );
}