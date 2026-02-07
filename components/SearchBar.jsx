'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

export default function SearchBar({ onResults }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(
        `/api/products/search?search=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      onResults(data.products || []);
    } catch (err) {
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="fixed top-0 m-1 z-50 flex flex-row justify-between bg-white rounded-3xl"
    >
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-l-lg  focus:outline-none focus:ring focus:border-blue-500 truncate"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-900 text-white rounded-r-lg hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? '...' : 'Search'}
      </button>
    </form>
  );
}
