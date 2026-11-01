'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const searchTerm = search.trim();

    if (!searchTerm) return;

    router.push(`/products?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/70 via-white to-white px-4 py-12 sm:py-16">
      {/* Subtle decorative accents */}
      <div className="pointer-events-none absolute -top-20 left-1/2 h-48 w-80 -translate-x-1/2 rounded-full bg-teal-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <span className="mb-4 inline-flex items-center rounded-full border border-teal-100 bg-white px-3 py-1 text-xs font-semibold tracking-wide text-teal-700 shadow-sm">
            Welcome to TechNest
          </span>

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Find your next
            <span className="block text-teal-600">tech essential.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-gray-500 sm:text-base">
            Discover the gadgets and accessories you need, all in one place.
          </p>
        </div>

        {/* Search */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-2xl items-center gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg shadow-gray-200/60 transition-all duration-300 focus-within:border-teal-300 focus-within:ring-4 focus-within:ring-teal-500/10"
        >
          <FaSearch className="ml-3 shrink-0 text-lg text-teal-600" />

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search laptops, phones, accessories..."
            aria-label="Search products"
            className="h-12 min-w-0 flex-1 bg-transparent px-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 sm:text-base"
          />

          <button
            type="submit"
            disabled={!search.trim()}
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50 sm:px-6"
          >
            <span>Search</span>
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-400">
          Your next favorite gadget is just a search away.
        </p>
      </div>
    </section>
  );
}
