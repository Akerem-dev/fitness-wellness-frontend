import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserActivity() {
    const [activities, setActivities] = useState([]);
    const [userId, setUserId] = useState('');
    const [activityType, setActivityType] = useState('');
    const [activityDate, setActivityDate] = useState('');

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = () => {
        axios.get('http://localhost:5001/api/user_activity')
            .then(res => setActivities(res.data))
            .catch(err => console.error(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5001/api/user_activity', {
            user_id: parseInt(userId),
            activity_type: activityType,
            activity_date: activityDate
        })
            .then(() => {
                setUserId('');
                setActivityType('');
                setActivityDate('');
                fetchActivities();
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
            <h2 className="text-4xl font-bold mb-6 text-green-600 text-center">Kullanıcı Aktiviteleri</h2>

            <ul className="divide-y divide-gray-200 mb-8">
                {activities.map(activity => (
                    <li key={activity.id} className="py-3 flex justify-between items-center">
                        <span className="text-lg font-medium">Kullanıcı ID: {activity.user_id}</span>
                        <span className="text-gray-600">
                            Aktivite: {activity.activity_type}, Tarih: {activity.activity_date}
                        </span>
                    </li>
                ))}
            </ul>

            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Yeni Aktivite Ekle</h3>
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
                    placeholder="Aktivite Türü"
                    value={activityType}
                    onChange={e => setActivityType(e.target.value)}
                    required
                />
                <input
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Aktivite Tarihi"
                    type="datetime-local"
                    value={activityDate}
                    onChange={e => setActivityDate(e.target.value)}
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

export default UserActivity;
