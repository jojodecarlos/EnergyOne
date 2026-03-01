import BrandHeader from '@/components/BrandHeader';
import HeroImage from '@/components/HeroImage';
import SignUpForm from '@/components/SignUpForm';

export default function SignUpPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      
      {/* LEFT COLUMN: White background, centers everything inside it */}
      <div className="flex flex-col justify-center items-center bg-white p-8 sm:p-12">
        {/* Inner container to keep the form from getting too wide */}
        <div className="w-full max-w-md flex flex-col items-center space-y-8">
          
          <BrandHeader />
          
          <SignUpForm />

        </div>
      </div>

      {/* RIGHT COLUMN: Hidden on small screens, takes up right half on desktop */}
      <div className="hidden md:block relative bg-blue-900">
        
        <HeroImage />

      </div>
      
    </main>
  );
}