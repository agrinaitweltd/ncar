
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowUpRight, AlertCircle, Sparkles, Gauge, Fuel, Zap, Plus, Check, Key, MapPin } from 'lucide-react';
import { Vehicle } from "../types/index";
import { CURRENCY, BRAND_LOGOS } from "../config/constants";

interface VehicleCardProps {
  vehicle: Vehicle;
  onCompareToggle?: (id: string) => void;
  isComparing?: boolean;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onCompareToggle, isComparing }) => {
  const isOutOfStock = vehicle.status === 'SOLD' || vehicle.unitsAvailable === 0;
  const brandLogo = BRAND_LOGOS[vehicle.make];

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onCompareToggle) onCompareToggle(vehicle.id);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/car-generic.png';
  };

  return (
    <div className="relative group h-full px-1 sm:px-0">
      <Link 
        to={`/vehicle/${vehicle.id}`} 
        className={`flex flex-col h-full bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-slate-100 overflow-hidden transition-all duration-700 hover:border-orange-200 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] ${isOutOfStock ? 'grayscale-[0.5] opacity-90' : ''}`}
      >
        {/* Media Zone */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img 
            src={vehicle.images[0]} 
            alt={`${vehicle.make} ${vehicle.model}`} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s] ease-out" 
            onError={handleImageError}
          />
          
          {/* Status Badges Overlay */}
          <div className="absolute top-3 sm:top-5 left-3 sm:left-5 z-10 flex flex-wrap gap-1.5 sm:gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-md rounded-lg sm:rounded-xl p-1.5 sm:p-2 shadow-sm border border-white flex items-center justify-center">
              <img src={brandLogo || ''} className="w-full h-full object-contain" alt="" />
            </div>
            {vehicle.isRentalAvailable && (
              <div className="bg-blue-600 text-white text-[6px] sm:text-[7px] font-black px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-lg uppercase tracking-widest shadow-lg flex items-center gap-1 sm:gap-1.5">
                <Key className="w-2.5 h-2.5 sm:w-3 h-3" /> Rent
              </div>
            )}
          </div>

          <div className="absolute top-3 sm:top-5 right-3 sm:right-5 z-10 flex flex-col items-end gap-1.5 sm:gap-2">
            <button 
              onClick={handleCompareClick}
              className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl border backdrop-blur-md transition-all active:scale-90 ${isComparing ? 'bg-orange-600 text-white border-orange-500 shadow-lg' : 'bg-white/80 text-slate-400 border-white hover:text-orange-600 hover:bg-white shadow-sm'}`}
            >
              {isComparing ? <Check className="w-3.5 h-3.5 sm:w-4 h-4" /> : <Plus className="w-3.5 h-3.5 sm:w-4 h-4" />}
            </button>
            {isOutOfStock && (
              <div className="bg-red-600 text-white text-[7px] sm:text-[8px] font-black px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg uppercase tracking-widest shadow-lg">
                Sold Out
              </div>
            )}
          </div>

          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
          <div className="absolute bottom-3 sm:bottom-5 left-4 sm:left-6 flex items-center gap-1.5 sm:gap-2 text-white">
             <MapPin className="w-3 h-3 sm:w-3.5 h-3.5 text-orange-400" />
             <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest drop-shadow-md">{vehicle.location}</span>
          </div>
        </div>

        {/* Info Zone */}
        <div className="p-5 sm:p-8 flex flex-col flex-grow">
          <div className="flex justify-between items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
            <div className="space-y-1 sm:space-y-1.5 flex-1 min-w-0">
              <p className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">{vehicle.year} • {vehicle.condition}</p>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-none truncate font-heading">{vehicle.make} {vehicle.model}</h3>
            </div>
            <div className="text-right shrink-0">
               {vehicle.isRentalAvailable ? (
                 <div className="space-y-0.5">
                   <p className="text-[7px] sm:text-[8px] font-black text-blue-500 uppercase tracking-widest">Rate / Day</p>
                   <p className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tighter font-heading">
                     <span className="text-[9px] sm:text-[11px] mr-1 text-slate-400 font-normal">{CURRENCY}</span>
                     {vehicle.dailyRate?.toLocaleString()}
                   </p>
                 </div>
               ) : (
                 <div className="space-y-0.5">
                   <p className="text-[7px] sm:text-[8px] font-black text-orange-600 uppercase tracking-widest">Price</p>
                   <p className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tighter font-heading">
                     <span className="text-[9px] sm:text-[11px] mr-1 text-slate-400 font-normal">{CURRENCY}</span>
                     {vehicle.price.toLocaleString()}
                   </p>
                 </div>
               )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 py-3 sm:py-5 border-y border-slate-50 mb-4 sm:mb-6">
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-[7px] sm:text-[8px] font-black text-slate-400 uppercase tracking-widest">Miles</p>
              <p className="text-[10px] sm:text-[12px] font-bold text-slate-700 tracking-tight leading-tight">{vehicle.mileage.toLocaleString()}km</p>
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-[7px] sm:text-[8px] font-black text-slate-400 uppercase tracking-widest">Engine</p>
              <p className="text-[10px] sm:text-[12px] font-bold text-slate-700 tracking-tight leading-tight">{vehicle.engineSize}</p>
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-[7px] sm:text-[8px] font-black text-slate-400 uppercase tracking-widest">Fuel</p>
              <p className="text-[10px] sm:text-[12px] font-bold text-slate-700 tracking-tight leading-tight">{vehicle.fuelType}</p>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2">
               <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-green-50 flex items-center justify-center border border-green-100 shadow-sm">
                  <ShieldCheck className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-green-500" />
               </div>
               <span className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest">Verified</span>
            </div>
            <div className="text-slate-900 flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:text-orange-600 transition-colors">
               Explore <ArrowUpRight className="w-3 h-3 sm:w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
