// app/login/LoginPageClient.tsx (Client Component)
'use client';

import { useSearchParams } from 'next/navigation';
import LoginForm from '../../../components/LoginForm';
import SocialLoginButtons from '../../../components/SocialLoginButtons';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function LoginPageClient() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <div className="flex flex-col items-center bg-gray-50 ">
      <div className="p-2 self-start bg-blue-700 text-white w-full">
        <Link href="/" className="flex flex-row gap-1 items-center mb-5">
          <FaArrowLeft size={20} />
          <p className="underline">Back</p>
        </Link>
        <p className="font-bold text-xl">Sign in to your Account</p>
      </div>

      <LoginForm callbackUrl={callbackUrl} />

      <p className="mt-4 text-gray-600">Or continue with</p>
      <SocialLoginButtons callbackUrl={callbackUrl} />
    </div>
  );
}
