import React, { useState } from 'react';
import { registerAlumni } from "../../api/authAPI"; // Ensure path is correct
import { useNavigate } from "react-router-dom";
import { 
    User, Mail, Lock, FileText, Briefcase, Calendar, Layers, 
    AlertCircle, GraduationCap, Quote, ChevronDown 
} from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        regNo: '',
        department: '',
        batchYear: '2024',
        company: '',
    });

    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // --- Handlers ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
        
        if (errors.length > 0) {
            setErrors(prev => prev.filter(err => err.path !== name && err.param !== name));
        }
    };

    const getFieldError = (fieldName) => {
        return errors.find(err => err.path === fieldName || err.param === fieldName)?.msg;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);

        try {
            await registerAlumni(formData);
            alert("Registration Successful! Please login.");
            navigate("/login");
        } catch (error) {
            console.error("Registration Error:", error);
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else if (error.response?.data?.message) {
                setErrors([{ msg: error.response.data.message, type: 'global' }]);
            } else {
                setErrors([{ msg: "Server error. Please try again later.", type: 'global' }]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full bg-white font-sans selection:bg-blue-50 selection:text-blue-900 overflow-hidden">
            
            {/* CSS: Hide Scrollbar & Blink Animation */}
            <style>{`
                /* Hide scrollbar for Chrome, Safari and Opera */
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                /* Hide scrollbar for IE, Edge and Firefox */
                .hide-scrollbar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }

                @keyframes soft-blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.6; }
                }
                .animate-soft-blink { 
                    animation: soft-blink 2s ease-in-out infinite; 
                }
            `}</style>

            {/* --- LEFT: BRANDING SIDE (Hidden on Mobile) --- */}
            <div className="hidden lg:flex lg:w-5/12 relative flex-col justify-between bg-slate-900 text-white">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2968&auto=format&fit=crop" 
                        alt="Professional Networking" 
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90" />
                </div>
                
                {/* Content Overlay */}
                <div className="relative z-10 flex flex-col h-full justify-between p-12 xl:p-16">
                    {/* Top Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-600 rounded-lg">
                                <GraduationCap size={24} className="text-white" />
                            </div>
                            <span className="text-lg font-bold tracking-widest uppercase">Alumni Connect</span>
                        </div>
                        
                        <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight mb-6 text-white">
                            Building Bridges <br/> 
                            <span className="text-blue-400">Across Generations</span>
                        </h1>
                        
                        <p className="text-slate-300 text-lg leading-relaxed max-w-md">
                            Join our exclusive network to mentor students, reconnect with batchmates, and unlock career opportunities at top global firms.
                        </p>
                    </div>

                    {/* Bottom Quote Card */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl">
                        <Quote size={24} className="text-blue-400 mb-4 fill-blue-400/20" />
                        <blockquote className="text-lg font-medium text-slate-100 mb-4 italic">
                            "Networking is not about just connecting people. It's about connecting people with people, people with ideas, and people with opportunities."
                        </blockquote>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white text-sm">
                                MJ
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">Michele Jennae</p>
                                <p className="text-xs text-slate-400">Author & Entrepreneur</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- RIGHT: FORM SIDE --- */}
            {/* Added 'hide-scrollbar' class here */}
            <div className="w-full lg:w-7/12 flex flex-col h-full bg-white relative overflow-y-auto hide-scrollbar">
                
                {/* Mobile Header (Only visible on small screens) */}
                <div className="lg:hidden w-full bg-white border-b border-slate-100 p-4 sticky top-0 z-20 flex items-center gap-3 shadow-sm">
                    <div className="p-1.5 bg-blue-600 rounded-md">
                        <GraduationCap size={20} className="text-white" />
                    </div>
                    <span className="font-bold text-slate-800 tracking-wide">ALUMNI CONNECT</span>
                </div>

                {/* Centered Form Container */}
                <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-12">
                    <div className="w-full max-w-[550px] space-y-8">
                        
                        {/* Header */}
                        <div className="text-center sm:text-left">
                            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Create your account</h2>
                            <p className="text-slate-500 mt-2">
                                Please fill in the details to register. Already a member?{' '}
                                <a href="/login" className="text-blue-600 font-semibold hover:underline">Sign in</a>
                            </p>
                        </div>

                        {/* Global Error Message */}
                        {errors.some(err => !err.path && !err.param) && (
                            <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-start gap-3 animate-soft-blink shadow-sm">
                                <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                                <span className="text-red-600 text-sm font-medium">
                                    {errors.find(err => !err.path && !err.param)?.msg}
                                </span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            
                            {/* Personal Info */}
                            <div className="space-y-4">
                                <FormInput 
                                    label="Full Name" 
                                    name="fullName" 
                                    icon={User} 
                                    placeholder="Enter your full name" 
                                    value={formData.fullName} 
                                    onChange={handleChange} 
                                    error={getFieldError('fullName')} 
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormInput 
                                        label="Email Address" 
                                        name="email" 
                                        type="email" 
                                        icon={Mail} 
                                        placeholder="name@example.com" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        error={getFieldError('email')} 
                                    />
                                    <FormInput 
                                        label="Password" 
                                        name="password" 
                                        type="password" 
                                        icon={Lock} 
                                        placeholder="Create a password" 
                                        value={formData.password} 
                                        onChange={handleChange} 
                                        error={getFieldError('password')} 
                                    />
                                </div>
                            </div>

                            {/* Section Divider */}
                            <div className="relative py-2">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-slate-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white px-3 text-slate-400 font-medium">Professional Details</span>
                                </div>
                            </div>

                            {/* Professional Info */}
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormInput 
                                        label="Registration No." 
                                        name="regNo" 
                                        icon={FileText} 
                                        placeholder="Univ. Reg No." 
                                        value={formData.regNo} 
                                        onChange={handleChange} 
                                        error={getFieldError('regNo')} 
                                    />
                                    <FormSelect 
                                        label="Department" 
                                        name="department" 
                                        icon={Layers} 
                                        value={formData.department} 
                                        onChange={handleChange} 
                                        error={getFieldError('department')}
                                        options={[
                                            { value: 'CSE', label: 'Computer Science (CSE)' },
                                            { value: 'IT', label: 'Information Tech (IT)' },
                                            { value: 'ECE', label: 'Electronics (ECE)' },
                                            { value: 'MECH', label: 'Mechanical (MECH)' },
                                            { value: 'CIVIL', label: 'Civil Engineering' },
                                        ]}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormSelect 
                                        label="Batch Year" 
                                        name="batchYear" 
                                        icon={Calendar} 
                                        value={formData.batchYear} 
                                        onChange={handleChange} 
                                        error={getFieldError('batchYear')}
                                        options={Array.from({ length: 15 }, (_, i) => {
                                            const year = new Date().getFullYear() - i;
                                            return { value: year, label: year.toString() };
                                        })}
                                    />
                                    <FormInput 
                                        label="Current Company" 
                                        name="company" 
                                        icon={Briefcase} 
                                        placeholder="Where do you work?" 
                                        value={formData.company} 
                                        onChange={handleChange} 
                                        error={getFieldError('company')} 
                                    />
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="pt-4 pb-8">
                                <button 
                                    type="submit" 
                                    disabled={isLoading}
                                    className={`
                                        w-full py-3.5 px-6 rounded-xl text-white font-bold text-base shadow-lg shadow-blue-500/20
                                        transition-all duration-200
                                        focus:outline-none focus:ring-4 focus:ring-blue-500/20
                                        flex items-center justify-center gap-2
                                        ${isLoading 
                                            ? 'bg-blue-400 cursor-not-allowed' 
                                            : 'bg-blue-600 hover:bg-blue-700 active:transform active:scale-[0.98]'
                                        }
                                    `}
                                >
                                    {isLoading ? 'Processing...' : 'Register Now'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- REUSABLE COMPONENTS ---

const FormInput = ({ label, name, type = "text", value, onChange, placeholder, error, icon: Icon }) => {
    return (
        <div className="w-full">
            <label htmlFor={name} className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
                {label}
            </label>
            <div className="relative group">
                {Icon && (
                    <div className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors duration-200 ${error ? 'text-red-400' : 'text-slate-400 group-focus-within:text-blue-600'}`}>
                        <Icon size={18} />
                    </div>
                )}
                <input
                    id={name}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`
                        w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-white border rounded-xl text-sm outline-none transition-all duration-200
                        placeholder:text-slate-400
                        ${error 
                            ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' 
                            : 'border-slate-200 text-slate-800 hover:border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10'
                        }
                    `}
                />
            </div>
            {/* Standard Red Color, Normal Font Weight, Soft Blink */}
            {error && (
                <div className="flex items-center gap-1.5 mt-1.5 ml-1 animate-soft-blink text-red-500">
                    <AlertCircle size={14} />
                    <p className="text-xs font-medium">{error}</p>
                </div>
            )}
        </div>
    );
};

const FormSelect = ({ label, name, value, onChange, options, error, icon: Icon }) => {
    return (
        <div className="w-full">
            <label htmlFor={name} className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
                {label}
            </label>
            <div className="relative group">
                {Icon && (
                    <div className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors duration-200 ${error ? 'text-red-400' : 'text-slate-400 group-focus-within:text-blue-600'}`}>
                        <Icon size={18} />
                    </div>
                )}
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`
                        w-full ${Icon ? 'pl-10' : 'pl-4'} pr-10 py-3 bg-white border rounded-xl text-sm outline-none appearance-none transition-all duration-200 cursor-pointer
                        ${error 
                            ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' 
                            : 'border-slate-200 text-slate-800 hover:border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10'
                        }
                        ${!value && 'text-slate-400 font-normal'}
                    `}
                >
                    <option value="" disabled>Select</option>
                    {options.map((opt, idx) => (
                        <option key={idx} value={opt.value || opt} className="text-slate-700">
                            {opt.label || opt}
                        </option>
                    ))}
                </select>
                <div className={`absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none ${error ? 'text-red-400' : 'text-slate-400'}`}>
                    <ChevronDown size={16} />
                </div>
            </div>
            {/* Standard Red Color, Normal Font Weight, Soft Blink */}
            {error && (
                <div className="flex items-center gap-1.5 mt-1.5 ml-1 animate-soft-blink text-red-500">
                    <AlertCircle size={14} />
                    <p className="text-xs font-medium">{error}</p>
                </div>
            )}
        </div>
    );
};

export default Register;