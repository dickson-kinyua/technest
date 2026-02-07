'use client';

import { useRouter } from 'next/navigation';
import SocialLoginButtons from '../../../components/SocialLoginButtons';
import RegisterForm from '../../../components/RegisterForm';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center bg-gray-50">
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
      <RegisterForm onRegister={() => router.push('/')} />

      <p className="mt-4 text-gray-600">Or continue with</p>

      <SocialLoginButtons />
    </div>
  );
}
