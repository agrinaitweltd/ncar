
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Car, Briefcase, ArrowRight, Play, ShieldCheck, Sparkles, Key, MapPin, Globe, SlidersHorizontal, Star } from 'lucide-react';
import { CAR_MAKES, UGANDA_DISTRICTS } from "../config/constants";
import { Vehicle } from "../types/index";
import { VehicleGridSection } from "../components/VehicleGridSection";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { Logo } from "../components/Logo";
import { BrandMarquee } from "../components/BrandMarquee";

export const HomePage = ({ vehicles }: { vehicles: Vehicle[] }) => {
  const [searchParams, setSearchParams] = useState({ make: 'All Makes', location: 'Uganda - All' });
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (searchParams.make !== 'All Makes') query.append('make', searchParams.make);
    if (searchParams.location !== 'Uganda - All') query.append('location', searchParams.location);
    navigate(`/listings?${query.toString()}`);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800';
  };
  
  return (
    <div className="bg-white">
      {/* Editorial Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-[95vh] flex items-center pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden">
        {/* Background Aesthetics */}
        <div className="absolute top-0 inset-x-0 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-50/50 via-white to-white opacity-60"></div>
        <div className="absolute top-1/4 -right-24 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-orange-200/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 md:space-y-12 stagger-in">
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-px w-8 bg-orange-600"></div>
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-orange-600 font-heading">Nexa Protocol</span>
                </div>
                <h1 className="editorial-heading text-4xl sm:text-6xl md:text-[90px] lg:text-[110px] font-extrabold text-slate-900 tracking-tighter leading-[1] md:leading-[0.9]">
                  Uganda’s Elite <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-600 to-orange-400 italic font-light">Auto Exchange.</span>
                </h1>
                <p className="text-sm sm:text-lg md:text-2xl text-slate-500 font-medium max-w-lg leading-relaxed border-l-2 border-slate-100 pl-4 md:pl-8">
                  Verified destination for prestige automotive assets and bespoke concierge rental services.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-6">
                <Link to="/listings" className="group relative flex items-center justify-center gap-4 bg-slate-900 text-white px-8 md:px-10 py-4 sm:py-5 md:py-6 rounded-2xl text-[11px] md:text-[13px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all duration-500 shadow-xl active:scale-95 overflow-hidden">
                  <span className="relative z-10">Browse Catalog</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </Link>
                <Link to="/rentals" className="flex items-center justify-center gap-3 px-8 md:px-10 py-4 sm:py-5 md:py-6 rounded-2xl border-2 border-slate-100 text-slate-900 text-[11px] md:text-[13px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all group active:scale-95">
                   <Key className="w-5 h-5 text-orange-600" />
                   Rent Now
                </Link>
              </div>

              {/* Verified Trust Stats */}
              <div className="flex items-center gap-6 sm:gap-12 pt-2 md:pt-4">
                <div className="flex flex-col">
                   <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tighter font-heading leading-none">1.2k+</p>
                   <p className="text-[7px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Inventory</p>
                </div>
                <div className="w-px h-8 md:h-12 bg-slate-100"></div>
                <div className="flex flex-col">
                   <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tighter font-heading leading-none">42</p>
                   <p className="text-[7px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Bonds</p>
                </div>
                <div className="hidden xs:flex items-center gap-2 ml-2 md:ml-4 bg-orange-50 px-3 md:px-4 py-1.5 md:py-2 rounded-xl border border-orange-100">
                  <div className="flex -space-x-1">
                    {[1,2].map(i => <div key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border-2 border-orange-50 bg-slate-200"></div>)}
                  </div>
                  <span className="text-[7px] md:text-[8px] font-black text-orange-600 uppercase tracking-widest">Live Hub</span>
                </div>
              </div>
            </div>

            {/* Right Side - Media & Search Hub */}
            <div className="lg:col-span-6 relative mt-6 md:mt-0">
              <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-100 border-[1px] border-slate-100 group/hero">
                <img 
                  src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1500" 
                  className="w-full h-full object-cover group-hover/hero:scale-105 transition-transform duration-[4s] ease-out" 
                  alt="Elite Vehicle" 
                  loading="eager"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
                
                {/* RECTANGULAR PRECISION SEARCH HUB */}
                <div className="absolute bottom-3 md:bottom-6 inset-x-3 md:inset-x-6 z-20">
                  <div className="glass-card rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 animate-in slide-in-from-bottom-8 duration-1000 bg-white/80 md:bg-white/90">
                    <div className="flex items-center justify-between mb-4 md:mb-6">
                       <h3 className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2 font-heading">
                         <SlidersHorizontal className="w-3 md:w-3.5 h-3 md:h-3.5" /> Discovery Engine
                       </h3>
                       <div className="flex gap-1 items-center">
                          <span className="text-[7px] md:text-[8px] font-black text-orange-600 uppercase tracking-widest">Global Sync</span>
                          <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-orange-600 animate-pulse"></div>
                       </div>
                    </div>

                    <form onSubmit={handleSearch} className="flex flex-col gap-3 md:gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        <div className="space-y-1">
                          <label className="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-slate-400 ml-1">Make</label>
                          <div className="relative">
                            <Car className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 md:w-4 h-3.5 md:h-4 text-slate-400 pointer-events-none" />
                            <select 
                              value={searchParams.make}
                              onChange={e => setSearchParams({...searchParams, make: e.target.value})}
                              className="w-full bg-white/50 border border-slate-200/50 rounded-xl py-3 md:py-4 pl-10 pr-4 text-[12px] md:text-[13px] font-bold text-slate-900 outline-none focus:ring-2 focus:ring-orange-600/20 transition-all appearance-none cursor-pointer"
                            >
                              <option>All Makes</option>
                              {CAR_MAKES.map(make => <option key={make}>{make}</option>)}
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-slate-400 ml-1">Location</label>
                          <div className="relative">
                            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 md:w-4 h-3.5 md:h-4 text-slate-400 pointer-events-none" />
                            <select 
                              value={searchParams.location}
                              onChange={e => setSearchParams({...searchParams, location: e.target.value})}
                              className="w-full bg-white/50 border border-slate-200/50 rounded-xl py-3 md:py-4 pl-10 pr-4 text-[12px] md:text-[13px] font-bold text-slate-900 outline-none focus:ring-2 focus:ring-orange-600/20 transition-all appearance-none cursor-pointer"
                            >
                              <option>Uganda - All</option>
                              {UGANDA_DISTRICTS.map(d => <option key={d}>{d}</option>)}
                            </select>
                          </div>
                        </div>
                      </div>

                      <button className="w-full bg-slate-900 hover:bg-orange-600 text-white py-4 md:py-5 rounded-xl flex items-center justify-center gap-3 transition-all duration-500 font-black uppercase text-[10px] md:text-[11px] tracking-widest active:scale-95 shadow-lg group/btn">
                        <Search className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                        Execute Discovery
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <div className="relative z-10 -mt-6 md:-mt-10">
        <VehicleGridSection vehicles={vehicles} />
      </div>

      <BrandMarquee />
      <WhyChooseUs />

      {/* Final CTA */}
      <section className="py-20 md:py-40 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-orange-600/10 rounded-full blur-[100px] md:blur-[150px] -mr-48 -mt-48"></div>
        
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 relative z-10 text-center space-y-8 md:space-y-12">
           <div className="space-y-4">
             <h2 className="editorial-heading text-3xl sm:text-5xl md:text-8xl font-black tracking-tighter leading-none">
               Own Your Signature <br/>
               <span className="italic font-light opacity-50">Masterpiece.</span>
             </h2>
             <p className="text-slate-400 text-sm md:text-xl font-medium max-w-xl mx-auto italic">
               The Pearl's most prestigious automotive marketplace, updated daily with verified inventory.
             </p>
           </div>
           
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 px-4 sm:px-0">
              <Link to="/listings" className="group w-full sm:w-auto bg-orange-600 text-white px-8 md:px-16 py-4 md:py-7 rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-widest hover:bg-white hover:text-slate-900 transition-all duration-500 shadow-2xl flex items-center justify-center gap-4 active:scale-95">
                Full Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/signup" className="w-full sm:w-auto bg-transparent border-2 border-white/20 text-white px-8 md:px-16 py-4 md:py-7 rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-widest hover:bg-white hover:text-slate-900 transition-all duration-500 active:scale-95">
                Bond Registration
              </Link>
           </div>
        </div>
      </section>
    </div>
  );
};
