'use client';

import { toast } from 'react-toastify';

export default function AddToCartButton({ productId }) {
  const addToCart = async () => {
    const res = await fetch('/api/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId }),
    });

    if (!res.ok) {
      toast.error('Failed to add to cart');
      return;
    }
    toast.success('Added to cart');
  };

  return (
    <button
      onClick={addToCart}
      className="bg-blue-700 mt-2 text-white px-4 py-2 rounded"
    >
      Add to Cart
    </button>
  );
}
