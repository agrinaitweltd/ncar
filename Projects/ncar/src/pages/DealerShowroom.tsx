import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShieldCheck, MapPin, Phone, Mail, Globe, MessageCircle, Briefcase, Sparkles, Car, CheckCircle2 } from 'lucide-react';
import { Dealer, Vehicle } from "../types/index";
import { VehicleCard } from "../components/VehicleCard";

export const DealerShowroom = ({ dealers, vehicles }: { dealers: Dealer[], vehicles: Vehicle[] }) => {
  const { id } = useParams();
  const d = dealers.find(x => x.id === id);
  const items = vehicles.filter(v => v.dealerId === id && v.status === 'LIVE');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!d) return <div className="p-40 text-center font-black">Dealership profile not found.</div>;
  
  // Parallax calculations
  const logoTranslateY = Math.min(scrollY * 0.15, 50);
  const logoScale = Math.max(1 - scrollY * 0.0005, 0.85);

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12 animate-in fade-in duration-1000">
       {/* Enhanced Profile Hero */}
       <div className="relative bg-white rounded-[4rem] border border-slate-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] overflow-hidden mb-24 group">
          {/* Parallax Background Accent */}
          <div className="absolute inset-0 bg-slate-50/30 overflow-hidden pointer-events-none">
             <div 
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-5 blur-[120px]"
               style={{ transform: `translate(-50%, calc(-50% + ${scrollY * 0.2}px))` }}
             >
                <img src={d.logo} className="w-full h-full object-contain" alt="" />
             </div>
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16 p-12 md:p-24">
            {/* Prominent Logo Section */}
            <div className="relative shrink-0">
              <div 
                className="relative z-20"
                style={{ 
                  transform: `translateY(${logoTranslateY}px) scale(${logoScale})`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <div className="absolute inset-0 bg-orange-600/20 rounded-[4rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[4.5rem] p-2 bg-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] border-[12px] border-white ring-1 ring-slate-100 overflow-hidden group/logo">
                   <img 
                    src={d.logo} 
                    className="w-full h-full object-cover rounded-[3.5rem] group-hover/logo:scale-110 transition-transform duration-[3s] ease-out" 
                    alt={d.name} 
                  />
                </div>
                
                {/* Floating Status Indicator */}
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-[2rem] shadow-2xl border border-slate-50 flex items-center gap-3 animate-bounce shadow-orange-600/10">
                   <div className="w-10 h-10 bg-green-500 rounded-2xl flex items-center justify-center text-white">
                      <ShieldCheck className="w-6 h-6" />
                   </div>
                   <div className="pr-4">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Security Status</p>
                      <p className="text-xs font-black text-slate-900 uppercase">URS-Verified</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Information Hub */}
            <div className="flex-1 text-center lg:text-left space-y-10">
               <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
                    {d.status === 'VERIFIED_DEALER' && (
                      <span className="bg-orange-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-xl shadow-orange-600/20">
                        <Sparkles className="w-3.5 h-3.5" /> Nexa Gold Partner
                      </span>
                    )}
                    <span className="bg-white border border-slate-200 text-slate-400 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Authorized Showroom
                    </span>
                  </div>
                  
                  <h1 className="editorial-heading text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85]">
                    {d.name}
                  </h1>
                  
                  <div className="flex items-center gap-4 justify-center lg:justify-start">
                     <div className="h-1 w-12 bg-orange-600 rounded-full"></div>
                     <p className="text-xl text-slate-500 font-medium italic">Premium verified automotive inventory in {d.district}.</p>
                  </div>
               </div>
               
               {/* Contact Grid with Better Visibility */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                  <div className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 flex items-center gap-6 group/item hover:bg-white hover:shadow-xl hover:border-orange-100 transition-all duration-500">
                    <div className="w-12 h-12 bg-white text-orange-600 rounded-2xl flex items-center justify-center shadow-sm group-hover/item:scale-110 group-hover/item:rotate-12 transition">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1">Physical Site</p>
                       <p className="text-[13px] font-black text-slate-900 uppercase tracking-tight">{d.location}</p>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 flex items-center gap-6 group/item hover:bg-white hover:shadow-xl hover:border-orange-100 transition-all duration-500">
                    <div className="w-12 h-12 bg-white text-blue-600 rounded-2xl flex items-center justify-center shadow-sm group-hover/item:scale-110 group-hover/item:rotate-12 transition">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1">Direct Line</p>
                       <p className="text-[13px] font-black text-slate-900 uppercase tracking-tight">{d.phone}</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 flex items-center gap-6 group/item hover:bg-white hover:shadow-xl hover:border-orange-100 transition-all duration-500">
                    <div className="w-12 h-12 bg-white text-indigo-600 rounded-2xl flex items-center justify-center shadow-sm group-hover/item:scale-110 group-hover/item:rotate-12 transition">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1">Electronic Mail</p>
                       <p className="text-[13px] font-black text-slate-900 lowercase tracking-tight truncate">{d.email}</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 flex items-center gap-6 group/item hover:bg-white hover:shadow-xl hover:border-orange-100 transition-all duration-500">
                    <div className="w-12 h-12 bg-white text-green-600 rounded-2xl flex items-center justify-center shadow-sm group-hover/item:scale-110 group-hover/item:rotate-12 transition">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1">Status Level</p>
                       <p className="text-[13px] font-black text-slate-900 uppercase tracking-tight">Verified Merchant</p>
                    </div>
                  </div>
               </div>

               {/* Action Suite */}
               <div className="flex flex-col sm:flex-row gap-5 pt-4">
                  <a 
                    href={`https://wa.me/${d.whatsapp}`} 
                    className="group relative bg-orange-600 text-white pl-12 pr-6 py-6 rounded-[2.5rem] font-black shadow-2xl shadow-orange-600/30 flex items-center justify-center gap-6 hover:bg-slate-900 transition-all duration-500 active:scale-95"
                  >
                    <span className="uppercase tracking-[0.1em] text-xs">Direct WhatsApp Inquiry</span>
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                       <MessageCircle className="w-6 h-6" /> 
                    </div>
                  </a>
                  <button className="bg-white text-slate-900 px-12 py-6 rounded-[2.5rem] font-black border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center justify-center gap-4 hover:bg-slate-50 transition-all duration-500 active:scale-95">
                     <Phone className="w-5 h-5 text-orange-600" /> 
                     <span className="uppercase tracking-[0.1em] text-xs">Request Call Back</span>
                  </button>
               </div>
            </div>
          </div>
       </div>

       {/* Inventory Header */}
       <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
         <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Car className="w-5 h-5 text-orange-600" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Live Showroom</span>
            </div>
            <h2 className="editorial-heading text-5xl font-black text-slate-900 tracking-tighter">Current <span className="text-orange-600">Inventory.</span></h2>
            <div className="h-1.5 w-24 bg-orange-600/10 rounded-full"></div>
         </div>
         <div className="bg-slate-50 px-8 py-4 rounded-[1.5rem] border border-slate-100 text-[11px] font-black text-slate-400 uppercase tracking-widest">
            {items.length} Curated Units Managed by {d.name}
         </div>
       </div>

       {/* Results Grid */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {items.map((v, idx) => (
            <div key={v.id} className={`animate-in fade-in slide-in-from-bottom-4 duration-700 ${idx % 2 !== 0 ? 'lg:translate-y-8' : ''}`} style={{ animationDelay: `${idx * 100}ms` }}>
               <VehicleCard vehicle={v} />
            </div>
          ))}
          {items.length === 0 && (
            <div className="col-span-full py-48 text-center bg-slate-50 rounded-[5rem] border-2 border-dashed border-slate-100">
               <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-xl text-slate-200">
                 <Car className="w-12 h-12" />
               </div>
               <p className="text-slate-400 font-black italic uppercase tracking-[0.2em] text-xl">The showroom currently has no listed inventory.</p>
               <p className="text-slate-300 font-bold text-xs uppercase mt-4">Check back shortly for new verified arrivals.</p>
            </div>
          )}
       </div>
    </div>
  );
};