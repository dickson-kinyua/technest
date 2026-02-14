'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  // Debounce logic
  useEffect(() => {
    const cleanedSearch = search.trim();

    const timer = setTimeout(() => {
      if (!cleanedSearch) {
        return; // Don't navigate if search is empty
      } else {
        router.push(`/products?search=${encodeURIComponent(cleanedSearch)}`);
      }
    }, 2000); // 2 seconds

    // Cleanup function
    return () => clearTimeout(timer);
  }, [router, search]);

  return (
    <input
      type="text"
      placeholder="I am looking for..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border border-gray-300   px-3 py-2 w-full block rounded-xl"
    />
  );
}
