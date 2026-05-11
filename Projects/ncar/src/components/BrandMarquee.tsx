import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_LOGOS } from "../config/constants";
import { Sparkles } from 'lucide-react';

const BRAND_GROUPS = [
  { group: "Volkswagen Group", brands: ["Volkswagen", "Audi", "Porsche", "Lamborghini", "Bentley", "Skoda", "SEAT"] },
  { group: "Toyota Group", brands: ["Toyota", "Lexus", "Daihatsu"] },
  { group: "Stellantis", brands: ["Jeep", "Ram", "Chrysler", "Dodge", "Fiat", "Alfa Romeo", "Peugeot", "Citroën"] },
  { group: "General Motors", brands: ["Chevrolet", "GMC", "Cadillac", "Buick"] },
  { group: "Hyundai Motor Group", brands: ["Hyundai", "Kia", "Genesis"] },
  { group: "Renault-Nissan-Mitsubishi Alliance", brands: ["Renault", "Nissan", "Mitsubishi", "Infiniti", "Dacia"] },
  { group: "BMW Group", brands: ["BMW", "Mini", "Rolls-Royce"] },
  { group: "Mercedes-Benz Group", brands: ["Mercedes-Benz", "Smart"] },
  { group: "Ford Motor Company", brands: ["Ford", "Lincoln"] }
];

export const BrandMarquee = () => {
  const allBrands = BRAND_GROUPS.flatMap(g => g.brands);
  
  return (
    <section className="pt-16 pb-24 bg-white overflow-hidden border-t border-slate-50">
      <div className="max-w-[1440px] mx-auto px-6 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-5 h-5 text-orange-600" />
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Can't Find Your Perfect Brand?</span>
        </div>
        <h2 className="editorial-heading text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
          Global <span className="italic font-light">Inventory Access.</span>
        </h2>
      </div>

      <div className="relative flex overflow-hidden group select-none">
        <div className="animate-marquee flex items-center min-w-full">
          {/* Render logos twice for infinite effect */}
          {[...allBrands, ...allBrands].map((brand, i) => (
            <Link 
              to={`/listings?make=${brand}`}
              key={`${brand}-${i}`} 
              className="flex-shrink-0 mx-8 md:mx-12 group/logo flex flex-col items-center gap-4 transition-transform hover:scale-105"
            >
              <div className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center p-4 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-orange-100 transition-all duration-500">
                <img 
                  src={BRAND_LOGOS[brand] || 'https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/car-generic.png'} 
                  alt={brand} 
                  className="max-w-full max-h-full object-contain grayscale opacity-50 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 transition-all duration-500" 
                />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover/logo:text-orange-600 transition-colors">
                {brand}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};