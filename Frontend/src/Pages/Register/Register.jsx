import React, { useState } from 'react';
import { registerAlumni } from "../../api/authAPI";

const Register = () => {
    // Form State (Alumni Fields Only)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        regNo: '',       
        department: '',  
        batchYear: '2024',
        company: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await registerAlumni(formData);

            alert("Alumni Registered Successfully!");
            console.log("Backend Response:", response.data);

        } catch (error) {
            console.error("Registration Error:", error);

            if (error.response && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert("Something went wrong! Try again.");
            }
        }
    };

    return (
        <div className="h-screen w-full flex font-sans text-slate-800 overflow-hidden">
            
            {/* --- INJECT CSS TO HIDE SCROLLBAR --- */}
            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            {/* --- LEFT SIDE: ALUMNI BACKGROUND IMAGE --- */}
            <div 
                className="hidden md:flex w-1/2 relative flex-col justify-end p-12 text-white bg-cover bg-center"
                style={{
                    backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2)), url("https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2000&auto=format&fit=crop")'
                }}
            >
                <div className="z-10 mb-8">
                    <h2 className="text-4xl font-bold mb-4 drop-shadow-md">
                        Share Your Wisdom.
                    </h2>
                    <p className="text-lg opacity-90 leading-relaxed max-w-lg drop-shadow-sm">
                        Give back to your alma mater and guide the next generation of professionals.
                    </p>
                </div>
            </div>

            {/* --- RIGHT SIDE: FORM SECTION --- */}
            <div className="w-full md:w-1/2 bg-white flex p-6 h-full overflow-y-auto no-scrollbar">
                
                <div className="w-full max-w-md m-auto">
                    
                    <div className="mb-8 text-center md:text-left">
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Alumni Account</h1>
                        <p className="text-slate-500 text-sm">Enter your details below to join the network.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                        
                        {/* 1. Common Fields */}
                        <div>
                            <label className="block text-slate-700 text-xs font-bold mb-1 uppercase tracking-wider">Full Name</label>
                            <input 
                                type="text" 
                                name="fullName" 
                                value={formData.fullName} 
                                onChange={handleChange} 
                                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm"
                                placeholder="Ex: Akash Kumar" 
                                required 
                            />
                        </div>
                        
                        <div>
                            <label className="block text-slate-700 text-xs font-bold mb-1 uppercase tracking-wider">Email Address</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm"
                                placeholder="akash@example.com" 
                                required 
                            />
                        </div>

                        <div>
                            <label className="block text-slate-700 text-xs font-bold mb-1 uppercase tracking-wider">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm"
                                placeholder="••••••••" 
                                required 
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-slate-700 text-xs font-bold mb-1 uppercase tracking-wider">Reg No</label>
                                <input 
                                    type="text" 
                                    name="regNo" 
                                    value={formData.regNo} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm"
                                    placeholder="12305240" 
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-slate-700 text-xs font-bold mb-1 uppercase tracking-wider">Dept</label>
                                <select 
                                    name="department" 
                                    value={formData.department} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white"
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="CSE">CSE</option>
                                    <option value="IT">IT</option>
                                    <option value="ECE">ECE</option>
                                    <option value="EEE">EEE</option>
                                    <option value="MECH">MECH</option>
                                    <option value="CIVIL">CIVIL</option>
                                    <option value="AI&DS">AI & DS</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-slate-700 text-xs font-bold mb-1 uppercase tracking-wider">Pass Year</label>
                                <select 
                                    name="batchYear" 
                                    value={formData.batchYear} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white"
                                    required
                                >
                                    {Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                    <option value="older">Older</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-slate-700 text-xs font-bold mb-1 uppercase tracking-wider">Company</label>
                                <input 
                                    type="text" 
                                    name="company" 
                                    value={formData.company} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm"
                                    placeholder="Microsoft" 
                                    required
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="relative my-6 text-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <span className="relative bg-white px-3 text-xs text-slate-400 font-medium uppercase tracking-wider">Or continue with</span>
                    </div>

                    {/* ✅✅✅ UPDATED BUTTONS WITH ICONS ✅✅✅ */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* Google Button */}
                        <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            <span className="font-medium text-slate-600">Google</span>
                        </button>
                        
                        {/* LinkedIn Button */}
                        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0a66c2] hover:bg-[#004182] text-white rounded-lg transition-colors">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                            <span className="font-medium">LinkedIn</span>
                        </button>
                    </div>

                    <p className="mt-6 text-center text-sm text-slate-500">
                        Already have an account? <a href="/login" className="text-blue-600 font-bold hover:underline">Log in</a>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Register;