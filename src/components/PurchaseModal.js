import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PurchaseModal({
    isOpen,
    onClose,
    packageName,
    packagePrice,
    packageId,
    token,
    onPurchased, // Parent component’ten geçilen callback
}) {
    // Kart bilgileri için state’ler
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // Eğer modal kapanmışsa, tüm state’leri temizle
    useEffect(() => {
        if (!isOpen) {
            setCardName("");
            setCardNumber("");
            setExpiry("");
            setCvc("");
            setError("");
            setLoading(false);
            setSuccessMessage("");
        }
    }, [isOpen]);

    // Basit form validasyonu
    const validateFields = () => {
        if (!cardName.trim()) {
            setError("Please enter cardholder’s name.");
            return false;
        }
        const onlyDigits = /^\d+$/;
        if (!onlyDigits.test(cardNumber) || cardNumber.length < 12) {
            setError("Please enter a valid card number.");
            return false;
        }
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
            setError("Expiry date must be in MM/YY format.");
            return false;
        }
        if (!/^\d{3,4}$/.test(cvc)) {
            setError("CVC must be 3 or 4 digits.");
            return false;
        }
        return true;
    };

    // “Pay” düğmesine basıldığında çalışacak fonksiyon
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        // Eğer kullanıcı giriş yapmamışsa işlemi engelle
        if (!token) {
            setError("You must be logged in to make a purchase.");
            return;
        }
        if (!validateFields()) return;

        try {
            setLoading(true);

            // 1) Ödeme altyapısı (örnek: Stripe) yerine backend’e POST atıyoruz.
            //    Backend tarafında `packageController.purchase` bu isteği işleyip 'active_members' tablosuna ekleme yapacak.
            const response = await axios.post(
                "http://localhost:5001/api/packages/purchase",
                {
                    packageId: packageId,
                    membershipType: packageName, // Paket ismi (örneğin "Pro Fit", "Basic Fit", vb.)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // 2) Eğer backend 200 veya 201 döndüyse satın alma başarılıdır:
            if (response.status === 200 || response.status === 201) {
                setSuccessMessage("Purchase successful! 🎉");
                // Parent component’ı bilgilendir (ActiveMembers kısmını yenilemek için)
                onPurchased();

                // 3) İki saniye sonra modal’ı kendimiz kapatalım
                setTimeout(() => {
                    onClose();
                }, 1500);
            } else {
                setError("Payment failed. Please try again.");
            }
        } catch (err) {
            console.error("Purchase error:", err.response || err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Eğer modal açık değilse hiçbir şey render etme
    if (!isOpen) return null;

    // *** DİKKAT ***: Burada artık “fixed inset-0 …” gibi bir wrapper KULLANMIYORUZ.
    //                Overlay ve centering işi zaten ModalWrapper bileşeninde yapılıyor.
    return (
        <div
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md mx-auto overflow-y-auto max-h-[90vh] p-6"
            data-aos="zoom-in"
        >
            {/* Kapatma düğmesi */}
            <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl focus:outline-none"
            >
                &times;
            </button>

            {/* Başlık */}
            <h3 className="text-2xl font-bold text-green-700 mb-4 text-center">
                Purchase: {packageName}
            </h3>

            {/* Fiyat */}
            <p className="text-center text-gray-700 mb-6">
                Price: <span className="font-semibold text-green-800">${packagePrice}</span>
            </p>

            {/* Başarılı mesaj */}
            {successMessage && (
                <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center">
                    {successMessage}
                </div>
            )}

            {/* Hata mesajı */}
            {error && (
                <div className="bg-red-100 text-red-700 p-2 rounded-lg mb-4 text-sm">
                    {error}
                </div>
            )}

            {/* Form içeriği */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Kart Sahibi Adı */}
                <div>
                    <label className="block text-gray-700 mb-1">Cardholder Name</label>
                    <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                        placeholder="John Doe"
                    />
                </div>

                {/* Kart Numarası */}
                <div>
                    <label className="block text-gray-700 mb-1">Card Number</label>
                    <input
                        type="text"
                        inputMode="numeric"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => {
                            const val = e.target.value.replace(/[^\d]/g, "");
                            setCardNumber(val);
                        }}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                        placeholder="1234 5678 9012 3456"
                    />
                </div>

                {/* Son Kullanma Tarihi (MM/YY) ve CVC */}
                <div className="flex space-x-4">
                    {/* Expiry */}
                    <div className="w-1/2">
                        <label className="block text-gray-700 mb-1">Expiry (MM/YY)</label>
                        <input
                            type="text"
                            maxLength={5}
                            value={expiry}
                            onChange={(e) => {
                                let val = e.target.value.replace(/[^\d]/g, "");
                                if (val.length >= 3) {
                                    val = val.slice(0, 2) + "/" + val.slice(2, 4);
                                }
                                setExpiry(val);
                            }}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                            placeholder="MM/YY"
                        />
                    </div>

                    {/* CVC */}
                    <div className="w-1/2">
                        <label className="block text-gray-700 mb-1">CVC</label>
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={4}
                            value={cvc}
                            onChange={(e) => {
                                const val = e.target.value.replace(/[^\d]/g, "");
                                setCvc(val);
                            }}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                            placeholder="123"
                        />
                    </div>
                </div>

                {/* Pay Butonu */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full ${loading
                        ? "bg-green-300"
                        : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                        } text-white font-medium py-2 rounded-lg shadow-md transition-colors duration-200 ${loading ? "" : "hover:shadow-lg"
                        } flex items-center justify-center`}
                >
                    {loading ? (
                        <svg
                            className="animate-spin h-5 w-5 mr-2 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                            ></path>
                        </svg>
                    ) : (
                        "Pay"
                    )}
                </button>
            </form>
        </div>
    );
}
