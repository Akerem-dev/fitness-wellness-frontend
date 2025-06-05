import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [userId, setUserId] = useState('');
    const [amount, setAmount] = useState('');
    const [transactionDate, setTransactionDate] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = () => {
        axios.get('http://localhost:5001/api/transactions')
            .then(res => setTransactions(res.data))
            .catch(err => console.error(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5001/api/transactions', {
            user_id: parseInt(userId),
            amount: parseFloat(amount),
            transaction_date: transactionDate,
            type
        })
            .then(() => {
                setUserId('');
                setAmount('');
                setTransactionDate('');
                setType('');
                fetchTransactions();
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
            <h2 className="text-4xl font-bold mb-6 text-green-600 text-center">İşlemler</h2>

            <ul className="divide-y divide-gray-200 mb-8">
                {transactions.map(transaction => (
                    <li key={transaction.id} className="py-3 flex justify-between items-center">
                        <span className="text-lg font-medium">Kullanıcı ID: {transaction.user_id}</span>
                        <span className="text-gray-600">
                            Tutar: {transaction.amount} ₺, Tarih: {transaction.transaction_date}, Tür: {transaction.type}
                        </span>
                    </li>
                ))}
            </ul>

            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Yeni İşlem Ekle</h3>
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
                    placeholder="İşlem Tarihi"
                    type="datetime-local"
                    value={transactionDate}
                    onChange={e => setTransactionDate(e.target.value)}
                    required
                />
                <input
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Tür"
                    value={type}
                    onChange={e => setType(e.target.value)}
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

export default Transactions;
