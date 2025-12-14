import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Lock, Key, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

export default function StudentResetPassword() {
    const [params] = useSearchParams();
    const regNo = params.get("regNo");
    const navigate = useNavigate();

    // Form States
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    
    // UI States
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(""); 

    // Resend OTP States
    const [resendLoading, setResendLoading] = useState(false);
    const [resendMessage, setResendMessage] = useState("");
    const [cooldown, setCooldown] = useState(0);

    /* =========================
       RESET PASSWORD HANDLER
    ========================= */
    const handleReset = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setResendMessage("");

        if (!regNo) {
            setError("Invalid link. Missing Registration Number.");
            return;
        }
        if (password !== confirm) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(
                "http://localhost:8000/api/student/reset-password",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        regNo,
                        otp,
                        newPassword: password,
                        confirmPassword: confirm,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                if (data.errors && Array.isArray(data.errors)) {
                    setError(data.errors[0].msg);
                } else {
                    setError(data.message || "Invalid OTP or Server Error.");
                }
                setLoading(false);
                return;
            }

            setSuccess("Password reset successful! Redirecting...");
            
            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch {
            setError("Unable to connect to server. Please try again.");
            setLoading(false);
        }
    };

    /* =========================
       RESEND OTP HANDLER
    ========================= */
    const resendOTP = async () => {
        if (cooldown > 0 || !regNo) return;

        setResendLoading(true);
        setError("");
        setSuccess("");
        setResendMessage("");

        try {
            const res = await fetch("http://localhost:8000/api/student/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ regNo }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Failed to resend OTP.");
                return;
            }

            setResendMessage("New OTP sent to your email.");
            setCooldown(30); 

        } catch {
            setError("Network error. Failed to resend OTP.");
        } finally {
            setResendLoading(false);
        }
    };

    /* =========================
       COOLDOWN TIMER
    ========================= */
    useEffect(() => {
        if (cooldown <= 0) return;
        const interval = setInterval(() => {
            setCooldown((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [cooldown]);

    return (
        // MAIN CONTAINER: Removed bg-cover from here to fix scrolling/mismatch
        <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
            
            {/* 1. FIXED BACKGROUND IMAGE (Locked to top) */}
            <div 
                className="fixed inset-0 z-0 bg-cover bg-top bg-no-repeat"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')"
                }}
            />

            {/* 2. FIXED DARK OVERLAY */}
            <div className="fixed inset-0 z-0 bg-slate-900/60 backdrop-blur-[2px]" />

            {/* 3. CARD CONTAINER (Relative z-10 to float above background) */}
            <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

                {/* --- ERROR SECTION (TOP & BLINKING) --- */}
                {error && (
                    <div className="animate-pulse bg-red-100 border-l-4 border-red-500 text-red-700 p-4 w-full flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p className="font-semibold text-sm">{error}</p>
                    </div>
                )}

                <div className="p-8 pt-10">
                    {/* HEADER */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="bg-blue-50 p-3 rounded-full mb-3 shadow-inner">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 17L12 22L22 17" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 12L12 17L22 12" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Set New Password</h2>
                        <p className="text-gray-500 text-sm text-center mt-1">
                            Secure account for Student ID: <br/>
                            <span className="font-semibold text-blue-600">{regNo || "Unknown"}</span>
                        </p>
                    </div>

                    <form onSubmit={handleReset} className="space-y-5">
                        
                        {/* OTP Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                                One-Time Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Key className="h-5 w-5" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter 6-digit OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all sm:text-sm"
                                    required
                                />
                            </div>
                            
                            {/* Resend Link (Right Aligned) */}
                            <div className="flex justify-end mt-2">
                                <button
                                    type="button"
                                    onClick={resendOTP}
                                    disabled={resendLoading || cooldown > 0}
                                    className="flex items-center text-xs font-medium text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                                >
                                    {resendLoading ? (
                                        <span className="animate-pulse">Resending...</span>
                                    ) : (
                                        <>
                                            {cooldown > 0 ? `Resend available in ${cooldown}s` : "Resend OTP"}
                                            {cooldown === 0 && <RefreshCw className="w-3 h-3 ml-1" />}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                                New Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Lock className="h-5 w-5" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all sm:text-sm"
                                    required
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Lock className="h-5 w-5" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all sm:text-sm"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || !!success}
                            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Updating...
                                </span>
                            ) : (
                                "Reset Password"
                            )}
                        </button>
                    </form>

                    {/* --- SUCCESS MESSAGES --- */}
                    
                    {/* 1. Main Success (Password Reset) */}
                    {success && (
                        <div className="mt-6 p-4 rounded-xl bg-green-50 text-green-700 border border-green-200 flex flex-col items-center animate-fade-in-up">
                            <CheckCircle className="w-8 h-8 mb-2 text-green-600" />
                            <p className="text-center font-medium text-sm">{success}</p>
                            <p className="text-xs text-green-600 mt-1">Redirecting you to login...</p>
                        </div>
                    )}

                    {/* 2. Secondary Success (Resend OTP) */}
                    {resendMessage && !success && (
                        <div className="mt-4 p-3 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center gap-2 animate-bounce-short">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">{resendMessage}</span>
                        </div>
                    )}

                    {/* BACK TO LOGIN */}
                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <Link
                            to="/login"
                            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}