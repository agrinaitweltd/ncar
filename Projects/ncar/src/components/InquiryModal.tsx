import React, { useState } from 'react';
import { X, Send, Activity, CheckCircle2, ShieldCheck, Mail, Phone, User, MessageSquare, Car, Lock } from 'lucide-react';
import { Vehicle, Dealer } from "../types/index";
import { CURRENCY } from "../config/constants";

export const InquiryModal = ({ isOpen, onClose, vehicle, dealer, onInquirySent }: { 
  isOpen: boolean, 
  onClose: () => void, 
  vehicle: Vehicle, 
  dealer: Dealer,
  onInquirySent: (text: string) => void
}) => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState(`Hello ${dealer.name}, I'm interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model} priced at ${CURRENCY} ${vehicle.price.toLocaleString()}. Is this unit still available for viewing at your showroom?`);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onInquirySent(message);
      setSent(true);
      setLoading(false);
      setTimeout(() => {
        onClose();
        setSent(false);
      }, 2500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white max-w-2xl w-full rounded-[4rem] shadow-2xl relative overflow-hidden animate-in zoom-in duration-300 border border-white/20">
        
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>

        <button 
          onClick={onClose} 
          className="absolute top-10 right-10 p-3 bg-white border border-gray-100 text-gray-400 hover:text-red-500 rounded-2xl transition-all shadow-sm z-50 hover:scale-110 active:scale-95"
        >
          <X className="w-6 h-6" />
        </button>
        
        {sent ? (
          <div className="p-20 text-center animate-in zoom-in duration-500 relative z-10">
             <div className="w-28 h-28 bg-green-50 text-green-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl border-4 border-white transform rotate-3">
                <CheckCircle2 className="w-14 h-14" />
             </div>
             <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">Inquiry Secured!</h2>
             <p className="text-gray-500 font-medium italic text-lg leading-relaxed">
               Dealership Manager <span className="text-orange-600 font-black">{dealer.representativeName}</span> has been notified.<br/>Check your messages shortly.
             </p>
          </div>
        ) : (
          <div className="relative z-10">
            <div className="p-10 md:p-14 bg-gray-50/50 border-b border-gray-100 flex flex-col md:flex-row items-center gap-8">
               <div className="relative shrink-0">
                  <img src={vehicle.images[0]} className="w-32 h-24 md:w-40 md:h-28 rounded-[2rem] object-cover shadow-2xl border-4 border-white" alt="" />
                  <div className="absolute -bottom-2 -right-2 bg-orange-600 text-white p-2 rounded-xl shadow-lg">
                    <Car className="w-5 h-5" />
                  </div>
               </div>
               <div className="text-center md:text-left">
                  <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                     <span className="bg-orange-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-orange-600/20">{vehicle.condition}</span>
                     <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Listing ID: {vehicle.id.slice(-6)}</span>
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 tracking-tighter leading-tight">{vehicle.year} {vehicle.make} {vehicle.model}</h3>
                  <p className="text-xl font-black text-orange-600 mt-1">{CURRENCY} {vehicle.price.toLocaleString()}</p>
               </div>
            </div>

            <form onSubmit={handleSubmit} className="p-10 md:p-14 pt-8 md:pt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                 <div className="space-y-2 group">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-orange-600 transition-colors">Your Full Name</label>
                    <div className="bg-white p-5 rounded-[1.5rem] border-2 border-gray-100 focus-within:border-orange-500 focus-within:shadow-xl focus-within:shadow-orange-600/10 transition-all flex items-center gap-4">
                       <User className="w-4 h-4 text-gray-300" />
                       <input required placeholder="Allan K..." className="bg-transparent outline-none w-full text-sm font-bold" />
                    </div>
                 </div>
                 <div className="space-y-2 group">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-orange-600 transition-colors">WhatsApp Number</label>
                    <div className="bg-white p-5 rounded-[1.5rem] border-2 border-gray-100 focus-within:border-orange-500 focus-within:shadow-xl focus-within:shadow-orange-600/10 transition-all flex items-center gap-4">
                       <Phone className="w-4 h-4 text-gray-300" />
                       <input required placeholder="07XX..." className="bg-transparent outline-none w-full text-sm font-bold" />
                    </div>
                 </div>
              </div>

              <div className="space-y-2 mb-10 group">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-orange-600 transition-colors">Inquiry Details</label>
                  <div className="bg-white p-6 rounded-[2rem] border-2 border-gray-100 focus-within:border-orange-500 focus-within:shadow-xl focus-within:shadow-orange-600/10 transition-all">
                    <textarea 
                      required 
                      rows={4} 
                      className="w-full bg-transparent outline-none font-bold text-sm leading-relaxed resize-none"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                    />
                  </div>
              </div>

              <div className="flex flex-col gap-6">
                 <button 
                  disabled={loading}
                  className="w-full bg-orange-600 text-white p-7 rounded-[3rem] font-black text-xl hover:bg-orange-700 transition shadow-2xl shadow-orange-600/40 flex items-center justify-center gap-5 active:scale-95 group overflow-hidden relative"
                 >
                   <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   {loading ? <Activity className="w-8 h-8 animate-spin" /> : <MessageSquare className="w-8 h-8 group-hover:rotate-12 transition-transform" />}
                   <span>{loading ? 'Transmitting Inquiries...' : 'Start Secure Inquiry'}</span>
                 </button>
                 
                 <div className="flex flex-wrap items-center justify-center gap-6 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">
                    <div className="flex items-center gap-2">
                      <Lock className="w-3 h-3 text-orange-600" /> Secure Encryption
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3 h-3 text-green-500" /> Verified Merchant
                    </div>
                    <div className="flex items-center gap-2">
                      <Send className="w-3 h-3 text-blue-500" /> Direct Delivery
                    </div>
                 </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};