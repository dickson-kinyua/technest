'use client';

import SearchBar from './SearchBar';

export default function SearchBarWrapper() {
  const handleResults = (results) => {
    console.log('Search results:', results);
  };

  return <SearchBar onResults={handleResults} />;
}
