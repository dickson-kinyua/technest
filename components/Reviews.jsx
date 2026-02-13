'use client';
import { useEffect, useState } from 'react';
import LeaveReviewForm from './LeaveReviewForm';

export default function Reviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); // toggle form

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/reviews?productId=${productId}`);
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  // Callback to refresh reviews after submitting
  const handleReviewAdded = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
    setShowForm(false); // hide form after submission
  };

  return (
    <div className="space-y-4">
      {/* Leave Review Button */}
      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {showForm ? 'Cancel' : 'Leave a Review'}
      </button>

      {/* Review Form */}
      {showForm && (
        <LeaveReviewForm
          productId={productId}
          onReviewAdded={handleReviewAdded}
        />
      )}

      {/* Loading / Empty State */}
      {loading && <p>Loading reviews...</p>}
      {!loading && reviews.length === 0 && <p>No reviews yet. Be the first!</p>}

      {/* Reviews List */}
      {reviews.map((r) => (
        <div key={r._id} className="border p-3 rounded bg-white">
          <div className="flex justify-between items-center mb-1">
            <span className="font-semibold">{r.user?.name || 'Anonymous'}</span>
            <span className="text-amber-400">{'★'.repeat(r.rating)}</span>
          </div>
          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  );
}
