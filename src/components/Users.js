// src/components/Users.jsx
import React, { useState } from "react";
import axios from "axios";

export default function Users({ mode, onClose, onLogin }) {
  // mode: "login" veya "signup"
  // onClose: modal'ı kapatacak fonksiyon
  // onLogin: login sonrası kullanıcıyı set edecek fonksiyon

  // Ortak alanlar
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sadece signup moda özgü alanlar
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Hata mesajı göstermek için
  const [errorMessage, setErrorMessage] = useState("");

  // Backend’e istek atarken loading kontrolü
  const [isSubmitting, setIsSubmitting] = useState(false);

  // handleRegisterSubmit
  const handleRegisterSubmit = async () => {
    // Basit client-side validasyon
    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage("Please enter both first name and last name.");
      return;
    }
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/user/register", {
        firstName,
        lastName,
        email,
        password,
      });
      // Beklenen cevap örneği: { fullName, email, token }
      const { fullName, token } = response.data;

      onLogin({ fullName, email, token }); // App.js içindeki handleLogin tetiklenir
      onClose();
    } catch (err) {
      console.error("Register error:", err.response || err);
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // handleLoginSubmit
  const handleLoginSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter both email and password.");
      return;
    }
    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/user/login", {
        email,
        password,
      });
      // Beklenen cevap örneği: { fullName, email, token }
      const { fullName, token } = response.data;

      onLogin({ fullName, email, token });
      onClose();
    } catch (err) {
      console.error("Login error:", err.response || err);
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Email atau password wrong.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {mode === "signup" ? (
        // ======== SIGN UP FORM ========
        <div>
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Register</h2>
          <div className="space-y-3">
            {/* First Name */}
            <div>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            {/* Last Name */}
            <div>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            {/* Confirm Password */}
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
          </div>

          {/* Hata Mesajı */}
          {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}

          {/* Düğmeler */}
          <div className="mt-6 flex justify-end space-x-3">
            <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
              Cancel
            </button>
            <button
              onClick={handleRegisterSubmit}
              disabled={isSubmitting}
              className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-50"
            >
              {isSubmitting ? "Registering…" : "Register"}
            </button>
          </div>
        </div>
      ) : (
        // ======== LOG IN FORM ========
        <div>
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Log In</h2>
          <div className="space-y-3">
            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
          </div>

          {/* Hata Mesajı */}
          {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}

          {/* Düğmeler */}
          <div className="mt-6 flex justify-end space-x-3">
            <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
              Cancel
            </button>
            <button
              onClick={handleLoginSubmit}
              disabled={isSubmitting}
              className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-50"
            >
              {isSubmitting ? "Logging In…" : "Log In"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
