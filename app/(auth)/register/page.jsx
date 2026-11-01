'use client';

import { FaLeftLong } from 'react-icons/fa6';
import RegisterForm from '../../../components/RegisterForm';
import SocialLoginButtons from '../../../components/SocialLoginButtons';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function RegisterPage() {
  return (
    <div className="min-h-screen  flex  justify-center p-4">
      <div className="w-full max-w-md bg-white flex flex-col space-y-4">
        <div className="p-4 rounded-t-xl">
          <Link className="sm:hidden" href={'/'}>
            <FaLeftLong />
          </Link>
          <div className="p-6  text-center">
            <p className="font-bold text-xl">Welcome to Technest</p>
            <p className="mt-3">Use your email to sign up</p>
          </div>
        </div>

        <div className="px-6">
          <RegisterForm />

          <p className="mt-6 text-center text-gray-600">Or continue with</p>

          <SocialLoginButtons />
        </div>
        <div className="text-center text-sm">
          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Log in
            </Link>
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
