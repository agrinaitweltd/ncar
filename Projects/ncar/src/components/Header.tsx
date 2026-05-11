import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, PlusCircle, LogOut, ArrowUpRight, ArrowRight, LayoutGrid, Instagram, Facebook, Twitter, Mail, Phone, ExternalLink } from 'lucide-react';
import { Logo } from "./Logo";
import { AppState } from "../types/index";

export const Header = ({ state, setState }: { state: AppState, setState: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    setState((prev: any) => ({ ...prev, userType: 'guest', userId: null, userData: null, isAdminAuthenticated: false }));
    setIsOpen(false);
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;
  const closeMenu = () => setIsOpen(false);

  // Toggle body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-3' : 'py-5 md:py-8'}`}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-6">
          <div className={`relative flex items-center justify-between transition-all duration-500 px-4 md:px-8 py-2 md:py-3 rounded-2xl ${scrolled ? 'bg-white/90 backdrop-blur-xl border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)]' : 'bg-transparent border-transparent'}`}>
            <div className="flex items-center gap-14">
              <Link to="/" className="flex items-center hover:scale-105 transition-transform duration-300 active:scale-95" onClick={closeMenu}>
                <Logo className="h-7 md:h-9" />
              </Link>
              
              <div className="hidden lg:flex items-center gap-10">
                <Link to="/listings" className={`text-[11px] font-black uppercase tracking-[0.25em] transition-all hover:text-orange-600 font-heading ${isActive('/listings') ? 'text-orange-600' : 'text-slate-500'}`}>
                  Inventory
                </Link>
                <Link to="/rentals" className={`text-[11px] font-black uppercase tracking-[0.25em] transition-all hover:text-orange-600 flex items-center gap-2 font-heading ${isActive('/rentals') ? 'text-orange-600' : 'text-slate-500'}`}>
                  Rentals
                  <span className="bg-orange-600 text-white px-1.5 py-0.5 rounded text-[8px] font-black">LIVE</span>
                </Link>
                <Link to="/dealers" className={`text-[11px] font-black uppercase tracking-[0.25em] transition-all hover:text-orange-600 font-heading ${isActive('/dealers') ? 'text-orange-600' : 'text-slate-500'}`}>
                  Partners
                </Link>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              {state.userType === 'guest' ? (
                <div className="flex items-center gap-8">
                  <Link to="/login" className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-500 hover:text-orange-600 transition-colors font-heading">
                    Bond Login
                  </Link>
                  <Link to="/signup" className="group flex items-center gap-3 bg-slate-900 text-white px-8 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all duration-500 shadow-xl shadow-slate-900/10">
                    Register Showroom
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-5">
                  <Link 
                    to={state.userType === 'admin' ? '/admin/dashboard' : '/dashboard'} 
                    className="group flex items-center gap-3 pl-2 pr-5 py-2 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-lg transition-all"
                  >
                    <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${state.userType === 'admin' ? 'bg-blue-600 text-white' : 'bg-orange-600 text-white'}`}>
                      <LayoutGrid className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-900">Console</span>
                  </Link>
                  <button onClick={handleLogout} className="p-2.5 text-slate-400 hover:text-red-500 transition-colors active:scale-90">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center md:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className={`relative z-[120] p-3 rounded-xl transition-all active:scale-95 ${isOpen ? 'bg-slate-900 text-white shadow-xl' : 'bg-white/80 backdrop-blur-md text-slate-900 border border-slate-100 shadow-sm'}`} 
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div 
        className={`fixed inset-0 z-[110] bg-white transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) md:hidden flex flex-col ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}
      >
        {/* Editorial Elements */}
        <div className="absolute top-0 right-0 w-full h-[60%] bg-gradient-to-b from-orange-50/40 to-white opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-orange-600/5 rounded-full blur-[60px] pointer-events-none"></div>

        <div className="relative flex flex-col h-full overflow-y-auto px-8 pt-28 pb-10">
          <div className="flex flex-col gap-1 nav-stagger">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-300 mb-6 block">Navigate Catalyst</span>
            
            <Link to="/listings" onClick={closeMenu} className="group flex items-center justify-between py-6 border-b border-slate-50 transition-all active:pl-2">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-extrabold tracking-tighter text-slate-900 font-heading">Showroom</span>
              </div>
              <ArrowRight className="w-6 h-6 text-slate-200" />
            </Link>

            <Link to="/rentals" onClick={closeMenu} className="group flex items-center justify-between py-6 border-b border-slate-50 transition-all active:pl-2">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-extrabold tracking-tighter text-slate-900 font-heading">Rentals</span>
                <span className="bg-orange-600 text-white px-2 py-0.5 rounded text-[10px] font-black mt-1">LIVE</span>
              </div>
              <ArrowRight className="w-6 h-6 text-slate-200" />
            </Link>

            <Link to="/dealers" onClick={closeMenu} className="group flex items-center justify-between py-6 border-b border-slate-50 transition-all active:pl-2">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-extrabold tracking-tighter text-slate-900 font-heading">Partners</span>
              </div>
              <ArrowRight className="w-6 h-6 text-slate-200" />
            </Link>
          </div>

          <div className="mt-12 flex flex-col gap-4 nav-stagger">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-300 mb-2">Merchant Hub</span>
            {state.userType === 'guest' ? (
              <div className="grid grid-cols-1 gap-3">
                <Link to="/login" onClick={closeMenu} className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl border-2 border-slate-100 text-slate-900 text-[11px] font-black uppercase tracking-widest active:bg-slate-50 transition-all">
                  <User className="w-4 h-4" /> Sign In
                </Link>
                <Link to="/signup" onClick={closeMenu} className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-slate-900/10 active:bg-orange-600 transition-all">
                  <PlusCircle className="w-4 h-4" /> Register Bond
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link to={state.userType === 'admin' ? '/admin/dashboard' : '/dashboard'} onClick={closeMenu} className="flex items-center justify-between w-full p-6 rounded-2xl bg-orange-50 border border-orange-100 text-orange-900 transition-all active:scale-95">
                  <div className="flex items-center gap-4">
                    <LayoutGrid className="w-5 h-5" />
                    <span className="font-bold uppercase tracking-widest text-[11px]">Control Center</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-4 w-full p-6 rounded-2xl bg-red-50 text-red-600 border border-red-100 transition-all active:scale-95">
                  <LogOut className="w-5 h-5" />
                  <span className="font-bold uppercase tracking-widest text-[11px]">End Session</span>
                </button>
              </div>
            )}
          </div>

          <div className="mt-auto pt-10 nav-stagger">
            <div className="flex items-center gap-4 mb-8">
              <a href="tel:+256700000000" className="p-4 bg-slate-50 rounded-2xl text-slate-600 active:text-orange-600 active:bg-white shadow-sm transition-all"><Phone className="w-5 h-5" /></a>
              <a href="mailto:support@nexatrader.ug" className="p-4 bg-slate-50 rounded-2xl text-slate-600 active:text-blue-600 active:bg-white shadow-sm transition-all"><Mail className="w-5 h-5" /></a>
              <div className="flex-1 flex justify-end gap-3">
                <a href="#" className="p-4 bg-slate-50 rounded-2xl text-slate-400"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="p-4 bg-slate-50 rounded-2xl text-slate-400"><Facebook className="w-5 h-5" /></a>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">
                Nexa Trader UG<br/>v3.2 Editorial Core
              </p>
              <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};