// src/components/Reviews.js
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Reviews({ currentUser, token }) {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  // Yeni yorum formu state’leri
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [postError, setPostError] = useState(null);
  const [isPosting, setIsPosting] = useState(false);

  // 1) Yorumları GET’le
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/feedback");
        setReviews(res.data);
      } catch (err) {
        console.error("Reviews çekilirken hata:", err);
        setError("Couldn't load reviews.");
      }
    };
    fetchReviews();
  }, []);

  // 2) Yeni yorum POST fonksiyonu
  const handlePostReview = async (e) => {
    e.preventDefault();
    setPostError(null);

    if (!currentUser) {
      setPostError("You must be logged in to post a review.");
      return;
    }
    if (!newComment.trim()) {
      setPostError("Please enter a comment.");
      return;
    }
    if (newRating < 1 || newRating > 5) {
      setPostError("Rating must be between 1 and 5.");
      return;
    }

    setIsPosting(true);
    try {
      const payload = {
        username: currentUser.fullName,
        rating: newRating,
        comment: newComment.trim(),
      };
      const response = await axios.post(
        "http://localhost:5001/api/feedback",
        payload
      );
      const added = response.data;
      setReviews((prev) => [added, ...prev]);
      setNewRating(5);
      setNewComment("");
    } catch (err) {
      console.error("Review POST hatası:", err.response || err);
      setPostError("Failed to post review.");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <section id="reviews" className="py-20 bg-[#f0f9f0]">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-green-700 mb-4">Reviews</h2>
        <div className="w-24 h-1 bg-green-700 mx-auto mb-12"></div>

        {/* Eğer login değilse mesaj */}
        {!currentUser && (
          <p className="text-gray-600 mb-6">
            Please log in to leave a review or scroll down to see existing feedback.
          </p>
        )}

        {/* Eğer login ise form göster */}
        {currentUser && (
          <form
            onSubmit={handlePostReview}
            className="mb-10 bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto"
          >
            <h3 className="text-xl font-semibold text-green-700 mb-4">
              Leave a Review
            </h3>

            <div className="mb-4 text-left">
              <label className="block text-gray-700 mb-1">Your Rating (1–5)</label>
              <select
                value={newRating}
                onChange={(e) => setNewRating(Number(e.target.value))}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4 text-left">
              <label className="block text-gray-700 mb-1">Your Comment</label>
              <textarea
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 resize-none"
              />
            </div>

            {postError && (
              <p className="text-red-500 text-sm mb-2">{postError}</p>
            )}

            <button
              type="submit"
              disabled={isPosting}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow disabled:opacity-50"
            >
              {isPosting ? "Posting…" : "Post Review"}
            </button>
          </form>
        )}

        {/* Yorum Listesi veya “Henüz yorum yok” */}
        {error && (
          <div className="bg-white rounded-lg shadow-lg py-4 px-6 mb-8">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!error && reviews.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-3xl shadow-lg p-6 flex flex-col"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-700 font-semibold">
                      {rev.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-green-800">
                      {rev.username}
                    </h3>
                    <p className="text-green-600 font-medium">
                      Rating: {rev.rating} / 5
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 flex-grow">{rev.comment}</p>
              </div>
            ))}
          </div>
        )}

        {!error && reviews.length === 0 && (
          <p className="text-gray-600">
            Henüz hiç yorum yok. İlk yorumu sen yazmak ister misin?
          </p>
        )}
      </div>
    </section>
  );
}
