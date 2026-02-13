'use client';

import { useState } from 'react';

export default function ProductTabs({ tabs }) {
  const [activeIndex, setActiveIndex] = useState(0); // Active tab

  return (
    <div className="mt-6">
      {/* Tab Buttons */}
      <div className="flex border-b border-gray-300">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 font-medium -mb-px ${
              index === activeIndex
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className="mt-4">{tabs[activeIndex].component}</div>
    </div>
  );
}
