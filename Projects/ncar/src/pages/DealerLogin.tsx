
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, AlertCircle } from 'lucide-react';
import { Logo } from "../components/Logo";
import { Dealer } from "../types/index";

export const DealerLogin = ({ dealers, setState }: { dealers: Dealer[], setState: any }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    setTimeout(() => {
      const existingDealer = dealers.find(d => d.email.toLowerCase() === formData.email.toLowerCase());
      if (existingDealer) {
        // In a real app we'd verify password, but for this demo any non-empty password works for existing email
        setState((prev: any) => ({
          ...prev,
          userType: 'dealer',
          userId: existingDealer.id,
          userData: existingDealer
        }));
        navigate('/dashboard');
      } else {
        setError('No showroom found with this identity. Please register first.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-20 animate-in fade-in duration-500">
      <div className="bg-white max-w-4xl w-full rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        <div className="bg-orange-600 text-white p-12 md:w-5/12 hidden md:flex flex-col justify-center relative overflow-hidden">
          <div className="mb-10"><Logo className="h-16" variant="white" /></div>
          <h2 className="text-3xl font-black leading-tight mb-4">Welcome Back</h2>
          <p className="text-sm text-orange-100 font-medium italic">Manage your digital car dealership.</p>
        </div>
        <div className="p-8 md:p-14 md:w-7/12 flex flex-col justify-center">
          <h2 className="text-3xl font-black text-gray-900 mb-2">Dealer Sign In</h2>
          <p className="text-gray-500 text-sm mb-10">Pearl of Africa car network.</p>
          <form onSubmit={handleSignIn} className="space-y-5">
            <div className="relative group">
              <label className="absolute -top-2 left-4 bg-white px-2 text-[9px] font-black text-gray-400 uppercase tracking-widest z-10">Email Address</label>
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white p-4 rounded-2xl outline-none font-bold text-sm border-2 border-gray-100 focus:border-orange-500 transition-all shadow-sm" placeholder="dealer@email.com" />
            </div>
            <div className="relative group">
              <label className="absolute -top-2 left-4 bg-white px-2 text-[9px] font-black text-gray-400 uppercase tracking-widest z-10">Password</label>
              <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-white p-4 rounded-2xl outline-none font-bold text-sm border-2 border-gray-100 focus:border-orange-500 transition-all shadow-sm" placeholder="••••••••" />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-xl border border-red-100 animate-in slide-in-from-top-1">
                <AlertCircle className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">{error}</span>
              </div>
            )}
            <div className="text-right"><button type="button" className="text-[10px] font-black text-gray-400 hover:text-orange-600 uppercase tracking-widest transition">Forgot Passphrase?</button></div>
            <button disabled={loading} className="w-full bg-orange-600 text-white p-5 rounded-[2rem] font-black hover:bg-orange-700 hover:shadow-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
              {loading ? <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div> : <Lock className="w-5 h-5" />}
              <span className="uppercase tracking-widest text-xs">{loading ? 'Processing...' : 'Enter Showroom'}</span>
            </button>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500 font-bold">New? <Link to="/signup" className="text-orange-600 ml-2 hover:underline font-black">Join as Dealer</Link></p>
        </div>
      </div>
    </div>
  );
};
