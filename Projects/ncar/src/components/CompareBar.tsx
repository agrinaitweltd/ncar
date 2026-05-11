
import React from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, Layers } from 'lucide-react';
import { Vehicle } from "../types/index";

export const CompareBar = ({ vehicles, comparisonIds, toggleComparison }: { vehicles: Vehicle[], comparisonIds: string[], toggleComparison: (id: string) => void }) => {
  if (comparisonIds.length === 0) return null;

  const selectedVehicles = vehicles.filter(v => comparisonIds.includes(v.id));

  return (
    <div className="fixed bottom-6 sm:bottom-24 left-1/2 -translate-x-1/2 z-[70] w-full max-w-2xl px-4 sm:px-6 animate-in slide-in-from-bottom-10 duration-500">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-[2.5rem] p-2.5 sm:p-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] flex items-center justify-between gap-3 sm:gap-6">
        <div className="flex items-center gap-2.5 sm:gap-4 overflow-x-auto scrollbar-hide pr-2">
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-lg shrink-0">
            <Layers className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {selectedVehicles.map(v => (
              <div key={v.id} className="relative shrink-0 group">
                <img src={v.images[0]} className="w-9 h-9 sm:w-14 sm:h-14 rounded-lg sm:rounded-2xl object-cover border border-white/20" alt="" />
                <button 
                  onClick={(e) => { e.preventDefault(); toggleComparison(v.id); }}
                  className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 w-4 h-4 sm:w-5 sm:h-5 bg-white text-slate-900 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition shadow-lg opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                >
                  <X className="w-2.5 h-2.5 sm:w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <div className="hidden xs:block">
            <p className="text-white font-black text-[9px] sm:text-xs uppercase tracking-widest">{comparisonIds.length} Selected</p>
            <p className="text-white/40 text-[7px] sm:text-[9px] font-bold uppercase tracking-tight">Compare Hub</p>
          </div>
          <Link 
            to="/compare"
            className="bg-white text-slate-900 px-5 sm:px-8 py-2.5 sm:py-4 rounded-xl sm:rounded-2xl font-black text-[9px] sm:text-xs uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all flex items-center gap-2 sm:gap-3 shrink-0 active:scale-95"
          >
            <span className="hidden xs:inline">Compare</span>
            <span className="xs:hidden">GO</span>
            <ArrowRight className="w-3 h-3 sm:w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
