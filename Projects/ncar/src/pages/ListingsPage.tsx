
import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Vehicle } from "../types/index";
import { VehicleCard } from "../components/VehicleCard";
import { ChevronLeft, ArrowRight, Sparkles, Filter, X, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { BRAND_LOGOS, FUEL_TYPES, TRANSMISSIONS, CONDITIONS, CURRENCY, CAR_MAKES } from "../config/constants";

export const ListingsPage = ({ vehicles, toggleComparison, comparisonIds }: { vehicles: Vehicle[], toggleComparison: (id: string) => void, comparisonIds: string[] }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const qMake = queryParams.get('make');
  const qLoc = queryParams.get('location');

  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Advanced Filters
  const [filters, setFilters] = useState({
    priceMax: 1000000000,
    yearMin: 2000,
    condition: 'All',
    fuel: 'All',
    transmission: 'All'
  });

  // Sync brand selection with URL parameters
  useEffect(() => {
    if (qMake && qMake !== 'All Makes') {
      setSelectedBrand(qMake);
    } else if (!qMake) {
      setSelectedBrand(null);
    }
  }, [qMake, location.pathname]);

  // Sync brand counts across the platform
  const brands = useMemo(() => {
    const activeVehicles = vehicles.filter(v => v.status === 'LIVE');
    const brandCounts: Record<string, number> = {};
    activeVehicles.forEach(v => {
      brandCounts[v.make] = (brandCounts[v.make] || 0) + 1;
    });

    return CAR_MAKES.map(name => ({ 
      name, 
      count: brandCounts[name] || 0,
      logo: BRAND_LOGOS[name] || 'https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/car-generic.png'
    })).sort((a, b) => (b.count > 0 ? 1 : 0) - (a.count > 0 ? 1 : 0) || a.name.localeCompare(b.name));
  }, [vehicles]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(v => {
      const matchBrand = !selectedBrand || v.make === selectedBrand;
      const matchLoc = !qLoc || qLoc === 'Uganda - All' || v.location.includes(qLoc);
      const matchPrice = v.price <= filters.priceMax;
      const matchYear = v.year >= filters.yearMin;
      const matchCondition = filters.condition === 'All' || v.condition === filters.condition;
      const matchFuel = filters.fuel === 'All' || v.fuelType === filters.fuel;
      const matchTrans = filters.transmission === 'All' || v.transmission === filters.transmission;
      
      return matchBrand && matchLoc && matchPrice && matchYear && matchCondition && matchFuel && matchTrans && v.status === 'LIVE';
    });
  }, [vehicles, selectedBrand, qLoc, filters]);

  const handleBackToBrands = () => {
    setSelectedBrand(null);
    setIsFilterOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setFilters({
      priceMax: 1000000000,
      yearMin: 2000,
      condition: 'All',
      fuel: 'All',
      transmission: 'All'
    });
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-24 animate-in fade-in duration-700">
      {!selectedBrand ? (
        <div className="space-y-16">
          <div className="max-w-3xl">
             <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-5 h-5 text-orange-600" />
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Discovery Engine</span>
             </div>
             <h1 className="editorial-heading text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-6">
               Select <br/>
               <span className="italic font-light text-slate-400">A Manufacturer.</span>
             </h1>
             <p className="text-xl text-slate-500 font-medium italic border-l-4 border-slate-100 pl-8 leading-relaxed">
               Browse our curated automotive library by prestige and performance.
             </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-10">
            {brands.map((brand, idx) => (
              <button 
                key={brand.name}
                onClick={() => setSelectedBrand(brand.name)}
                className={`group relative p-8 rounded-[3rem] border border-slate-100 bg-white hover:border-orange-200 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-700 flex flex-col items-center justify-center overflow-hidden text-center ${idx % 2 !== 0 ? 'lg:translate-y-4' : ''}`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 mb-6 flex items-center justify-center transition-all duration-700 group-hover:scale-110">
                    <img src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-1 tracking-tighter leading-none">{brand.name}</h3>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{brand.count} {brand.count === 1 ? 'Model' : 'Models'}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-slate-100 pb-12">
            <div className="space-y-6">
              <button onClick={handleBackToBrands} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-600 transition-colors group">
                <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:border-orange-100 transition-colors bg-white shadow-sm"><ChevronLeft className="w-4 h-4" /></div>
                ← Back to Manufacturers
              </button>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 flex items-center justify-center bg-slate-50 rounded-2xl p-2"><img src={BRAND_LOGOS[selectedBrand] || ''} alt={selectedBrand} className="max-w-full max-h-full object-contain" /></div>
                <h1 className="editorial-heading text-6xl font-black text-slate-900 tracking-tighter">{selectedBrand} <span className="italic font-light text-slate-400">Inventory.</span></h1>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
               <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Filter className="w-4 h-4" /> {filteredVehicles.length} Units Found
               </div>
               <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${isFilterOpen ? 'bg-orange-600 text-white shadow-xl shadow-orange-600/20' : 'bg-slate-900 text-white shadow-xl shadow-slate-900/10 hover:bg-orange-600'}`}
               >
                 <SlidersHorizontal className="w-4 h-4" />
                 {isFilterOpen ? 'Close Filters' : 'Advanced Filters'}
               </button>
            </div>
          </div>

          {/* Filter Bar */}
          {isFilterOpen && (
            <div className="bg-slate-50 rounded-[3rem] p-8 md:p-12 border border-slate-100 animate-in slide-in-from-top-4 duration-500 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Max Price: {CURRENCY} {filters.priceMax.toLocaleString()}</label>
                  <input type="range" min="10000000" max="1000000000" step="10000000" value={filters.priceMax} onChange={e => setFilters({...filters, priceMax: Number(e.target.value)})} className="w-full accent-orange-600" />
               </div>
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Min Year: {filters.yearMin}</label>
                  <input type="range" min="1990" max="2025" step="1" value={filters.yearMin} onChange={e => setFilters({...filters, yearMin: Number(e.target.value)})} className="w-full accent-orange-600" />
               </div>
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Condition</label>
                  <select value={filters.condition} onChange={e => setFilters({...filters, condition: e.target.value})} className="w-full bg-white p-4 rounded-xl outline-none border border-slate-100 font-black text-xs uppercase tracking-widest cursor-pointer">
                    <option>All</option>
                    {CONDITIONS.map(c => <option key={c}>{c}</option>)}
                  </select>
               </div>
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Transmission</label>
                  <select value={filters.transmission} onChange={e => setFilters({...filters, transmission: e.target.value})} className="w-full bg-white p-4 rounded-xl outline-none border border-slate-100 font-black text-xs uppercase tracking-widest cursor-pointer">
                    <option>All</option>
                    {TRANSMISSIONS.map(t => <option key={t}>{t}</option>)}
                  </select>
               </div>
               <div className="lg:col-span-4 flex justify-end gap-4 border-t border-slate-200 pt-8">
                  <button onClick={resetFilters} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors">Reset All Filters</button>
               </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {filteredVehicles.map((v, idx) => (
              <div 
                key={v.id} 
                className={`animate-in fade-in slide-in-from-bottom-4 duration-500 ${idx % 2 !== 0 ? 'lg:translate-y-6' : ''}`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <VehicleCard vehicle={v} onCompareToggle={toggleComparison} isComparing={comparisonIds.includes(v.id)} />
              </div>
            ))}
            
            {filteredVehicles.length === 0 && (
              <div className="col-span-full py-40 text-center bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-100">
                <Filter className="w-12 h-12 text-slate-200 mx-auto mb-6" />
                <p className="text-slate-400 font-black italic uppercase tracking-widest text-lg">No units matching your current filter criteria.</p>
                <button onClick={resetFilters} className="mt-6 text-orange-600 font-black text-sm uppercase tracking-widest hover:underline">Clear all filters</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
