
import React, { useState, useMemo } from 'react';
import { Vehicle } from "../types/index";
import { VehicleCard } from "../components/VehicleCard";
import { Key, Filter, SlidersHorizontal, Sparkles } from 'lucide-react';
import { CURRENCY, CAR_MAKES } from "../config/constants";

export const RentalsPage = ({ vehicles }: { vehicles: Vehicle[] }) => {
  const [filters, setFilters] = useState({
    make: 'All',
    rentalType: 'All',
    maxDailyRate: 1000000
  });

  const rentalVehicles = useMemo(() => {
    return vehicles.filter(v => {
      if (!v.isRentalAvailable || v.status !== 'LIVE') return false;
      const matchMake = filters.make === 'All' || v.make === filters.make;
      const matchType = filters.rentalType === 'All' || v.rentalType === filters.rentalType;
      const matchPrice = v.dailyRate ? v.dailyRate <= filters.maxDailyRate : true;
      return matchMake && matchType && matchPrice;
    });
  }, [vehicles, filters]);

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-32 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-slate-100 pb-12 mb-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Key className="w-6 h-6 text-orange-600" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Pearl Rental Services</span>
          </div>
          <h1 className="editorial-heading text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none">
            Vehicle <br/>
            <span className="italic font-light text-slate-400">Rentals.</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium italic border-l-4 border-slate-100 pl-8 max-w-2xl">
            From self-drive luxury to professional chauffeur services. Rent verified vehicles directly from Uganda's top bonds.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Filter className="w-4 h-4" /> {rentalVehicles.length} Units Ready
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 p-8 bg-slate-50 rounded-[3rem] border border-slate-100 shadow-inner">
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Vehicle Brand</label>
          <select 
            value={filters.make} 
            onChange={e => setFilters({...filters, make: e.target.value})}
            className="w-full bg-white p-4 rounded-xl outline-none border border-slate-100 font-black text-xs uppercase tracking-widest cursor-pointer"
          >
            <option>All</option>
            {CAR_MAKES.map(m => <option key={m}>{m}</option>)}
          </select>
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Rental Experience</label>
          <select 
            value={filters.rentalType} 
            onChange={e => setFilters({...filters, rentalType: e.target.value})}
            className="w-full bg-white p-4 rounded-xl outline-none border border-slate-100 font-black text-xs uppercase tracking-widest cursor-pointer"
          >
            <option>All</option>
            <option>Self-drive</option>
            <option>With Driver</option>
          </select>
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Max Daily: {CURRENCY} {filters.maxDailyRate.toLocaleString()}</label>
          <input 
            type="range" 
            min="50000" 
            max="2000000" 
            step="50000" 
            value={filters.maxDailyRate} 
            onChange={e => setFilters({...filters, maxDailyRate: Number(e.target.value)})}
            className="w-full accent-orange-600" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {rentalVehicles.map((v, idx) => (
          <div key={v.id} className={`animate-in fade-in slide-in-from-bottom-4 duration-500 ${idx % 2 !== 0 ? 'lg:translate-y-6' : ''}`}>
            <VehicleCard vehicle={v} />
          </div>
        ))}
        {rentalVehicles.length === 0 && (
          <div className="col-span-full py-40 text-center bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-100">
            <Key className="w-12 h-12 text-slate-200 mx-auto mb-6" />
            <p className="text-slate-400 font-black italic uppercase tracking-widest text-lg">No rental units matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};
