// src/components/ModalWrapper.js
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ModalWrapper({ onClose, children }) {
    // AOS’u init et (sadece bir kez)
    useEffect(() => {
        AOS.init({ duration: 400, once: true });
        AOS.refresh();
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* 1) Overlay: Tüm sayfa ANINDA blur oluyor */}
            <div
                className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* 2) Modal içeriği */}
            <div
                className="relative z-10"
                data-aos="zoom-in"
                data-aos-duration="400"
            >
                {children}
            </div>
        </div>
    );
}
