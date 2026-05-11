import React, { useState } from 'react';
import { X, DollarSign, Smartphone, CreditCard, Activity, Lock } from 'lucide-react';

export const PaymentModal = ({ isOpen, onClose, onPaymentComplete, dealerName }: { isOpen: boolean, onClose: () => void, onPaymentComplete: (method: 'MTN' | 'AIRTEL' | 'CARD') => void, dealerName: string }) => {
  const [method, setMethod] = useState<'MTN' | 'AIRTEL' | 'CARD' | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handlePay = () => {
    if (!method) return;
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (method !== 'CARD' && phone.length < 10) {
        setError('Please enter a valid Ugandan phone number.');
        setLoading(false);
        return;
      }
      onPaymentComplete(method);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white max-w-md w-full rounded-[3rem] p-10 shadow-2xl relative animate-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-red-500 transition"><X className="w-6 h-6" /></button>
        
        <div className="text-center mb-8">
           <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8" />
           </div>
           <h2 className="text-2xl font-black text-gray-900">Subscription Activation</h2>
           <p className="text-gray-500 font-medium text-sm mt-2">Finish your bond registration for <span className="text-orange-600 font-bold">15,000 UGX / month</span></p>
        </div>

        <div className="space-y-4 mb-8">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Select Payment Method</p>
           <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'MTN', label: 'MTN MoMo', icon: <Smartphone className="text-yellow-500" /> },
                { id: 'AIRTEL', label: 'Airtel Money', icon: <Smartphone className="text-red-500" /> },
                { id: 'CARD', label: 'Bank Card', icon: <CreditCard className="text-blue-500" /> }
              ].map(m => (
                <button 
                  key={m.id}
                  onClick={() => setMethod(m.id as any)}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${method === m.id ? 'border-orange-600 bg-orange-50 shadow-inner' : 'border-gray-100 hover:border-orange-200'}`}
                >
                  {m.icon}
                  <span className="text-[10px] font-black">{m.label}</span>
                </button>
              ))}
           </div>
        </div>

        {method && method !== 'CARD' && (
          <div className="mb-8 animate-in slide-in-from-top-4 duration-300">
             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">MoMo Number</label>
             <input 
              type="tel" 
              placeholder="07XX XXX XXX" 
              className="w-full bg-gray-50 p-4 rounded-2xl outline-none font-black text-sm"
              value={phone}
              onChange={e => setPhone(e.target.value)}
             />
          </div>
        )}

        {method === 'CARD' && (
          <div className="mb-8 animate-in slide-in-from-top-4 duration-300 space-y-4">
             <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Card Number</label>
                <input placeholder="XXXX XXXX XXXX XXXX" className="w-full bg-gray-50 p-4 rounded-2xl outline-none font-black text-sm" />
             </div>
             <div className="grid grid-cols-2 gap-4">
                <input placeholder="MM/YY" className="w-full bg-gray-50 p-4 rounded-2xl outline-none font-black text-sm" />
                <input placeholder="CVV" className="w-full bg-gray-50 p-4 rounded-2xl outline-none font-black text-sm" />
             </div>
          </div>
        )}

        {error && <p className="text-red-500 text-[10px] font-black text-center mb-4 uppercase tracking-widest animate-pulse">{error}</p>}

        <button 
          disabled={loading || !method}
          onClick={handlePay}
          className="w-full bg-orange-600 text-white p-5 rounded-[2rem] font-black shadow-xl shadow-orange-600/30 hover:bg-orange-700 active:scale-95 transition flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Activity className="w-6 h-6 animate-spin" /> : <Lock className="w-5 h-5" />}
          <span>{loading ? 'Authorizing...' : 'Pay 15,000 UGX'}</span>
        </button>

        <p className="mt-6 text-center text-[9px] text-gray-400 font-bold uppercase tracking-widest">Secure payment processed for Nexa Trader Uganda.</p>
      </div>
    </div>
  );
};