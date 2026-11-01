'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Input from './ui/Input';

export default function LoginForm({ callbackUrl = '/' }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
        toast.error(result.error);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred');
      toast.error('An unexpected error occurred');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mt-3 space-y-4">
      {error && <div className="text-red-600">{error}</div>}
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={loading || !email || !password}
        className="w-full py-2.5 rounded-lg 
           bg-teal-500 text-white font-semibold 
           shadow-sm 
           hover:bg-teal-600 hover:shadow-md 
           focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 
           transition-all duration-200 
           disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}
