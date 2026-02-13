'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

export default function LeaveReviewForm({ productId, onReviewAdded }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return toast.error('Comment cannot be empty');

    setLoading(true);

    try {
      const res = await fetch('/api/reviews/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, rating, comment }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add review');

      toast.success('Review added!');
      setComment('');
      setRating(5);

      if (onReviewAdded) onReviewAdded(data); // optional callback to refresh review list
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 border p-4 rounded bg-gray-50"
    >
      <h3 className="text-lg font-semibold mb-2">Leave a Review</h3>

      <div className="mb-2">
        <label className="block mb-1">Rating:</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border px-2 py-1 rounded"
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} Star{n > 1 ? 's' : ''}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label className="block mb-1">Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border px-2 py-1 rounded"
          rows={4}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
