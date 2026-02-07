'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import LoginForm from '../../../components/LoginForm';
import SocialLoginButtons from '../../../components/SocialLoginButtons';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen">
      <div className="p-2 self-start bg-blue-700 text-white w-full">
        <Link href="/" className="flex flex-row gap-1 items-center mb-5">
          <FaArrowLeft size={20} />
          <p className="underline">back</p>
        </Link>
        <p className="font-bold text-xl">
          Sign in to your <br /> Account
        </p>
      </div>

      {/* LoginForm handles routing itself after login */}
      <LoginForm />

      <p className="mt-4 text-gray-600">Or continue with</p>
      <SocialLoginButtons />

      <div className="flex flex-row gap-0.5 mt-14">
        <p>Don't have an account? </p>
        <Link href="/register" className="underline">
          Register
        </Link>
      </div>
    </div>
  );
}
