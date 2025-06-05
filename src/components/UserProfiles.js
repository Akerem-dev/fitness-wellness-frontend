import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [userId, setUserId] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = () => {
    axios.get('http://localhost:5001/api/user_profiles')
      .then(res => setProfiles(res.data))
      .catch(err => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5001/api/user_profiles', {
      user_id: parseInt(userId),
      age: parseInt(age),
      gender,
      weight: parseFloat(weight),
      height: parseFloat(height)
    })
      .then(() => {
        setUserId('');
        setAge('');
        setGender('');
        setWeight('');
        setHeight('');
        fetchProfiles();
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-4xl font-bold mb-6 text-green-600 text-center">Kullanıcı Profilleri</h2>

      <ul className="divide-y divide-gray-200 mb-8">
        {profiles.map(profile => (
          <li key={profile.id} className="py-3 flex justify-between items-center">
            <span className="text-lg font-medium">Kullanıcı ID: {profile.user_id}</span>
            <span className="text-gray-600">
              Yaş: {profile.age}, Cinsiyet: {profile.gender}, Kilo: {profile.weight}kg, Boy: {profile.height}cm
            </span>
          </li>
        ))}
      </ul>

      <h3 className="text-2xl font-semibold mb-4 text-gray-700">Yeni Profil Ekle</h3>
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
          placeholder="Yaş"
          type="number"
          value={age}
          onChange={e => setAge(e.target.value)}
          required
        />
        <input
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Cinsiyet"
          value={gender}
          onChange={e => setGender(e.target.value)}
          required
        />
        <input
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Kilo"
          type="number"
          step="0.1"
          value={weight}
          onChange={e => setWeight(e.target.value)}
          required
        />
        <input
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Boy (cm)"
          type="number"
          step="0.1"
          value={height}
          onChange={e => setHeight(e.target.value)}
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

export default UserProfiles;
