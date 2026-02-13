'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function AddToCartButton({ productId, slug }) {
  const session = useSession();
  const router = useRouter();
  // console.log(session.data?.user?.email);
  const addToCart = async () => {
    if (!session.data?.user) {
      router.push(`/login?callbackUrl=/products/${slug}`);
      return;
    }
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
