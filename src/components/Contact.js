// src/components/Contact.jsx
import React, { useState } from "react";

export default function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Thank you, ${name}! Your message has been received.`);
        setName("");
        setEmail("");
        setMessage("");
    };

    return (
        <section
            id="contact"
            className="relative py-20 bg-[#f0f9f0] overflow-hidden"
            data-aos="fade-up"
        >
            {/* Sol üst köşedeki dekoratif daire */}
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-green-100 rounded-full opacity-20"></div>
            {/* Sağ alt köşedeki dekoratif daire */}
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-green-100 rounded-full opacity-15"></div>

            <div className="relative max-w-3xl mx-auto px-4">
                {/* ==================================== */}
                {/* Başlık & Alt Çizgi (Yeni Eklenen)     */}
                {/* ==================================== */}
                <h2
                    className="text-4xl font-bold text-center text-green-700 mb-2"
                    data-aos="zoom-in"
                >
                    Contact Us
                </h2>
                {/* Koyu yeşil alt çizgi (underline) */}
                <div className="w-24 h-1 bg-green-700 mx-auto mb-8"></div>

                {/* Alt Açıklama */}
                <p
                    className="text-center text-gray-600 mb-8 px-4 leading-relaxed"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    Have any questions or want to collaborate? Fill out the form below, and
                    we’ll get back to you within 24 hours.
                </p>

                {/* Form Kartı */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-3xl shadow-xl space-y-6 relative z-10"
                    data-aos="zoom-in"
                    data-aos-delay="200"
                >
                    {/* ------------------ İsim Input ------------------ */}
                    <div className="relative">
                        {/* Kullanıcı İkonu */}
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5.121 17.804A9.003 9.003 0 0112 15c1.657 0 3.183.493 4.388 1.328M12 7a4 4 0 100 8 4 4 0 000-8z"
                                />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="
                w-full 
                pl-12 
                pr-4 
                py-3 
                border border-gray-300 
                rounded-lg 
                shadow-sm 
                focus:outline-none 
                focus:ring-2 focus:ring-green-300 focus:border-transparent 
                transition
              "
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    {/* ------------------ Email Input ------------------ */}
                    <div className="relative">
                        {/* Email (Zarf) İkonu */}
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16 12H8m8-4H8m8 8H8m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </span>
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="
                w-full 
                pl-12 
                pr-4 
                py-3 
                border border-gray-300 
                rounded-lg 
                shadow-sm 
                focus:outline-none 
                focus:ring-2 focus:ring-green-300 focus:border-transparent 
                transition
              "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* ------------------ Mesaj Textarea ------------------ */}
                    <div className="relative">
                        {/* Chat Balonu İkonu */}
                        <span className="absolute left-4 top-4 text-gray-400 pointer-events-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8 10h.01M8 14h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M21 12c0-4.418-4.03-8-9-8S
                  3 7.582 3 12s4.03 8 9 8 9-3.582 9-8z"
                                />
                            </svg>
                        </span>
                        <textarea
                            placeholder="Your Message"
                            rows="5"
                            className="
                w-full 
                pl-12 
                pr-4 
                pt-4 
                pb-3 
                border border-gray-300 
                rounded-lg 
                shadow-sm 
                focus:outline-none 
                focus:ring-2 focus:ring-green-300 focus:border-transparent 
                transition 
                resize-none
              "
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </div>

                    {/* ------------------ Gönder Butonu ------------------ */}
                    <button
                        type="submit"
                        className="
              w-full 
              bg-gradient-to-r from-green-500 to-green-600 
              hover:from-green-600 hover:to-green-700 
              text-white 
              font-medium 
              py-3 
              rounded-lg 
              shadow-md 
              hover:shadow-lg 
              transition-transform transform 
              hover:scale-105 
              focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50
            "
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
}
