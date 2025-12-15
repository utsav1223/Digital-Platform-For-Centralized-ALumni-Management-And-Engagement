import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2, GraduationCap } from 'lucide-react';

// -----------------------------------------------------------------------------
// NOTE: removed `import AdminDashboard` — do NOT import the dashboard here.
// The dashboard should only be reachable via the protected route in App.jsx.
// -----------------------------------------------------------------------------

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const bgImage =
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1920&auto=format&fit=crop";

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setIsLoading(true);

  //   // Simulate an async auth call
  //   setTimeout(() => {
  //     const ok = formData.email.includes('@') && formData.password.length > 4;

  //     if (ok) {
  //       // Set a short-lived client token and the compatibility flag
  //       const token = {
  //         value: 'admintoken-' + Math.random().toString(36).slice(2),
  //         expiry: Date.now() + 1000 * 60 * 60 // 1 hour
  //       };
  //       localStorage.setItem('admin_token', JSON.stringify(token));

  //       // Replace history so user can't go back to login with back button
  //       navigate('/admin/dashboard', { replace: true });

  //       // No need to setIsLoading(false) if you navigate away immediately.
  //     } else {
  //       setError('Invalid credentials. Try email: admin@edu and pass: 12345');
  //       setIsLoading(false);
  //     }
  //   }, 1200);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/admin/login", {
        method: "POST",
        credentials: "include", // 🔥 VERY IMPORTANT
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setIsLoading(false);
        return;
      }

      // Optional UI token (dashboard guard only)
      localStorage.setItem(
        "admin_token",
        JSON.stringify({
          value: "server-auth",
          expiry: Date.now() + 1000 * 60 * 60,
        })
      );
      localStorage.setItem("isAdminLoggedIn", "true");

      navigate("/admin/dashboard", { replace: true });

    } catch (err) {
      console.error(err);
      setError("Server error. Try again.");
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center relative overflow-hidden"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-0"></div>

      <div className="relative z-10 w-full max-w-md p-8 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-white/20 bg-white/80 backdrop-blur-xl overflow-hidden">
        <div className="text-center mb-8 relative">
          <div className="inline-flex p-3 rounded-2xl bg-blue-600/10 mb-4 backdrop-blur-sm shadow-sm">
            <GraduationCap className="w-10 h-10 text-blue-700" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">University Portal</h2>
          <p className="text-slate-600 font-medium mt-2 text-sm">Faculty & Administrator Login</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-100 border border-red-200 text-red-700 text-sm rounded-lg text-center animate-entry font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 relative">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="email"
              required
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200/60 bg-white/50"
              placeholder="university.email@edu"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="password"
              required
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200/60 bg-white/50"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-700 to-indigo-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Authenticating...
              </>
            ) : (
              'Secure Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
