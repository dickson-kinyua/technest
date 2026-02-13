'use client';

import RegisterForm from '../../../components/RegisterForm';
import SocialLoginButtons from '../../../components/SocialLoginButtons';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen">
      <div className="p-2 self-start bg-blue-700 text-white w-full">
        <Link href="/" className="flex flex-row gap-1 items-center mb-5">
          <FaArrowLeft size={20} />
          <p className="underline">Back</p>
        </Link>
        <p className="font-bold text-xl">Create Your Account</p>
      </div>

      <RegisterForm />

      <p className="mt-4 text-gray-600">Or continue with</p>
      <SocialLoginButtons />
    </div>
  );
}
