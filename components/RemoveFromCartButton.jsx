'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function RemoveFromCartButton({ productId, slug }) {
  const session = useSession();
  const router = useRouter();
  //   console.log(productId);
  // console.log(session.data?.user?.email);
  const removeFromCart = async () => {
    if (!session.data?.user) {
      router.push(`/login?callbackUrl=/products/${slug}`);
      return;
    }
    const res = await fetch('/api/cart/remove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId }),
    });

    if (!res.ok) {
      toast.error('Failed to remove from cart');
      return;
    }
    toast.success('Removed from cart');
  };

  return (
    <button
      onClick={removeFromCart}
      className=" mt-2 text-red-700 px-4 py-2 rounded"
    >
      Remove
    </button>
  );
}
