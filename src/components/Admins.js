import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Admins() {
    const [admins, setAdmins] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = () => {
        axios.get('http://localhost:5001/api/admins')
            .then(res => setAdmins(res.data))
            .catch(err => console.error(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5001/api/admins', {
            username,
            email
        })
            .then(() => {
                setUsername('');
                setEmail('');
                fetchAdmins();
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
            <h2 className="text-4xl font-bold mb-6 text-green-600 text-center">Yöneticiler</h2>

            <ul className="divide-y divide-gray-200 mb-8">
                {admins.map(admin => (
                    <li key={admin.id} className="py-3 flex justify-between items-center">
                        <span className="text-lg font-medium">{admin.username}</span>
                        <span className="text-gray-600">{admin.email}</span>
                    </li>
                ))}
            </ul>

            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Yeni Yönetici Ekle</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Kullanıcı Adı"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
                <input
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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

export default Admins;
