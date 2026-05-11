import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Dealer, Vehicle } from "../types/index";

export const DealersPage = ({ dealers, vehicles }: { dealers: Dealer[], vehicles: Vehicle[] }) => {
  const verified = dealers.filter(d => d.status === 'VERIFIED_DEALER');
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter">Verified <span className="text-orange-600">Dealership Partners</span></h1>
        <p className="text-gray-500 text-lg font-medium italic">Certified Ugandan dealerships you can trust.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {verified.map(d => (
          <Link to={`/dealer/${d.id}`} key={d.id} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition duration-500 group flex flex-col items-center text-center">
            <img src={d.logo} className="w-24 h-24 rounded-3xl object-cover mb-8 shadow-xl border-4 border-white group-hover:scale-110 transition" alt="" />
            <h3 className="text-2xl font-black mb-2">{d.name}</h3>
            <div className="text-gray-500 text-xs font-bold mb-6 flex items-center gap-2"><MapPin className="w-4 h-4 text-orange-600" /> {d.location}</div>
            <div className="bg-gray-50 w-full p-4 rounded-2xl flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
               <span>Vehicles</span>
               <span className="text-orange-600 font-black">{vehicles.filter(v => v.dealerId === d.id).length}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};