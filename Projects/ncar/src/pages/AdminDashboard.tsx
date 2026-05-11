
import React, { useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { BarChart3, Briefcase, Users, Layers, FileText, Calendar, Activity, TrendingUp, Search, AlertCircle, ShieldCheck, X, FileCheck, Ban, Lock, ShieldAlert, Image as ImageIcon, Eye, ExternalLink, Download, ArrowUpRight, ArrowDownRight, Info, Shield, ShoppingCart, Key, Menu } from 'lucide-react';
import { Logo } from "../components/Logo";
import { AppState, Dealer, Vehicle, DealerStatus } from "../types/index";

export const AdminDashboard = ({ state, dealers, setDealers, vehicles, setVehicles }: { state: AppState, dealers: Dealer[], setDealers: any, vehicles: Vehicle[], setVehicles: any }) => {
  const [activeView, setActiveView] = useState<'overview' | 'dealers' | 'listings' | 'files'>('overview');
  const [dealerTab, setDealerTab] = useState<'PENDING' | 'VERIFIED'>('PENDING');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  if (!state.isAdminAuthenticated) return <Navigate to="/admin-login" />;

  const handleUpdateStatus = (id: string, status: DealerStatus) => {
    setDealers((prev: Dealer[]) => prev.map(d => d.id === id ? { ...d, status, isVerified: status === 'VERIFIED_DEALER' } : d));
  };

  const stats = {
    totalDealers: dealers.length,
    verified: dealers.filter(d => d.status === 'VERIFIED_DEALER').length,
    pending: dealers.filter(d => d.status === 'PENDING_VERIFICATION').length,
    listings: vehicles.length,
    liveUnits: vehicles.filter(v => v.status === 'LIVE').length,
    soldUnits: vehicles.filter(v => v.status === 'SOLD').length,
    rentals: vehicles.filter(v => v.isRentalAvailable).length
  };

  const navItems = [
    { id: 'overview', label: 'Market Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'dealers', label: 'Merchant Console', icon: <Briefcase className="w-5 h-5" />, badge: stats.pending },
    { id: 'listings', label: 'Inventory Desk', icon: <Layers className="w-5 h-5" /> },
    { id: 'files', label: 'Compliance Vault', icon: <Shield className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col lg:flex-row text-white font-inter animate-in fade-in duration-700 overflow-x-hidden">
      {/* Mobile Nav Bar */}
      <div className="lg:hidden bg-[#1E293B] p-4 flex items-center justify-between border-b border-white/5 sticky top-0 z-[120]">
         <Logo className="h-7" variant="white" />
         <button onClick={() => setIsSidebarOpen(true)} className="p-2 rounded-xl bg-slate-800 active:scale-95 transition-all">
            <Menu className="w-6 h-6" />
         </button>
      </div>

      {/* Responsive Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-80 bg-[#1E293B] flex flex-col p-8 md:p-10 shrink-0 border-r border-white/5 z-[130] transition-transform duration-500 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center justify-between mb-16">
          <Logo className="h-10" variant="white" />
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400">
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="space-y-4 flex-1">
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setActiveView(item.id as any); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-4 p-4 md:p-5 rounded-2xl md:rounded-3xl font-black uppercase text-[10px] tracking-[0.15em] transition-all ${activeView === item.id ? 'bg-blue-600 shadow-2xl shadow-blue-600/40 text-white translate-x-2' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              {item.icon}<span className="text-sm">{item.label}</span>{item.badge ? <span className="ml-auto bg-red-600 text-white text-[9px] px-2 py-1 rounded-full">{item.badge}</span> : null}
            </button>
          ))}
        </nav>
        <div className="mt-auto bg-slate-800/50 p-6 rounded-[2.5rem] border border-white/5">
           <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4">Admin Session</p>
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center font-black">OA</div>
              <div className="min-w-0"><p className="text-xs font-black truncate">Oliver Amanya</p><p className="text-[9px] text-green-500 font-black">ROOT ACCESS</p></div>
           </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[125] lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      <main className="flex-1 p-6 md:p-16 overflow-y-auto w-full">
        {activeView === 'overview' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6">
               <div>
                  <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2 md:mb-4">Nexa intelligence.</h1>
                  <p className="text-slate-400 font-medium italic text-lg md:text-xl">Pearl automotive analytics dashboard.</p>
               </div>
               <div className="bg-slate-800 p-4 md:p-5 rounded-2xl md:rounded-3xl border border-white/5 flex items-center gap-4 w-full md:w-auto">
                  <Activity className="text-blue-500 w-5 h-5 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Market Sync: OK</span>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10 mb-16">
               {[
                 { l: 'Verified Hubs', v: stats.verified, i: <Briefcase />, c: 'text-blue-500' },
                 { l: 'Live Inventory', v: stats.liveUnits, i: <Activity />, c: 'text-green-500' },
                 { l: 'Sold Units', v: stats.soldUnits, i: <ShoppingCart />, c: 'text-orange-500' },
                 { l: 'Rental Fleet', v: stats.rentals, i: <Key />, c: 'text-indigo-500' },
                 { l: 'Compliance', v: '98.2%', i: <Shield />, c: 'text-yellow-500' },
                 { l: 'Digital Assets', v: 'Active', i: <FileText />, c: 'text-white' },
               ].map((s, i) => (
                 <div key={i} className="bg-slate-800/40 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/5 group hover:bg-slate-800 transition-all duration-700">
                    <div className={`w-12 h-12 md:w-14 md:h-14 bg-slate-900 rounded-2xl flex items-center justify-center mb-6 md:mb-8 ${s.c} shadow-2xl`}>{s.i}</div>
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-2">{s.l}</p>
                    <h3 className="text-4xl md:text-5xl font-black tracking-tighter">{s.v}</h3>
                 </div>
               ))}
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] relative overflow-hidden group shadow-2xl">
               <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 md:mb-6 leading-none">Market Expansion Opportunity</h2>
                  <p className="text-blue-50 font-medium italic text-base md:text-xl max-w-2xl leading-relaxed mb-8 md:mb-10">AI diagnostics reveal a 12% surge in inquiry traffic from Gulu District. Verified partner outreach recommended.</p>
                  <button className="bg-white text-slate-900 px-8 md:px-12 py-4 md:py-6 rounded-full font-black uppercase text-[10px] md:text-xs tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-2xl active:scale-95">Initiate Strategy</button>
               </div>
            </div>
          </div>
        )}

        {activeView === 'dealers' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 md:mb-12">Merchant Portal</h1>
            <div className="flex gap-3 md:gap-4 mb-8 md:mb-10 overflow-x-auto pb-2 scrollbar-hide">
               {['PENDING', 'VERIFIED'].map(t => (
                 <button key={t} onClick={() => setDealerTab(t as any)} className={`px-8 md:px-10 py-3 md:py-4 rounded-full font-black uppercase tracking-widest text-[10px] md:text-[11px] transition-all whitespace-nowrap ${dealerTab === t ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>{t}</button>
               ))}
            </div>
            
            <div className="bg-slate-800/40 rounded-3xl md:rounded-[3.5rem] border border-white/5 overflow-hidden shadow-2xl">
               <div className="overflow-x-auto w-full custom-scrollbar">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                     <thead className="bg-slate-800/80 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border-b border-white/5">
                        <tr><th className="px-8 md:px-12 py-6 md:py-8">Merchant</th><th className="px-8 md:px-12 py-6 md:py-8">Status</th><th className="px-8 md:px-12 py-6 md:py-8">Vault</th><th className="px-8 md:px-12 py-6 md:py-8 text-right">Action</th></tr>
                     </thead>
                     <tbody className="divide-y divide-white/5">
                        {dealers.filter(d => (dealerTab === 'PENDING' ? d.status === 'PENDING_VERIFICATION' : d.status === 'VERIFIED_DEALER')).map(d => (
                          <tr key={d.id} className="hover:bg-white/5 transition-all group">
                             <td className="px-8 md:px-12 py-6 md:py-10">
                               <div className="flex items-center gap-4 md:gap-6">
                                 <img src={d.logo} className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl object-cover border-2 md:border-4 border-slate-700 shadow-xl" />
                                 <p className="text-base md:text-xl font-black tracking-tight">{d.name}</p>
                               </div>
                             </td>
                             <td className="px-8 md:px-12 py-6 md:py-10"><span className="text-[9px] md:text-[10px] font-black px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-green-500/10 text-green-500 border border-green-500/20 uppercase tracking-widest">{d.paymentStatus}</span></td>
                             <td className="px-8 md:px-12 py-6 md:py-10"><button className="flex items-center gap-2 text-blue-400 font-black text-[10px] uppercase underline"><FileText className="w-3 h-3" /> Vault</button></td>
                             <td className="px-8 md:px-12 py-6 md:py-10 text-right">
                                {dealerTab === 'PENDING' && <button onClick={() => handleUpdateStatus(d.id, 'VERIFIED_DEALER')} className="bg-green-600 hover:bg-green-700 text-white px-6 md:px-8 py-2 md:py-3 rounded-xl md:rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all active:scale-95">Authorize</button>}
                                {dealerTab === 'VERIFIED' && <button onClick={() => handleUpdateStatus(d.id, 'REJECTED')} className="bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white px-6 md:px-8 py-2 md:py-3 rounded-xl md:rounded-2xl font-black text-[10px] uppercase tracking-widest border border-red-600/20 transition-all active:scale-95">Revoke</button>}
                             </td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
          </div>
        )}

        {(activeView === 'listings' || activeView === 'files') && (
           <div className="animate-in fade-in slide-in-from-right-4 duration-500 py-32 md:py-40 text-center">
              <ShieldAlert className="w-16 md:w-20 h-16 md:h-20 text-slate-800 mx-auto mb-8" />
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter opacity-20 uppercase">Module Locked</h2>
              <p className="text-slate-600 font-medium italic mt-4">Full access expected in core v3.2.1-stable release.</p>
           </div>
        )}
      </main>
    </div>
  );
};
