import React, { useState } from 'react';
import { registerAlumni } from "../../api/authAPI";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await registerAlumni(formData);

        alert("Alumni Registered Successfully!");

        // Redirect to login page
        navigate("/login");

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
        <div className="h-screen w-full flex font-sans text-slate-800 overflow-hidden bg-slate-50">
            
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
                className="hidden md:flex w-1/2 relative flex-col justify-end p-12 text-white bg-cover bg-center shadow-2xl z-10"
                style={{
                    backgroundImage: 'linear-gradient(to top, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.3)), url("https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2000&auto=format&fit=crop")'
                }}
            >
                <div className="mb-8 border-l-4 border-blue-500 pl-6">
                    <h2 className="text-5xl font-bold mb-4 drop-shadow-lg tracking-tight">
                        Connect. <br/> Mentor. <br/> Inspire.
                    </h2>
                    <p className="text-xl text-slate-200 leading-relaxed max-w-lg drop-shadow-sm font-light">
                        Join the exclusive alumni network. Reconnect with peers and guide the next generation of innovators.
                    </p>
                </div>
            </div>

            {/* --- RIGHT SIDE: FORM SECTION --- */}
            <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-8 h-full overflow-y-auto no-scrollbar relative">
                
                <div className="w-full max-w-md animate-fade-in-up">
                    
                    {/* Header */}
                    <div className="mb-10 text-center">
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Alumni Registration</h1>
                        <p className="text-slate-500 mt-2 text-sm">Fill in your official details to request access.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        
                        {/* Full Name */}
                        <div>
                            <label className="block text-slate-600 text-xs font-bold mb-1.5 uppercase tracking-wider">Full Name</label>
                            <input 
                                type="text" 
                                name="fullName" 
                                value={formData.fullName} 
                                onChange={handleChange} 
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                                placeholder="e.g. Aditi Sharma" 
                                required 
                            />
                        </div>
                        
                        {/* Email & Password Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-slate-600 text-xs font-bold mb-1.5 uppercase tracking-wider">Email Address</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                                    placeholder="name@example.com" 
                                    required 
                                />
                            </div>

                            <div>
                                <label className="block text-slate-600 text-xs font-bold mb-1.5 uppercase tracking-wider">Password</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                                    placeholder="••••••••" 
                                    required 
                                />
                            </div>
                        </div>

                        {/* Academic Details Grid */}
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="block text-slate-600 text-xs font-bold mb-1.5 uppercase tracking-wider">Reg No</label>
                                <input 
                                    type="text" 
                                    name="regNo" 
                                    value={formData.regNo} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                                    placeholder="12305240" 
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-slate-600 text-xs font-bold mb-1.5 uppercase tracking-wider">Department</label>
                                <select 
                                    name="department" 
                                    value={formData.department} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm cursor-pointer"
                                    required
                                >
                                    <option value="">Select Dept</option>
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

                        {/* Professional Details Grid */}
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="block text-slate-600 text-xs font-bold mb-1.5 uppercase tracking-wider">Batch Year</label>
                                <select 
                                    name="batchYear" 
                                    value={formData.batchYear} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm cursor-pointer"
                                    required
                                >
                                    {Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                    <option value="older">Older</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-slate-600 text-xs font-bold mb-1.5 uppercase tracking-wider">Company</label>
                                <input 
                                    type="text" 
                                    name="company" 
                                    value={formData.company} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                                    placeholder="Ex: Microsoft" 
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            className="w-full mt-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transform transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                        >
                            Complete Registration
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-slate-500 text-sm">
                            Already part of the network? <br/>
                            <a href="/login" className="text-blue-600 font-bold hover:text-blue-800 hover:underline transition-colors">Sign in to your account</a>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Register;