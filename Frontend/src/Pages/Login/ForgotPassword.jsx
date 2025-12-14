import React, { useState } from "react";
import { ArrowLeft, Mail, AlertCircle, CheckCircle } from "lucide-react";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const res = await fetch(
                "http://localhost:8000/api/alumni/auth/forgot-password",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                }
            );
            const data = await res.json();

            if (!res.ok) {
                if (data.errors && data.errors.length > 0) {
                    setError(data.errors[0].msg);
                } else {
                    setError(data.message || "Failed to send OTP");
                }
                return;
            }

            setSuccess("OTP sent successfully to your email.");
            setTimeout(() => {
                window.location.href = `/alumni/reset-password?email=${email}`;
            }, 1500);

        } catch (err) {
            setError("Network error. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-12 sm:px-6 lg:px-8"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')"
            }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>

            {/* CARD CONTAINER */}
            <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden z-10">
                
                {/* --- ERROR SECTION (TOP & BLINKING) --- */}
                {error && (
                    <div className="animate-pulse bg-red-100 border-l-4 border-red-500 text-red-700 p-4 w-full flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        <p className="font-semibold text-sm">{error}</p>
                    </div>
                )}

                <div className="p-8 pt-10">
                    {/* LOGO SECTION */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="bg-blue-50 p-3 rounded-full mb-3 shadow-inner">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 17L12 22L22 17" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 12L12 17L22 12" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Forgot Password?</h2>
                        <p className="text-gray-500 text-sm mt-2 text-center leading-relaxed">
                            No worries! Enter your registered email and we will send you a reset code.
                        </p>
                    </div>

                    {/* FORM SECTION */}
                    <form onSubmit={handleSendOTP} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
                                    required
                                />
                            </div>
                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Sending...
                                </span>
                            ) : (
                                "Send Reset Code"
                            )}
                        </button>
                    </form>

                    {/* --- SUCCESS SECTION (BELOW BUTTON) --- */}
                    {success && (
                        <div className="mt-6 p-4 rounded-xl bg-green-50 text-green-700 border border-green-200 flex flex-col items-center animate-fade-in-up">
                            <CheckCircle className="w-8 h-8 mb-2 text-green-600" />
                            <p className="text-center font-medium text-sm">{success}</p>
                            <p className="text-xs text-green-600 mt-1">Redirecting you shortly...</p>
                        </div>
                    )}

                    {/* BACK TO LOGIN */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <a
                            href="/login"
                            className="flex items-center justify-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Login
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}