import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ClassSchedules() {
    const [schedules, setSchedules] = useState([]);
    const [serviceId, setServiceId] = useState('');
    const [trainerId, setTrainerId] = useState('');
    const [classTime, setClassTime] = useState('');

    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = () => {
        axios.get('http://localhost:5001/api/class_schedules')
            .then(res => setSchedules(res.data))
            .catch(err => console.error(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5001/api/class_schedules', {
            service_id: parseInt(serviceId),
            trainer_id: parseInt(trainerId),
            class_time: classTime
        })
            .then(() => {
                setServiceId('');
                setTrainerId('');
                setClassTime('');
                fetchSchedules();
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
            <h2 className="text-4xl font-bold mb-6 text-green-600 text-center">Sınıf Programları</h2>

            <ul className="divide-y divide-gray-200 mb-8">
                {schedules.map(schedule => (
                    <li key={schedule.id} className="py-3 flex justify-between items-center">
                        <span className="text-lg font-medium">Hizmet ID: {schedule.service_id}</span>
                        <span className="text-gray-600">Eğitmen ID: {schedule.trainer_id}, Zaman: {schedule.class_time}</span>
                    </li>
                ))}
            </ul>

            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Yeni Sınıf Programı Ekle</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Hizmet ID"
                    type="number"
                    value={serviceId}
                    onChange={e => setServiceId(e.target.value)}
                    required
                />
                <input
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Eğitmen ID"
                    type="number"
                    value={trainerId}
                    onChange={e => setTrainerId(e.target.value)}
                    required
                />
                <input
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Sınıf Zamanı"
                    type="datetime-local"
                    value={classTime}
                    onChange={e => setClassTime(e.target.value)}
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

export default ClassSchedules;
