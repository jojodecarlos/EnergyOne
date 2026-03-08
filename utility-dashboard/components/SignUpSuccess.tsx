import Link from 'next/link';

export default function SignUpSuccess() {
  return (
    <div className="flex flex-col items-center text-center w-full max-w-md">
      
      <svg 
        className="w-32 h-32 text-green-600 mb-6" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={3} 
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>

      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Thank you!
      </h2>
      <div className="text-gray-500 italic mb-10 space-y-1">
        <p>Welcome to Orlando Energy ONE.</p>
        <p>Your account has been successfully created.</p>
      </div>

      <Link 
        href="/login" 
        className="text-sm font-bold text-gray-900 hover:underline"
      >
        Back to Login
      </Link>
      
    </div>
  );
}