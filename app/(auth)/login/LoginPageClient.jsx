'use client';

import { useSearchParams } from 'next/navigation';
import LoginForm from '../../../components/LoginForm';
import SocialLoginButtons from '../../../components/SocialLoginButtons';
import Link from 'next/link';
import { FaLeftLong } from 'react-icons/fa6';

export default function LoginPageClient() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <div className="min-h-screen  flex  justify-center p-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white  flex flex-col gap-5">
        {/* Header */}
        <Link className="sm:hidden" href={'/'}>
          <FaLeftLong />
        </Link>
        <div className="p-6  text-center">
          <p className="font-bold text-xl">Welcome to Technest</p>
          <p className="mt-3">Use your email to log in or sign up</p>
        </div>

        {/* Form & Social Login */}
        <div className="p-6 flex flex-col space-y-4">
          <LoginForm callbackUrl={callbackUrl} />

          <p className="text-center text-gray-600">Or continue with</p>

          <SocialLoginButtons callbackUrl={callbackUrl} />
        </div>
        <div className="text-center text-sm">
          <p className="text-center text-gray-600">
            Don't have an account? <Link href="/register">Sign up</Link>
          </p>
          <p className="text-[10px] mt-2">
            By continuing you agree to Technest <br />
            <span className="underline text-red-600">Terms and Conditions</span>
          </p>
        </div>
      </div>
    </div>
  );
}
