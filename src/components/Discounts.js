import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Discounts() {
    const [discounts, setDiscounts] = useState([]);
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [percentage, setPercentage] = useState('');

    useEffect(() => {
        fetchDiscounts();
    }, []);

    const fetchDiscounts = () => {
        axios.get('http://localhost:5001/api/discounts')
            .then(res => setDiscounts(res.data))
            .catch(err => console.error(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5001/api/discounts', {
            code,
            description,
            percentage: parseFloat(percentage)
        })
            .then(() => {
                setCode('');
                setDescription('');
                setPercentage('');
                fetchDiscounts();
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
            <h2 className="text-4xl font-bold mb-6 text-green-600 text-center">İndirimler</h2>

            <ul className="divide-y divide-gray-200 mb-8">
                {discounts.map(discount => (
                    <li key={discount.id} className="py-3 flex justify-between items-center">
                        <span className="text-lg font-medium">Kod: {discount.code}</span>
                        <span className="text-gray-600">Açıklama: {discount.description}</span>
                        <span className="text-gray-600">Yüzde: %{discount.percentage}</span>
                    </li>
                ))}
            </ul>

            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Yeni İndirim Ekle</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Kod"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    required
                />
                <input
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Açıklama"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />
                <input
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Yüzde"
                    type="number"
                    step="0.01"
                    value={percentage}
                    onChange={e => setPercentage(e.target.value)}
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

export default Discounts;
