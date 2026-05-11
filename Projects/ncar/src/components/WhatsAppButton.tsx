import React from 'react';
import { MessageCircle } from 'lucide-react';
import { AppState, Dealer } from "../types/index";

export const WhatsAppButton = ({ state }: { state: AppState }) => {
  const supportNumber = "256700000000"; 
  let contactNumber = supportNumber;

  if (state.userType === 'dealer' && state.userData) {
    contactNumber = (state.userData as Dealer).whatsapp || supportNumber;
  }

  return (
    <a 
      href={`https://wa.me/${contactNumber}?text=Hello, I am interested in a car listing.`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center border-4 border-white"
    >
      <MessageCircle className="w-8 h-8 fill-current" />
      <span className="absolute -top-2 -right-2 bg-red-500 w-3 h-3 rounded-full animate-ping"></span>
    </a>
  );
};