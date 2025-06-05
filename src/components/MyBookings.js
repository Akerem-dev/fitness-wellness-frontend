// src/components/MyBookings.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyBookings({ token, refreshTrigger }) {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyBookings = async () => {
            try {
                if (!token) {
                    setError("You must be logged in to see your bookings.");
                    return;
                }
                const response = await axios.get("http://localhost:5001/api/bookings/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data && response.data.bookings) {
                    setBookings(response.data.bookings);
                } else {
                    setBookings([]);
                }
            } catch (err) {
                console.error("MyBookings çekilirken hata:", err);
                if (err.response && err.response.data && err.response.data.message) {
                    setError(err.response.data.message);
                } else {
                    setError("Failed to load your bookings.");
                }
            }
        };
        fetchMyBookings();
    }, [token, refreshTrigger]);

    if (!token) {
        return (
            <p className="text-center text-red-500">
                You must be logged in to see your bookings.
            </p>
        );
    }
    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Your Bookings</h2>
            {bookings.length === 0 ? (
                <p className="text-gray-600">You have no bookings at the moment.</p>
            ) : (
                <ul className="space-y-4">
                    {bookings.map((b) => (
                        <li
                            key={b._id}
                            className="bg-white rounded-2xl shadow p-4 flex flex-col md:flex-row justify-between"
                        >
                            <div className="space-y-1 text-left">
                                <p className="text-lg font-medium">
                                    Trainer: <span className="text-green-700">{b.trainerName}</span>
                                </p>
                                <p className="text-gray-600">Date: {b.date}</p>
                                <p className="text-gray-600">Time: {b.time}</p>
                            </div>
                            <div className="text-right space-y-1 mt-2 md:mt-0">
                                <p className="text-gray-600">
                                    Status: <span className="text-green-700">{b.status}</span>
                                </p>
                                <span className="text-sm text-gray-500">ID: {b._id.slice(-6)}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
