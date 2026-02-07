// Using NextAuth redirect
'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';

export default function LogoutButton({ className = '' }) {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut({
        callbackUrl: '/', // Redirect to homepage after logout
        redirect: true, // Allow NextAuth to handle redirect
      });
    } catch (error) {
      console.error('Logout error:', error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`${className} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
}
