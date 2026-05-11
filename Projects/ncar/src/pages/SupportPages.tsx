import React from 'react';
import { HelpCircle, Shield, LifeBuoy, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

type SupportType = 'faq' | 'support' | 'privacy';

export const SupportPages = ({ type }: { type: SupportType }) => {
  const content = {
    faq: {
      title: 'Buyer FAQ',
      icon: <HelpCircle className="w-12 h-12 text-orange-600" />,
      subtitle: 'Everything you need to know about buying a car on Nexa.',
      sections: [
        { q: 'How do I know a dealer is verified?', a: 'All verified dealers have a gold "Verified Dealer" badge. We physically inspect their showrooms and verify their URSB registration.' },
        { q: 'Can I pay for a car through Nexa?', a: 'Nexa is a marketplace for connections. Financial transactions happen directly between you and the dealership to avoid middleman fees.' },
        { q: 'What if a car I liked is sold?', a: 'We encourage dealers to update stock daily. If a car is sold, check the "Our Dealerships" page to see similar inventory from the same showroom.' }
      ]
    },
    support: {
      title: 'Dealership Support',
      icon: <LifeBuoy className="w-12 h-12 text-orange-600" />,
      subtitle: 'Support for our merchant partners and showrooms.',
      sections: [
        { q: 'How do I list my car?', a: 'Login to your dashboard and click "Sell Unit". Fill in the specs and upload high-quality photos.' },
        { q: 'Subscription Billing', a: 'Subscriptions are 15,000 UGX monthly, payable via MTN MoMo, Airtel Money, or Card.' },
        { q: 'Trouble uploading photos?', a: 'Ensure your photos are under 5MB each. If problems persist, contact our technical desk via the Merchant WhatsApp group.' }
      ]
    },
    privacy: {
      title: 'Privacy Policy',
      icon: <Shield className="w-12 h-12 text-orange-600" />,
      subtitle: 'How we handle your data and security.',
      sections: [
        { q: 'Data Storage', a: 'Your identity documents are stored in an AES-256 encrypted vault, accessible only to verified administrators for compliance checks.' },
        { q: 'Information Sharing', a: 'We do not sell your data. We only facilitate communication between buyers and dealers.' },
        { q: 'Security Protocols', a: 'We use SSL encryption and periodic security audits to ensure the Nexa Standard of safety is maintained.' }
      ]
    }
  };

  const page = content[type];

  return (
    <div className="max-w-4xl mx-auto px-6 py-32 animate-in fade-in duration-700">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-orange-600 mb-12">
        <ArrowLeft className="w-4 h-4" /> Back Home
      </Link>
      
      <div className="mb-20">
        <div className="w-20 h-20 bg-orange-50 rounded-[2rem] flex items-center justify-center mb-8 shadow-sm">
          {page.icon}
        </div>
        <h1 className="editorial-heading text-6xl font-black text-slate-900 tracking-tighter mb-4">{page.title}</h1>
        <p className="text-xl text-slate-500 font-medium italic border-l-4 border-slate-100 pl-8">{page.subtitle}</p>
      </div>

      <div className="space-y-12">
        {page.sections.map((item, i) => (
          <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
            <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{item.q}</h3>
            <p className="text-slate-500 font-medium leading-relaxed italic">{item.a}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-20 p-10 bg-slate-900 rounded-[3rem] text-center">
        <p className="text-white font-black text-xl mb-6">Still have questions?</p>
        <a href="https://wa.me/256700000000" className="bg-orange-600 text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all inline-block">Contact Nexa Desk</a>
      </div>
    </div>
  );
};