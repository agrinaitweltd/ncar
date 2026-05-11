
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sparkles, Activity, ShieldCheck, TrendingUp, Car, Navigation, Settings, MapPin, MessageCircle, Phone, Heart, CheckCircle2, ArrowLeft, Share2, Gauge, Fuel, Zap, Hash, Plus, Check, Calendar, Key, UserCheck, Wallet, Info, ArrowUpRight, Compass, Eye, Shield } from 'lucide-react';
import { Vehicle, Dealer, AppState } from "../types/index";
import { getCarInsight } from "../services/geminiService";
import { CURRENCY, BRAND_LOGOS } from "../config/constants";
import { InquiryModal } from "../components/InquiryModal";

export const VehicleDetailPage = ({ vehicles, dealers, state, toggleComparison }: { vehicles: Vehicle[], dealers: Dealer[], state: AppState, toggleComparison: (id: string) => void }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const v = vehicles.find(x => x.id === id);
  const d = dealers.find(x => x.id === v?.dealerId);
  const [insight, setInsight] = useState('');
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [viewMode, setViewMode] = useState<'buy' | 'rent'>('buy');
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  
  // Rental specific
  const [rentalDays, setRentalDays] = useState(1);
  const [rentalDate, setRentalDate] = useState(new Date().toISOString().split('T')[0]);

  const isComparing = state.comparisonIds?.includes(v?.id || '');

  useEffect(() => {
    if (v) {
      setLoadingInsight(true);
      getCarInsight(v).then(res => { setInsight(res); setLoadingInsight(false); });
      if (v.isRentalAvailable && (v.price === 0 || !v.price)) setViewMode('rent');
      window.scrollTo(0, 0);
    }
  }, [id, v]);

  if (!v) return (
    <div className="p-20 md:p-40 text-center animate-in fade-in duration-700">
      <Car className="w-16 md:w-20 h-16 md:h-20 text-slate-100 mx-auto mb-8" />
      <h2 className="text-2xl md:text-3xl font-black text-slate-300 uppercase tracking-widest">Unit Not Available</h2>
      <button onClick={() => navigate('/listings')} className="mt-8 text-orange-600 font-black uppercase tracking-widest hover:underline">Return to Showroom</button>
    </div>
  );

  const handleShare = async () => {
    const shareData = {
      title: `${v.year} ${v.make} ${v.model} | Nexa Trader`,
      text: `Check out this verified ${v.make} on Nexa Trader Uganda!`,
      url: window.location.href,
    };
    if (navigator.share) { try { await navigator.share(shareData); } catch {} } 
    else { navigator.clipboard.writeText(window.location.href); alert('Link copied!'); }
  };

  const handleWhatsApp = (isRental = false) => {
    if (!d) return;
    let text = "";
    if (isRental) {
       const total = (v.dailyRate || 0) * rentalDays;
       text = `Hello ${d.name}, I want to hire the ${v.year} ${v.make} ${v.model} (${v.rentalType}) from ${rentalDate} for ${rentalDays} day(s). Est. Total: ${CURRENCY} ${total.toLocaleString()}.`;
    } else {
       text = `Hello ${d.name}, I'm interested in the ${v.year} ${v.make} ${v.model} priced at ${CURRENCY} ${v.price.toLocaleString()}. Is it available for viewing?`;
    }
    window.open(`https://wa.me/${d.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleInquirySent = (msg: string) => {
    console.log("Inquiry logged:", msg);
  };

  const brandLogo = BRAND_LOGOS[v.make];

  return (
    <div className="bg-white min-h-screen pt-20 md:pt-32 pb-24 md:pb-40 animate-in fade-in slide-in-from-bottom-2 duration-1000 overflow-x-hidden">
      {d && <InquiryModal 
        isOpen={isInquiryOpen} 
        onClose={() => setIsInquiryOpen(false)} 
        vehicle={v} 
        dealer={d} 
        onInquirySent={handleInquirySent} 
      />}
      
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        {/* Editorial Top Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 md:mb-16 gap-6 md:gap-8">
          <div className="flex items-center justify-between w-full md:w-auto gap-4 md:gap-6">
            <button onClick={() => navigate(-1)} className="group flex items-center gap-3 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-600 transition-all">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl border border-slate-100 flex items-center justify-center group-hover:border-orange-100 group-hover:bg-orange-50 transition-all">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="hidden sm:inline">Catalogue Access</span>
            </button>
            <div className="h-8 w-px bg-slate-100 hidden md:block"></div>
            <div className="flex items-center gap-2">
               <span className="text-[9px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest">Digital ID:</span>
               <span className="text-[9px] md:text-[10px] font-black text-slate-900 uppercase bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">{v.id.slice(-8)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 w-full md:w-auto">
             {v.isRentalAvailable && v.price > 0 && (
               <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-100 shadow-inner md:mr-4">
                  <button onClick={() => setViewMode('buy')} className={`px-4 md:px-8 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'buy' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>Purchase</button>
                  <button onClick={() => setViewMode('rent')} className={`px-4 md:px-8 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'rent' ? 'bg-white text-orange-600 shadow-lg' : 'text-slate-400'}`}>Hire</button>
               </div>
             )}
             <button onClick={() => toggleComparison(v.id)} className={`p-3 md:p-4 rounded-xl border transition-all flex items-center gap-2 md:gap-3 ${isComparing ? 'bg-orange-600 text-white border-orange-500 shadow-xl' : 'bg-white border-slate-100 text-slate-400 hover:border-orange-100 hover:text-orange-600'}`}>
                {isComparing ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest hidden sm:block">{isComparing ? 'Comparing' : 'Compare'}</span>
             </button>
             <button onClick={handleShare} className="p-3 md:p-4 bg-white rounded-xl border border-slate-100 text-slate-400 hover:text-blue-600 transition-all">
                <Share2 className="w-4 md:w-5 h-4 md:h-5" />
             </button>
             <button className="p-3 md:p-4 bg-white rounded-xl border border-slate-100 text-slate-400 hover:text-red-500 transition-all">
                <Heart className="w-4 md:w-5 h-4 md:h-5" />
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20 items-start">
          {/* Main Visual Column */}
          <div className="lg:col-span-7 space-y-8 md:space-y-12">
             <div className="relative aspect-[16/11] md:aspect-[16/10] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-xl bg-slate-50 group/stage">
                <img src={v.images[activeImg] || v.images[0]} className="w-full h-full object-cover transition-transform duration-[4s] group-hover/stage:scale-105" alt="Stage Frame" />
                {v.status === 'SOLD' && (
                  <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-10">
                    <div className="bg-red-600 text-white px-8 md:px-12 py-4 md:py-6 rounded-2xl font-black text-2xl md:text-4xl uppercase tracking-widest -rotate-3 border-2 md:border-4 border-white shadow-2xl">Sold Out</div>
                  </div>
                )}
                <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 bg-white/90 backdrop-blur-xl px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl border border-white shadow-xl z-20">
                   <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-900">Frame {activeImg + 1} / {v.images.length}</p>
                </div>
                <div className="absolute top-4 md:top-6 left-4 md:left-6 z-20">
                   <div className="bg-white/90 backdrop-blur-xl p-2 md:p-4 rounded-xl md:rounded-2xl border border-white shadow-xl flex items-center gap-3 md:gap-4">
                      <img src={brandLogo || ''} className="w-8 h-8 md:w-10 md:h-10 object-contain" alt="" />
                      <div>
                        <p className="text-[7px] md:text-[8px] font-black text-slate-400 uppercase tracking-widest">Technical Status</p>
                        <p className="text-[9px] md:text-xs font-black text-slate-900 uppercase">Verified</p>
                      </div>
                   </div>
                </div>
             </div>
             
             {/* Thumbnail Reel */}
             <div className="grid grid-cols-5 gap-3 md:gap-4">
               {v.images.map((img, i) => (
                 <button key={i} onClick={() => setActiveImg(i)} className={`aspect-square rounded-xl md:rounded-2xl overflow-hidden border-2 transition-all duration-500 shadow-md ${activeImg === i ? 'border-orange-600 scale-105 shadow-orange-600/10' : 'border-white opacity-60'}`}>
                    <img src={img} className="w-full h-full object-cover" alt="" />
                 </button>
               ))}
             </div>

             {/* Functional Manifest */}
             <div className="bg-slate-50/50 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 border border-slate-100 space-y-8 md:space-y-12">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm"><Settings className="w-5 md:w-6 h-5 md:h-6 text-orange-600" /></div>
                      <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter uppercase">Manifest</h3>
                   </div>
                   <div className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-400 bg-white px-3 md:px-5 py-2 rounded-lg md:rounded-xl border border-slate-100 flex items-center gap-2">
                     <ShieldCheck className="w-3 md:w-3.5 h-3 md:h-3.5 text-green-500" /> Inspected
                   </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 md:gap-y-10 gap-x-4 md:gap-x-8">
                   {[
                     { label: 'Engine', val: v.engineSize, icon: <Zap className="w-3.5 h-3.5" /> },
                     { label: 'Odometer', val: `${v.mileage.toLocaleString()} KM`, icon: <Gauge className="w-4 h-4" /> },
                     { label: 'Power', val: v.enginePower || 'N/A', icon: <Activity className="w-4 h-4" /> },
                     { label: 'Drive', val: v.driveTrain, icon: <Compass className="w-4 h-4" /> },
                     { label: 'Transmission', val: v.transmission, icon: <Navigation className="w-4 h-4" /> },
                     { label: 'Architecture', val: v.bodyType, icon: <Car className="w-4 h-4" /> },
                     { label: 'Capacity', val: `${v.seatingCapacity} Seats`, icon: <UserCheck className="w-4 h-4" /> },
                     { label: 'Fuel', val: v.fuelType, icon: <Fuel className="w-4 h-4" /> },
                     { label: 'Reg Status', val: v.regNumber || 'Registered', icon: <Hash className="w-4 h-4" /> },
                   ].map((spec, i) => (
                     <div key={i} className="group">
                        <div className="flex items-center gap-2 text-slate-300 transition-colors mb-1 md:mb-2">
                           {spec.icon}
                           <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest">{spec.label}</p>
                        </div>
                        <p className="text-sm md:text-lg font-black text-slate-900 tracking-tight">{spec.val}</p>
                     </div>
                   ))}
                </div>
                
                {insight && (
                  <div className="pt-6 md:pt-10 border-t border-slate-200">
                    <div className="flex items-center gap-3 mb-4 md:mb-6">
                      <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-orange-600" />
                      <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">AI Market Insights</h4>
                    </div>
                    <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm">
                       <p className="text-sm md:text-lg text-slate-600 font-medium italic leading-relaxed">{insight}</p>
                    </div>
                  </div>
                )}
             </div>
          </div>

          {/* Acquisition Dashboard Column */}
          <div className="lg:col-span-5 space-y-8 md:space-y-12 lg:sticky lg:top-32">
             <div className="space-y-6 md:space-y-8">
                <div className="flex flex-wrap items-center gap-4">
                   <div className="flex items-center gap-2">
                      <div className="bg-slate-900 text-white text-[8px] md:text-[9px] font-black px-3 py-1 rounded-md uppercase tracking-widest">{v.condition}</div>
                      {v.isVerified && <div className="bg-green-50 text-green-700 text-[8px] md:text-[9px] font-black px-3 py-1 rounded-md uppercase tracking-widest border border-green-100">Verified</div>}
                   </div>
                   <div className="flex items-center gap-2 text-slate-400 text-[8px] md:text-[9px] font-black uppercase tracking-widest">
                      <Eye className="w-3.5 h-3.5" /> {Math.floor(Math.random() * 50) + 10} Inquiries
                   </div>
                </div>
                
                <div className="space-y-3 md:space-y-4">
                   <h1 className="editorial-heading text-4xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">{v.year} {v.make} <br/><span className="text-orange-600 italic font-light">{v.model}</span></h1>
                   <div className="flex items-center gap-3 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-4 md:px-5 py-2 md:py-3 rounded-xl w-fit border border-slate-100">
                      <div className="flex items-center gap-2 border-r border-slate-200 pr-3 md:pr-4">
                        <div className="w-2 h-2 rounded-full bg-orange-400"></div> {v.color}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 md:w-3.5 h-3 md:h-3.5 text-orange-600" /> {v.location}
                      </div>
                   </div>
                </div>

                <div className="border-y border-slate-50 py-8 md:py-10">
                  {viewMode === 'buy' ? (
                     <div className="space-y-2">
                        <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Listing Valuation</p>
                        <p className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter flex items-start">
                          <span className="text-base md:text-xl mt-1 md:text-2xl mr-2 text-slate-300">{CURRENCY}</span>
                          {v.price.toLocaleString()}
                        </p>
                        <p className="text-[9px] md:text-[10px] font-black text-green-600 uppercase mt-4 flex items-center gap-2">
                           <Wallet className="w-4 h-4" /> Negotiable Pricing
                        </p>
                     </div>
                  ) : (
                    <div className="space-y-6 md:space-y-8">
                       <div className="space-y-2">
                          <p className="text-[9px] md:text-[10px] font-black text-blue-500 uppercase tracking-widest">Daily Hire Rate</p>
                          <p className="text-4xl md:text-6xl font-black text-blue-600 tracking-tighter flex items-start">
                             <span className="text-base md:text-xl mt-1 md:text-2xl mr-2 text-blue-200">{CURRENCY}</span>
                             {v.dailyRate?.toLocaleString()}
                             <span className="text-sm md:text-lg mt-auto ml-2 text-slate-300 uppercase tracking-widest">/ Day</span>
                          </p>
                       </div>
                       
                       <div className="bg-slate-50 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-slate-100 space-y-4 md:space-y-6">
                          <div className="grid grid-cols-2 gap-4 md:gap-6">
                             <div className="space-y-1.5">
                                <label className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Arrival Date</label>
                                <input type="date" value={rentalDate} onChange={e => setRentalDate(e.target.value)} className="w-full bg-white p-3 md:p-4 rounded-xl border border-slate-200 font-bold text-xs md:text-sm outline-none" />
                             </div>
                             <div className="space-y-1.5">
                                <label className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Days</label>
                                <input type="number" min="1" value={rentalDays} onChange={e => setRentalDays(Number(e.target.value))} className="w-full bg-white p-3 md:p-4 rounded-xl border border-slate-200 font-bold text-xs md:text-sm outline-none" />
                             </div>
                          </div>
                          <div className="pt-4 md:pt-6 border-t border-slate-200 flex justify-between items-center">
                             <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Cost</p>
                             <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">{CURRENCY} {((v.dailyRate || 0) * rentalDays).toLocaleString()}</p>
                          </div>
                       </div>
                    </div>
                  )}
                </div>
             </div>

             {/* Action Control Panel */}
             <div className="space-y-4 md:space-y-6 pb-12 lg:pb-0">
               {v.status !== 'SOLD' ? (
                 <div className="space-y-3 md:space-y-4">
                    {viewMode === 'buy' ? (
                      <button onClick={() => setIsInquiryOpen(true)} className="group w-full bg-slate-900 text-white p-6 md:p-8 rounded-2xl font-black hover:bg-orange-600 transition-all duration-500 shadow-xl active:scale-95 flex items-center justify-center gap-4 md:gap-5">
                         <MessageCircle className="w-6 md:w-7 h-6 md:h-7 fill-current transition-transform group-active:rotate-12" />
                         <span className="uppercase tracking-widest text-xs md:text-sm">Initiate Acquisition</span>
                         <ArrowUpRight className="w-4 md:w-5 h-4 md:h-5 opacity-40" />
                      </button>
                    ) : (
                      <button onClick={() => handleWhatsApp(true)} className="group w-full bg-[#25D366] text-white p-6 md:p-8 rounded-2xl font-black hover:bg-[#128C7E] transition-all duration-500 shadow-xl active:scale-95 flex items-center justify-center gap-4 md:gap-5">
                         <Key className="w-6 md:w-7 h-6 md:h-7 transition-transform group-active:rotate-12" />
                         <span className="uppercase tracking-widest text-xs md:text-sm">Secure Hire Order</span>
                         <ArrowUpRight className="w-4 md:w-5 h-4 md:h-5 opacity-40" />
                      </button>
                    )}
                    <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Encrypted Bond Gateway</p>
                 </div>
               ) : (
                 <div className="bg-red-50 p-8 rounded-[2rem] border border-red-100 text-center">
                    <p className="text-red-600 font-black text-xl md:text-2xl uppercase tracking-tighter">Inventory Exhausted</p>
                    <p className="text-red-400 text-[8px] font-bold uppercase tracking-widest mt-2">Check bond for new arrivals</p>
                 </div>
               )}
               
               {d && (
                 <div onClick={() => navigate(`/dealer/${d.id}`)} className="bg-white p-4 md:p-6 rounded-[2rem] flex items-center gap-4 md:gap-6 border border-slate-100 shadow-md hover:shadow-xl transition-all duration-500 group/dealer cursor-pointer">
                   <img src={d.logo} className="w-16 md:w-20 h-16 md:h-20 rounded-xl md:rounded-2xl object-cover border-2 border-slate-50 shadow-sm" alt="Showroom" />
                   <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                         <Shield className="w-3 h-3 text-orange-600" />
                         <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Verified Partner</p>
                      </div>
                      <h4 className="text-lg md:text-xl font-black text-slate-900 tracking-tight truncate">{d.name}</h4>
                      <p className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase truncate mt-0.5">{d.location}</p>
                   </div>
                 </div>
               )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
