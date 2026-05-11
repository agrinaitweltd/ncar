
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, ShieldCheck, Zap, Fuel, Gauge, Navigation, CheckCircle2, X } from 'lucide-react';
import { Vehicle } from "../types/index";
import { CURRENCY, BRAND_LOGOS } from "../config/constants";

export const ComparePage = ({ vehicles, comparisonIds, toggleComparison, clearComparison }: { vehicles: Vehicle[], comparisonIds: string[], toggleComparison: (id: string) => void, clearComparison: () => void }) => {
  const navigate = useNavigate();
  const selectedVehicles = vehicles.filter(v => comparisonIds.includes(v.id));

  if (comparisonIds.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 py-40">
        <div className="w-32 h-32 bg-slate-50 rounded-[3rem] flex items-center justify-center mb-8 border border-slate-100 shadow-inner">
           <Zap className="w-12 h-12 text-slate-200" />
        </div>
        <h2 className="editorial-heading text-5xl font-black text-slate-900 tracking-tighter mb-4">No Units to Compare.</h2>
        <p className="text-slate-500 italic mb-10 text-center max-w-sm">Explore the catalogue and add vehicles to your comparison list to see them side-by-side.</p>
        <Link to="/listings" className="bg-orange-600 text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-2xl shadow-orange-600/20">Browse Catalogue</Link>
      </div>
    );
  }

  const specs = [
    { label: 'Price', key: 'price', format: (v: number) => `${CURRENCY} ${v.toLocaleString()}`, icon: null },
    { label: 'Year', key: 'year', icon: null },
    { label: 'Mileage', key: 'mileage', format: (v: number) => `${v.toLocaleString()} km`, icon: <Gauge className="w-4 h-4" /> },
    { label: 'Engine Size', key: 'engineSize', icon: <Zap className="w-4 h-4" /> },
    { label: 'Fuel Type', key: 'fuelType', icon: <Fuel className="w-4 h-4" /> },
    { label: 'Transmission', key: 'transmission', icon: <Navigation className="w-4 h-4" /> },
    { label: 'Condition', key: 'condition', icon: null },
    { label: 'Location', key: 'location', icon: null },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-32 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
        <div className="space-y-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-600 transition-colors">
            <ArrowLeft className="w-5 h-5" /> Return to Listings
          </button>
          <h1 className="editorial-heading text-7xl font-black text-slate-900 tracking-tighter leading-none">
            Vehicle <br/>
            <span className="italic font-light text-slate-400">Comparison.</span>
          </h1>
        </div>
        <button 
          onClick={clearComparison}
          className="bg-slate-50 text-slate-500 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest border border-slate-100 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all flex items-center gap-3"
        >
          <Trash2 className="w-4 h-4" /> Clear All
        </button>
      </div>

      <div className="overflow-x-auto custom-scrollbar pb-10">
        <div className="min-w-[1000px] flex gap-8">
          {selectedVehicles.map(v => (
            <div key={v.id} className="flex-1 min-w-[300px] flex flex-col group">
               <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden mb-10 border border-slate-100 shadow-xl group-hover:shadow-2xl transition-all duration-700">
                  <img src={v.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" alt="" />
                  <div className="absolute top-6 left-6 flex gap-2">
                    <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl p-1.5 flex items-center justify-center border border-white">
                       <img src={BRAND_LOGOS[v.make]} className="w-full h-full object-contain" alt="" />
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleComparison(v.id)}
                    className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-sm rounded-2xl text-slate-400 hover:text-red-500 transition-all shadow-sm border border-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  <div className="absolute bottom-8 left-8">
                     <p className="text-white/60 text-[9px] font-black uppercase tracking-widest mb-1">{v.condition}</p>
                     <h4 className="text-white text-2xl font-black tracking-tight leading-none">{v.year} {v.make} {v.model}</h4>
                  </div>
               </div>

               <div className="space-y-6 flex-grow">
                 {specs.map((spec, i) => {
                   const value = (v as any)[spec.key];
                   return (
                     <div key={i} className={`p-6 rounded-[2rem] border transition-all ${i % 2 === 0 ? 'bg-slate-50 border-transparent' : 'bg-white border-slate-100'} group-hover:border-orange-100`}>
                        <div className="flex items-center gap-2 mb-2">
                           {spec.icon && <span className="text-orange-600">{spec.icon}</span>}
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{spec.label}</p>
                        </div>
                        <p className={`font-black tracking-tight ${spec.key === 'price' ? 'text-2xl text-slate-900' : 'text-slate-700'}`}>
                          {spec.format ? spec.format(value) : value}
                        </p>
                     </div>
                   );
                 })}

                 <div className="space-y-3 pt-6">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">Top Features</p>
                    <div className="flex flex-wrap gap-2">
                      {v.features.slice(0, 4).map((f, i) => (
                        <span key={i} className="px-3 py-1.5 bg-white border border-slate-100 rounded-lg text-[9px] font-bold text-slate-500 uppercase flex items-center gap-1.5">
                           <CheckCircle2 className="w-3 h-3 text-green-500" /> {f}
                        </span>
                      ))}
                    </div>
                 </div>

                 <div className="pt-10">
                    <Link to={`/vehicle/${v.id}`} className="w-full bg-slate-900 text-white p-6 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95">
                       View Unit Details
                    </Link>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
