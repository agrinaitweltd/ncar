
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, EyeOff, Eye, AlertCircle, Activity, ShieldCheck } from 'lucide-react';
import { Logo } from "../components/Logo";

export const AdminLogin = ({ setState }: { setState: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
       setError('Identity validation required.');
       return;
    }

    setLoading(true);
    
    setTimeout(() => {
      // Updated credentials as requested: email: oliver.amanya1@gmail.com, password: Ollya1#234
      if (email === 'oliver.amanya1@gmail.com' && password === 'Ollya1#234') {
        setState((prev: any) => ({ 
          ...prev, 
          userType: 'admin', 
          isAdminAuthenticated: true,
          userId: 'admin-1',
          userData: { id: 'admin-1', name: 'Oliver Amanya', email: 'oliver.amanya1@gmail.com', role: 'admin' }
        }));
        navigate('/admin/dashboard');
      } else {
        setError('Unauthorized access. Invalid credentials.');
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-[3rem] p-10 md:p-14 shadow-2xl animate-in zoom-in duration-500 relative overflow-hidden border border-white/10">
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        <div className="flex flex-col items-center mb-12">
          <Logo className="h-16 mb-4" />
          <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-5 py-2 rounded-full shadow-sm border border-blue-100">
             <ShieldCheck className="w-4 h-4" />
             <span className="text-[10px] font-black uppercase tracking-[0.15em]">Admin Core v3</span>
          </div>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2 group">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-2">Internal Email</label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-gray-50 p-5 pl-14 rounded-[2rem] outline-none font-bold text-sm border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all shadow-inner" placeholder="oliver.amanya1@gmail.com" />
            </div>
          </div>
          <div className="space-y-2 group">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Secure Passkey</label>
              {/* Removed invalid 'size' prop from Link component below */}
              <Link to="/admin/forgot-password" className="text-[10px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest transition-colors">Forgot Password?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
              <input type={showPassword ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-gray-50 p-5 pl-14 pr-14 rounded-[2rem] outline-none font-bold text-sm border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all shadow-inner" placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-blue-500 transition-colors">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
            </div>
          </div>
          {error && <div className="bg-red-50 p-4 rounded-2xl flex items-center gap-3 border border-red-100 animate-in slide-in-from-top-2"><AlertCircle className="w-5 h-5 text-red-500 shrink-0" /><p className="text-red-600 text-[10px] font-black uppercase tracking-widest leading-relaxed">{error}</p></div>}
          <button disabled={loading} className="w-full bg-blue-600 text-white p-6 rounded-[2rem] font-black hover:bg-blue-700 hover:shadow-xl transition-all shadow-lg shadow-blue-600/30 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50">
            {loading ? <Activity className="w-6 h-6 animate-spin" /> : <ShieldCheck className="w-6 h-6" />}
            <span className="uppercase tracking-widest text-sm">{loading ? 'Verifying...' : 'Authorize Access'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
