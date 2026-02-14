'use client';

import { signIn } from 'next-auth/react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function SocialLoginButtons({ callbackUrl = '/' }) {
  const router = useRouter();

  const handleSocialLogin = async (provider) => {
    try {
      console.log(
        `Signing in with ${provider}, redirecting to: ${callbackUrl}`
      );

      const result = await signIn(provider, {
        redirect: false,
        callbackUrl: callbackUrl,
      });

      console.log('SignIn result:', result);

      if (result?.error) {
        toast.error(result.error || 'Login failed');
      } else if (result?.ok) {
        toast.success(`Logged in with ${provider}`);
        // Force a hard refresh to update session
        router.push(callbackUrl);
        router.refresh(); // Refresh server components
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={() => handleSocialLogin('google')}
        className="px-4 flex flex-row gap-1 items-center py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        <FaGoogle />
        Google
      </button>

      <button
        onClick={() => handleSocialLogin('github')}
        className="px-4 flex flex-row gap-1 items-center py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
      >
        <FaGithub />
        GitHub
      </button>
    </div>
  );
}
