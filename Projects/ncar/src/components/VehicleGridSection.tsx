
import React, { useState, useMemo } from 'react';
import { Vehicle } from "../types/index";
import { VehicleCard } from "./VehicleCard";
import { ArrowRight, Sparkles, Filter, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VehicleGridSectionProps {
  vehicles: Vehicle[];
}

export const VehicleGridSection: React.FC<VehicleGridSectionProps> = ({ vehicles }) => {
  const [activeTab, setActiveTab] = useState<'Used' | 'New'>('Used');

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(v => {
      if (activeTab === 'New') {
        return v.condition === 'New';
      }
      return v.condition === 'Used' || v.condition === 'Foreign Used';
    });
  }, [vehicles, activeTab]);

  return (
    <section className="pt-20 md:pt-32 pb-12 md:pb-16 bg-white relative">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        {/* Asymmetrical Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-end mb-12 md:mb-20">
          <div className="lg:col-span-7 space-y-4 md:space-y-6">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-orange-600" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Pearl Certified</span>
            </div>
            <h2 className="editorial-heading text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">
              Featured <br/>
              <span className="italic font-light">Vehicles.</span>
            </h2>
            <div className="h-1.5 md:h-2 w-24 md:w-32 bg-orange-600/10 rounded-full"></div>
          </div>

          <div className="lg:col-span-5 flex flex-col md:flex-row items-center gap-6 md:gap-8 md:justify-end">
            <p className="text-slate-500 font-medium italic text-right max-w-[280px] hidden md:block leading-relaxed">
              Manually inspected units from Uganda's premier dealerships. 
            </p>
            <div className="flex bg-slate-50 p-1 md:p-1.5 rounded-2xl md:rounded-[1.5rem] border border-slate-100 shadow-sm w-full md:w-auto">
              <button
                onClick={() => setActiveTab('Used')}
                className={`flex-1 md:flex-none px-6 md:px-8 py-3 rounded-xl md:rounded-2xl font-black text-[10px] md:text-[11px] uppercase tracking-widest transition-all duration-500 ${
                  activeTab === 'Used' 
                    ? 'bg-white text-slate-900 shadow-lg' 
                    : 'text-slate-400'
                }`}
              >
                Used Cars
              </button>
              <button
                onClick={() => setActiveTab('New')}
                className={`flex-1 md:flex-none px-6 md:px-8 py-3 rounded-xl md:rounded-2xl font-black text-[10px] md:text-[11px] uppercase tracking-widest transition-all duration-500 ${
                  activeTab === 'New' 
                    ? 'bg-white text-slate-900 shadow-lg' 
                    : 'text-slate-400'
                }`}
              >
                New Cars
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-10 md:gap-y-12">
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map((vehicle, idx) => (
              <div 
                key={vehicle.id} 
                className={`transition-all duration-700 ${idx % 2 !== 0 ? 'lg:translate-y-8' : ''}`}
              >
                <VehicleCard vehicle={vehicle} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-32 text-center bg-slate-50 rounded-[3rem] md:rounded-[4rem] border-2 border-dashed border-slate-100 px-6">
              <div className="w-16 h-16 md:w-20 h-16 md:h-20 bg-white rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl text-slate-200">
                <PlusCircle className="w-8 h-8" />
              </div>
              <p className="text-slate-500 font-black italic uppercase tracking-widest text-base md:text-lg mb-8">
                The vault is currently awaiting new arrivals.
              </p>
              <Link to="/signup" className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-orange-600 transition-all">
                List Your First Vehicle
              </Link>
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="mt-16 md:mt-24 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 border-t border-slate-100 pt-12 md:pt-16">
          <div className="text-center md:text-left max-w-md">
            <h4 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 mb-2">Can't find the perfect drive?</h4>
            <p className="text-slate-500 italic font-medium">Explore our full verified catalogue with advanced filtering.</p>
          </div>
          <Link 
            to="/listings" 
            className="w-full md:w-auto group relative flex items-center justify-center gap-6 bg-slate-900 text-white pl-10 md:pl-12 pr-6 py-5 md:py-6 rounded-2xl md:rounded-[2rem] text-[12px] md:text-sm font-black uppercase tracking-widest hover:bg-orange-600 transition-all duration-500 shadow-xl active:scale-95"
          >
            <span>Full Catalogue</span>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl md:rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-45">
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
