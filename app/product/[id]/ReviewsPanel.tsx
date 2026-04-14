"use client";

import { FormEvent, useEffect, useState } from "react";
import { Star } from "lucide-react";
import { productService } from "@/app/lib/apiClient";
import { useAuth } from "@/app/store/authStore";

interface ReviewsPanelProps {
  productId: string;
  initialRating: number;
  initialCount: number;
}

export default function ReviewsPanel({
  productId,
  initialRating,
  initialCount,
}: ReviewsPanelProps) {
  const { isLoggedIn } = useAuth();
  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState(initialRating || 0);
  const [count, setCount] = useState(initialCount || 0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [selectedRating, setSelectedRating] = useState(5);
  const [error, setError] = useState("");

  const fetchReviews = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await productService.getReviews(productId);
      setReviews(Array.isArray(response?.reviews) ? response.reviews : []);
      setRating(Number(response?.ratings || 0));
      setCount(Number(response?.numOfReviews || 0));
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const submitReview = async (event: FormEvent) => {
    event.preventDefault();
    if (!isLoggedIn) {
      setError("Please login to submit a review.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const response = await productService.addReview(productId, {
        rating: selectedRating,
        comment: reviewText.trim(),
      });

      setReviews(Array.isArray(response?.reviews) ? response.reviews : []);
      setRating(Number(response?.ratings || 0));
      setCount(Number(response?.numOfReviews || 0));
      setReviewText("");
      setSelectedRating(5);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Reviews</h2>
        <div className="text-sm font-bold text-slate-600 dark:text-slate-300">
          {rating.toFixed(1)} / 5 ({count})
        </div>
      </div>

      <form onSubmit={submitReview} className="mb-8 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-3">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setSelectedRating(value)}
              className="text-amber-400"
              aria-label={`Set rating ${value}`}
            >
              <Star size={18} className={value <= selectedRating ? "fill-amber-400" : ""} />
            </button>
          ))}
        </div>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full min-h-[90px] rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 text-sm outline-none"
          placeholder="Write your review..."
          maxLength={500}
        />
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            {isLoggedIn ? "Your review updates if it already exists." : "Login required to review."}
          </p>
          <button
            type="submit"
            disabled={submitting || !reviewText.trim()}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-bold disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </form>

      {error ? <p className="text-sm text-rose-500 mb-4">{error}</p> : null}

      {loading ? (
        <p className="text-sm text-slate-500">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-slate-500">No reviews yet.</p>
      ) : (
        <div className="space-y-3">
          {reviews.map((review, index) => (
            <div
              key={`${review?.user || "review"}-${index}`}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40"
            >
              <div className="flex items-center justify-between mb-1">
                <p className="font-bold text-slate-900 dark:text-white">{review?.name || "Customer"}</p>
                <span className="text-xs text-slate-500">{new Date(review?.createdAt || Date.now()).toLocaleDateString()}</span>
              </div>
              <div className="text-amber-400 text-sm mb-2">
                {"★".repeat(Math.max(1, Number(review?.rating || 0)))}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">{review?.comment || "No comment provided."}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

