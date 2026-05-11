import React from 'react';
import { ShieldCheck, Car, Lock, MessageCircle, DollarSign, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const BENEFITS = [
  {
    title: 'Dealership Vetting',
    description: 'We manually inspect physical showrooms. No ghost dealers.',
    icon: <ShieldCheck className="w-7 h-7" />,
    color: 'bg-green-50 text-green-600 border-green-100',
    span: 'lg:col-span-4'
  },
  {
    title: 'Curated Flow',
    description: 'Access the latest high-spec models across Kampala and beyond.',
    icon: <Car className="w-7 h-7" />,
    color: 'bg-blue-50 text-blue-600 border-blue-100',
    span: 'lg:col-span-4'
  },
  {
    title: 'Privacy First',
    description: 'Direct inquiries without middle-man interference or markup.',
    icon: <Lock className="w-7 h-7" />,
    color: 'bg-orange-50 text-orange-600 border-orange-100',
    span: 'lg:col-span-4'
  },
  {
    title: 'Direct Comms',
    description: 'Instant tap-to-chat with dealership managers via WhatsApp.',
    icon: <MessageCircle className="w-7 h-7" />,
    color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    span: 'lg:col-span-6'
  },
  {
    title: 'Zero Commissions',
    description: 'Dealers pay a flat fee, keeping car prices fair for buyers.',
    icon: <DollarSign className="w-7 h-7" />,
    color: 'bg-yellow-50 text-yellow-600 border-yellow-100',
    span: 'lg:col-span-6'
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center mb-24">
          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-orange-600" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Our Manifesto</span>
            </div>
            <h2 className="editorial-heading text-6xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">
              The <span className="text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-500">Nexa Standard.</span>
            </h2>
            <p className="text-xl text-slate-500 font-medium italic border-l-4 border-slate-100 pl-8 leading-relaxed">
              We're rewriting the automotive narrative in Uganda. Building a bridge of trust between discerning buyers and the country's most reputable showrooms.
            </p>
          </div>
          <div className="lg:col-span-6 flex justify-end">
            <Link to="/listings" className="group flex items-center gap-4 bg-slate-900 text-white px-12 py-6 rounded-full text-sm font-black uppercase tracking-widest hover:bg-orange-600 transition-all duration-500 shadow-2xl active:scale-95">
              Read Our History
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Mosaic Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {BENEFITS.map((benefit, index) => (
            <div 
              key={index} 
              className={`group relative p-10 rounded-[3rem] border border-slate-100 bg-white hover:border-orange-200 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-700 flex flex-col justify-between overflow-hidden ${benefit.span}`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 border transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 ${benefit.color}`}>
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">
                  {benefit.title}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed italic pr-12">
                  {benefit.description}
                </p>
              </div>
              <div className="mt-12 flex justify-end opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:translate-x-2">
                <ArrowRight className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          ))}
          
          <div className="lg:col-span-12 relative p-12 bg-slate-900 rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden shadow-2xl group">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="relative z-10 max-w-xl">
              <h3 className="text-4xl font-black text-white leading-tight tracking-tighter mb-4">Are you a dealership owner in Uganda?</h3>
              <p className="text-slate-400 font-medium italic text-lg leading-relaxed">Join the most prestigious automotive network in the Pearl of Africa. Scale your inventory visibility today.</p>
            </div>
            <Link 
              to="/signup" 
              className="relative z-10 shrink-0 bg-white text-slate-900 px-12 py-6 rounded-3xl font-black uppercase tracking-widest text-sm hover:bg-orange-600 hover:text-white transition-all duration-500 shadow-xl active:scale-95"
            >
              Partner with Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};