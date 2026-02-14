import { Suspense } from 'react';
import LoginPageClient from './LoginPageClient';

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center bg-gray-50">
          <div className="p-2 self-start bg-blue-700 text-white w-full">
            <div className="flex flex-row gap-1 items-center mb-5">
              <div className="w-5 h-5" /> {/* Placeholder for arrow */}
              <p className="underline">Back</p>
            </div>
            <p className="font-bold text-xl">Sign in to your Account</p>
          </div>
          <div className="mt-8">Loading...</div>
        </div>
      }
    >
      <LoginPageClient />
    </Suspense>
  );
}
