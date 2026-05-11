
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from "./Logo";
import { AppState } from "../types/index";

export const Footer = ({ state }: { state: AppState }) => (
  <footer className="bg-gray-900 text-gray-400 py-16 border-t border-gray-800">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="space-y-6">
        <div className="flex items-center">
          <Logo className="h-10" variant="white" />
        </div>
        <p className="text-sm leading-relaxed text-gray-500">
          The Pearl of Africa's premium car marketplace. Connecting buyers to verified Ugandan dealerships.
        </p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Quick Links</h4>
        <ul className="space-y-4 text-sm font-medium">
          <li><Link to="/listings" className="hover:text-orange-500 transition">Browse Vehicles</Link></li>
          <li><Link to="/dealers" className="hover:text-orange-500 transition">Our Dealerships</Link></li>
          <li><Link to="/signup" className="hover:text-orange-500 transition">Register Your Dealership</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Support</h4>
        <ul className="space-y-4 text-sm font-medium">
          <li><Link to="/faq" className="hover:text-orange-500 transition">Buyer FAQ</Link></li>
          <li><Link to="/support" className="hover:text-orange-500 transition">Dealership Support</Link></li>
          <li><Link to="/privacy" className="hover:text-orange-500 transition">Privacy Policy</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Connect</h4>
        <p className="text-xs text-gray-500 leading-relaxed">
          Follow us on social media for the latest automotive arrivals and marketplace updates across the Pearl of Africa.
        </p>
        <div className="flex gap-4 mt-6">
           <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
              <span className="text-[10px] font-bold text-white">FB</span>
           </div>
           <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
              <span className="text-[10px] font-bold text-white">IG</span>
           </div>
           <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
              <span className="text-[10px] font-bold text-white">X</span>
           </div>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
      <p>&copy; {new Date().getFullYear()} Nexa Trader Uganda. All rights reserved.</p>
      <Link to="/admin-login" className="text-gray-700 hover:text-orange-600 transition font-black uppercase tracking-widest">Login as Admin</Link>
    </div>
  </footer>
);
