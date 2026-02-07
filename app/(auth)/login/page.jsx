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
    <div className=" flex flex-col  items-center bg-gray-50">
      <div className="p-2 self-start items-center justify-center bg-blue-700 text-white w-full">
        <Link href="/" className="w-full sticky top-0 flex flex-row gap-1 mb-5">
          <FaArrowLeft size={20} />
          <p className="underline">back</p>
        </Link>
        <div>
          <p className="font-bold text-xl">
            Sign in to your <br /> Account
          </p>
        </div>
      </div>
      <LoginForm onLogin={() => router.push(callbackUrl)} />

      <p className="mt-4 text-gray-600">Or continue with</p>

      <SocialLoginButtons />
      <div className="flex flex-row gap-0.5 mt-14">
        <p>Don't have an account? </p>
        <a href="/register" className="underline">
          Register
        </a>
      </div>
    </div>
  );
}
