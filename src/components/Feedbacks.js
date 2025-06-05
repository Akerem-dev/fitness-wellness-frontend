import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

export default function Reviews({ currentUser }) {
  const [reviews, setReviews] = useState([])
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const listRef = useRef(null)

  useEffect(() => {
    axios.get('/api/feedbacks')
      .then(res => {
        console.log('GET /api/feedbacks →', res.data)
        setReviews(res.data)
      })
      .catch(() => setError('Yorumlar yüklenemedi.'))
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)
    if (!currentUser) {
      setError('Lütfen giriş yapın.')
      return
    }
    if (!rating || !message.trim()) {
      setError('Yıldız ve yorum gerekiyor.')
      return
    }

    setSubmitting(true)
    try {
      const res = await axios.post('/api/feedbacks', {
        userId: currentUser.id,
        rating,
        message
      })
      console.log('POST /api/feedbacks →', res.data)
      setReviews(prev => [res.data, ...prev])
      setMessage('')
      setRating(0)
      setHover(0)
      listRef.current?.scrollIntoView({ behavior: 'smooth' })
    } catch {
      setError('Gönderirken hata oldu.')
    } finally {
      setSubmitting(false)
    }
  }

  const StarIcon = ({ filled, ...props }) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.538 1.118l-3.388-2.462a1 1 0 00-1.176 0l-3.388 2.462c-.783.57-1.838-.197-1.538-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.047 9.393c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.966z" />
    </svg>
  )

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mb-16">
      <h2 className="text-3xl font-bold text-green-600 text-center mb-4">Reviews</h2>

      {currentUser ? (
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map(n => (
              <StarIcon
                key={n}
                filled={(hover || rating) >= n}
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(n)}
                className="w-6 h-6 cursor-pointer text-yellow-400"
              />
            ))}
          </div>
          <textarea
            rows="3"
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Yorumunu yaz..."
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {submitting ? 'Gönderiliyor...' : 'Gönder'}
          </button>
        </form>
      ) : (
        <p className="text-center text-gray-600 mb-8">Yorum bırakmak için giriş yapın.</p>
      )}

      <div ref={listRef} className="space-y-6 max-h-[400px] overflow-y-auto">
        {reviews.map(r => (
          <div key={r.id} className="border-b pb-4">
            <div className="flex items-center mb-1">
              <span className="font-semibold mr-2">{r.full_name}</span>
              <span className="flex">
                {[1, 2, 3, 4, 5].map(i => (
                  <StarIcon
                    key={i}
                    filled={r.rating >= i}
                    className={`w-5 h-5 mr-1 ${r.rating >= i ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </span>
            </div>
            <p className="text-gray-700 mb-1">{r.message}</p>
            <p className="text-sm text-gray-500">
              {new Date(r.created_at).toLocaleDateString('tr-TR')}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
