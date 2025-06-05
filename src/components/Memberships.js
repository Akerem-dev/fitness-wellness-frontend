import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Memberships() {
  const [memberships, setMemberships] = useState([]);
  const [userId, setUserId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = () => {
    axios.get('http://localhost:5001/api/memberships')
      .then(res => setMemberships(res.data))
      .catch(err => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5001/api/memberships', {
      user_id: parseInt(userId),
      start_date: startDate,
      end_date: endDate,
      status
    })
      .then(() => {
        setUserId('');
        setStartDate('');
        setEndDate('');
        setStatus('');
        fetchMemberships();
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-4xl font-bold mb-6 text-green-600 text-center">Üyelikler</h2>

      <ul className="divide-y divide-gray-200 mb-8">
        {memberships.map(membership => (
          <li key={membership.id} className="py-3 flex justify-between items-center">
            <span className="text-lg font-medium">Kullanıcı ID: {membership.user_id}</span>
            <span className="text-gray-600">
              Başlangıç: {membership.start_date}, Bitiş: {membership.end_date}, Durum: {membership.status}
            </span>
          </li>
        ))}
      </ul>

      <h3 className="text-2xl font-semibold mb-4 text-gray-700">Yeni Üyelik Ekle</h3>
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
          placeholder="Başlangıç Tarihi"
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          required
        />
        <input
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Bitiş Tarihi"
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
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

export default Memberships;
