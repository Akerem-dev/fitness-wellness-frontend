import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [userId, setUserId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    axios.get('http://localhost:5001/api/bookings')
      .then(res => setBookings(res.data))
      .catch(err => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5001/api/bookings', {
      user_id: parseInt(userId),
      service_id: parseInt(serviceId),
      booking_date: bookingDate,
      status
    })
      .then(() => {
        setUserId('');
        setServiceId('');
        setBookingDate('');
        setStatus('');
        fetchBookings();
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-4xl font-bold mb-6 text-green-600 text-center">Rezervasyonlar</h2>

      <ul className="divide-y divide-gray-200 mb-8">
        {bookings.map(booking => (
          <li key={booking.id} className="py-3 flex justify-between items-center">
            <span className="text-lg font-medium">Kullanıcı ID: {booking.user_id}</span>
            <span className="text-gray-600">
              Hizmet ID: {booking.service_id}, Tarih: {booking.booking_date}, Durum: {booking.status}
            </span>
          </li>
        ))}
      </ul>

      <h3 className="text-2xl font-semibold mb-4 text-gray-700">Yeni Rezervasyon Ekle</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="User ID"
          type="number"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          required
        />
        <input
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Service ID"
          type="number"
          value={serviceId}
          onChange={e => setServiceId(e.target.value)}
          required
        />
        <input
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Rezervasyon Tarihi"
          type="datetime-local"
          value={bookingDate}
          onChange={e => setBookingDate(e.target.value)}
          required
        />
        <input
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Durum"
          value={status}
          onChange={e => setStatus(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
        >
          Ekle
        </button>
      </form>
    </div>
  );
}

export default Bookings;
