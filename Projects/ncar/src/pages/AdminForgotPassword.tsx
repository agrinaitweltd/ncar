
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, ShieldCheck, Activity, CheckCircle2 } from 'lucide-react';
import { Logo } from "../components/Logo";

export const AdminForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-[3rem] p-10 md:p-14 shadow-2xl animate-in zoom-in duration-500 relative overflow-hidden border border-white/10">
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        
        <div className="flex flex-col items-center mb-10">
          <Logo className="h-16 mb-4" />
          <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-5 py-2 rounded-full shadow-sm border border-blue-100">
             <ShieldCheck className="w-4 h-4" />
             <span className="text-[10px] font-black uppercase tracking-[0.15em]">Identity Recovery</span>
          </div>
        </div>

        {submitted ? (
          <div className="text-center space-y-6 animate-in fade-in duration-500">
            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl border-4 border-white transform rotate-3">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Recovery Link Sent</h2>
            <p className="text-gray-500 font-medium italic text-sm leading-relaxed">
              We've dispatched a secure reset link to <span className="text-blue-600 font-bold">{email}</span>. Please authorize within 15 minutes.
            </p>
            <div className="pt-6">
              <Link to="/admin-login" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Return to Login
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Reset Password</h2>
              <p className="text-gray-400 text-xs font-medium italic">Enter your administrative email to receive a recovery token.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2 group">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-2">Internal Email</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    type="email" 
                    required 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    className="w-full bg-gray-50 p-5 pl-14 rounded-[2rem] outline-none font-bold text-sm border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all shadow-inner" 
                    placeholder="oliver.amanya1@gmail.com" 
                  />
                </div>
              </div>

              <button 
                disabled={loading} 
                className="w-full bg-blue-600 text-white p-6 rounded-[2rem] font-black hover:bg-blue-700 hover:shadow-xl transition-all shadow-lg shadow-blue-600/30 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? <Activity className="w-6 h-6 animate-spin" /> : <ShieldCheck className="w-6 h-6" />}
                <span className="uppercase tracking-widest text-sm">{loading ? 'Processing...' : 'Send Reset Link'}</span>
              </button>

              <div className="text-center">
                <Link to="/admin-login" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-colors group">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                  Back to Auth
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
