'use client';

import { useState } from 'react';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    // Ensure an image is selected
    if (!data.get('image')) {
      alert('Please select an image');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        body: data,
        cache: 'no-store',
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to upload product');
      }

      alert('✅ Product uploaded successfully!');
      form.reset();
    } catch (err) {
      console.error('Upload error:', err);
      alert('❌ Upload failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl p-6 space-y-5 max-w-md mx-auto shadow-md"
    >
      {/* Title Field */}
      <div>
        <div className="flex justify-between mb-1">
          <label className="text-sm font-medium text-gray-700">
            Product Title
          </label>
          <span className="text-xs text-red-500">Required</span>
        </div>
        <input
          name="title"
          placeholder="Enter a descriptive title"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition peer"
        />
        <p className="mt-1 text-xs text-gray-500 peer-focus:text-blue-600">
          Make it catchy and descriptive
        </p>
      </div>
      {/* Description Field */}
      <div>
        <div className="flex justify-between mb-1">
          <label className="text-sm font-medium text-gray-700">
            Product Description
          </label>
          <span className="text-xs text-red-500">Required</span>
        </div>
        <textarea
          name="description"
          placeholder="Enter a detailed description"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition peer"
        />
      </div>

      {/* Price and Stock */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price ($)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              name="price"
              type="number"
              step="0.01"
              min="0"
              required
              className="pl-7 pr-3 py-3 w-full border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock
          </label>
          <div className="relative">
            <input
              name="stock"
              type="number"
              min="0"
              className="pr-7 pl-3 py-3 w-full border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              placeholder="0"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">units</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <div className="relative">
          <select
            name="category"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition bg-white"
          >
            <option value="">Select Brand</option>
            <option value="apple">Apple</option>
            <option value="samsung">Samsung</option>
            <option value="dell">Dell</option>
            <option value="hp">HP</option>
            <option value="lenovo">Lenovo</option>
            <option value="logitech">Logitech</option>
            <option value="sony">Sony</option>
            <option value="microsoft">Microsoft</option>
            <option value="google">Google</option>
            <option value="xiaomi">Xiaomi</option>
            <option value="oneplus">OnePlus</option>
            <option value="other">Other</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Image
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition group">
          <input
            name="image"
            type="file"
            accept="image/*"
            required
            className="hidden"
            id="image-upload"
            onChange={(e) => {
              if (e.target.files[0]) {
                console.log('Selected file:', e.target.files[0].name);
              }
            }}
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="space-y-2">
              <div className="mx-auto w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-blue-600">
                    Click to upload
                  </span>{' '}
                  or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  SVG, PNG, JPG or GIF
                </p>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
          } text-white font-semibold py-3.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 active:scale-95`}
        >
          <div className="flex items-center justify-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            {loading ? 'Uploading...' : 'Save Product'}
          </div>
        </button>
      </div>
    </form>
  );
}
