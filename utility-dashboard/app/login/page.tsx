import LoginForm from '@/components/LoginForm';
import BrandHeader from '@/components/BrandHeader';
import HeroImage from '@/components/HeroImage';

export default function LoginPage() {
  return (
    // The main container: Full screen height, split into 1 column on mobile, 2 on desktop
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      
      {/* LEFT COLUMN: White background, centers everything inside it */}
      <div className="flex flex-col justify-center items-center bg-white p-12 sm:p-30">
        {/* Inner container to keep the form from getting too wide */}
        <div className="w-full max-w-md flex flex-col items-center space-y-10">
          
          {/* SLOT 1: Developer 3's Brand Header goes here */}
          <BrandHeader />
          
         {/* SLOT 2: Developer 2's Login Form goes here <LoginForm /> */}
          <LoginForm />
        </div>
      </div>

      {/* RIGHT COLUMN: Hidden on small screens, takes up right half on desktop */}
<div className="hidden md:block relative 900">
  {/* SLOT 3: Developer 3's Orlando Skyline Image goes here */}
  <HeroImage />
</div>
      
    </main>
  );
}