import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Payments() {
  const [payments, setPayments] = useState([]);
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [method, setMethod] = useState('');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = () => {
    axios.get('http://localhost:5001/api/payments')
      .then(res => setPayments(res.data))
      .catch(err => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5001/api/payments', {
      user_id: parseInt(userId),
      amount: parseFloat(amount),
      payment_date: paymentDate,
      method
    })
      .then(() => {
        setUserId('');
        setAmount('');
        setPaymentDate('');
        setMethod('');
        fetchPayments();
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-4xl font-bold mb-6 text-green-600 text-center">Ödemeler</h2>

      <ul className="divide-y divide-gray-200 mb-8">
        {payments.map(payment => (
          <li key={payment.id} className="py-3 flex justify-between items-center">
            <span className="text-lg font-medium">Kullanıcı ID: {payment.user_id}</span>
            <span className="text-gray-600">
              Tutar: {payment.amount} ₺, Tarih: {payment.payment_date}, Yöntem: {payment.method}
            </span>
          </li>
        ))}
      </ul>

      <h3 className="text-2xl font-semibold mb-4 text-gray-700">Yeni Ödeme Ekle</h3>
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
          placeholder="Tutar"
          type="number"
          step="0.01"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
        <input
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Ödeme Tarihi"
          type="date"
          value={paymentDate}
          onChange={e => setPaymentDate(e.target.value)}
          required
        />
        <input
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Ödeme Yöntemi"
          value={method}
          onChange={e => setMethod(e.target.value)}
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

export default Payments;
