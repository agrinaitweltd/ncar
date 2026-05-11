import React, { useState } from 'react';

export const Logo = ({ className = "h-9", variant = "default" }: { className?: string, variant?: "default" | "white" }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`flex items-center select-none ${className}`}>
      {!hasError ? (
        <img 
          src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/nexa-logo.png" 
          alt="Nexa Trader" 
          className={`h-full w-auto object-contain transition-all duration-500 filter ${variant === "white" ? "brightness-0 invert opacity-90" : "drop-shadow-sm"}`}
          style={{ minWidth: '100px' }}
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="flex items-center">
          <span className={`font-black text-2xl tracking-tighter transition-colors ${variant === 'white' ? 'text-white' : 'text-orange-600'}`}>
            nexa<span className={variant === 'white' ? 'text-white/50' : 'text-slate-900'}>trader.</span>
          </span>
        </div>
      )}
    </div>
  );
};