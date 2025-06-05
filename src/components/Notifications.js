import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('');
    const [readStatus, setReadStatus] = useState(false);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = () => {
        axios.get('http://localhost:5001/api/notifications')
            .then(res => setNotifications(res.data))
            .catch(err => console.error(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5001/api/notifications', {
            user_id: parseInt(userId),
            message,
            read_status: readStatus
        })
            .then(() => {
                setUserId('');
                setMessage('');
                setReadStatus(false);
                fetchNotifications();
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
            <h2 className="text-4xl font-bold mb-6 text-green-600 text-center">Bildirimler</h2>

            <ul className="divide-y divide-gray-200 mb-8">
                {notifications.map(notification => (
                    <li key={notification.id} className="py-3 flex justify-between items-center">
                        <span className="text-lg font-medium">Kullanıcı ID: {notification.user_id}</span>
                        <span className="text-gray-600">Mesaj: {notification.message}</span>
                        <span className="text-gray-600">Okundu: {notification.read_status ? 'Evet' : 'Hayır'}</span>
                    </li>
                ))}
            </ul>

            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Yeni Bildirim Ekle</h3>
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
                    placeholder="Mesaj"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    required
                />
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={readStatus}
                        onChange={e => setReadStatus(e.target.checked)}
                        id="readStatusCheckbox"
                        className="w-4 h-4"
                    />
                    <label htmlFor="readStatusCheckbox" className="select-none">Okundu</label>
                </div>
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

export default Notifications;
