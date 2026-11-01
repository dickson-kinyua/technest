'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Input from './ui/Input';

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed');
        toast.error(data.message || 'Registration failed');
        setLoading(false);
        return;
      }

      // Auto login after registration
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        toast.error(result.error);
      } else {
        router.push('/');
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
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 px-3">
      {error && <div className="text-red-600">{error}</div>}

      <Input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full px-4 py-2.5 rounded-lg 
           border border-gray-200 
           shadow-sm 
           focus:outline-none focus:ring-2 focus:ring-blue-500 
           transition"
      />
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-2.5 rounded-lg 
           border border-gray-200 
           shadow-sm 
           focus:outline-none focus:ring-2 focus:ring-blue-500 
           transition"
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 
           shadow-sm 
           focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 
           shadow-sm 
           focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <button
        type="submit"
        disabled={
          loading ||
          !formData.name ||
          !formData.email ||
          !formData.password ||
          !formData.confirmPassword
        }
        className="w-full py-2.5 rounded-lg 
           bg-teal-500 text-white font-semibold 
           shadow-sm 
           hover:bg-teal-600 hover:shadow-md 
           focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 
           transition-all duration-200 
           disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Creating account...' : 'Create Account'}
      </button>
    </form>
  );
}
