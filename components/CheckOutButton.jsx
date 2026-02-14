'use client';

import { useState } from 'react';

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const res = await fetch('/api/checkout', {
        method: 'POST',
      });

      const data = await res.json();
      console.log('Checkout response:', data.url);

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-3 px-4 rounded-md transition duration-200 mb-4"
    >
      {loading ? 'Redirecting...' : 'Proceed to Checkout'}
    </button>
  );
}
