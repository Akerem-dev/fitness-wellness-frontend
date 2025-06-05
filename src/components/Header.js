// src/components/Header.jsx
import React from "react";
import logo from "../assets/logo.png";

export default function Header({
  currentUser,
  onOpenModal,
  onOpenProfile,
  onLogout,
}) {
  return (
    <header
      className="fixed top-0 left-0 w-full z-50"
      style={{ background: "linear-gradient(90deg, #2c5f2d 0%, #1b3a2e 100%)" }}
    >
      <div className="flex items-center justify-between h-20 px-4">
        {/* SOL: Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Natura Fitness" className="h-16 w-auto" />
        </div>

        {/* SAĞ: Navigasyon Linkleri + Kullanıcı Butonları */}
        <nav className="flex items-center space-x-4 text-white font-medium">
          <a href="#about" className="hover:text-green-300">
            About
          </a>
          <a href="#packages" className="hover:text-green-300">
            Packages
          </a>
          <a href="#services" className="hover:text-green-300">
            Services
          </a>
          <a href="#trainers" className="hover:text-green-300">
            Trainers
          </a>
          <a href="#contact" className="hover:text-green-300">
            Contact
          </a>
          <a href="#reviews" className="hover:text-green-300">
            Reviews
          </a>

          {!currentUser ? (
            <>
              <button
                onClick={() => onOpenModal("signup")}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
              >
                Sign Up
              </button>
              <button
                onClick={() => onOpenModal("login")}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
              >
                Log In
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onOpenProfile}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
              >
                Profile
              </button>
              <span className="ml-2">Welcome, {currentUser.fullName}!</span>
              <button
                onClick={onLogout}
                className="ml-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Log Out
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
