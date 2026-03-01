import Link from 'next/link';

export default function SimpleHeader({ showSignUpLink = true }: { showSignUpLink?: boolean }) {
  return (
    // 'absolute top-0' pins it to the ceiling of the page
    <header className="w-full flex flex-col sm:flex-row justify-between items-center p-6 sm:p-10 absolute top-0 left-0 right-0">
      
      {/* LEFT SIDE: Brand Logo */}
      <div className="text-2xl font-bold text-blue-900 italic mb-4 sm:mb-0">
        Orlando Energy <span className="text-green-700 not-italic">ONE</span>
      </div>

      {/* RIGHT SIDE: Conditional Sign Up Link */}
      {showSignUpLink && (
        <div className="text-sm font-medium">
          Don't have an account?{' '}
          <Link href="/signup" className="text-blue-900 font-bold hover:underline">
            Sign Up Now
          </Link>
        </div>
      )}
      
    </header>
  );
}