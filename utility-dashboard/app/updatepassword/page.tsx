import SimpleHeader from '@/components/SimpleHeader';
import UpdatePasswordForm from '@/components/UpdatePasswordForm';

export default function UpdatePasswordPage() {
  return (
    <main className="min-h-screen bg-white relative flex flex-col justify-center items-center p-4">
      
      <SimpleHeader showSignUpLink={false} />
      
      <div className="w-full max-w-md flex flex-col items-center text-center mt-16 sm:mt-0">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Reset Your Password
        </h2>
        <p className="text-gray-500 mb-8">
          Please enter your new password below.
        </p>

        <UpdatePasswordForm />
      </div>

    </main>
  );
}