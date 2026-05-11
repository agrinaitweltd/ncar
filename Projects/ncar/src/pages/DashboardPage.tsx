
import React, { useState, useRef } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { PlusCircle, Clock, Settings, Trash2, MessageSquare, ArrowRight, BarChart3, Layers, Camera, X, Upload, Activity, LayoutGrid, Eye, CheckCircle2, AlertCircle, FileText, Download, ShieldCheck, ShoppingCart, Key, UserCheck, RefreshCw } from 'lucide-react';
import { AppState, Vehicle, Dealer, VaultFile, VehicleStatus } from "../types/index";
import { CURRENCY } from "../config/constants";

const ManagePhotosModal = ({ vehicle, onClose, onUpdate }: { vehicle: Vehicle, onClose: () => void, onUpdate: (id: string, newImages: string[]) => void }) => {
  const [images, setImages] = useState<string[]>(vehicle.images);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setIsUploading(true);
    const newPhotos: string[] = [];
    Array.from(files).forEach((file: any) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPhotos.push(reader.result as string);
        if (newPhotos.length === files.length) {
          const updated = [...images, ...newPhotos].slice(0, 10);
          setImages(updated);
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white max-w-2xl w-full rounded-[4rem] p-12 shadow-2xl relative animate-in zoom-in duration-300 border border-white/20">
        <button onClick={onClose} className="absolute top-10 right-10 p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-red-500 transition-all z-10"><X className="w-6 h-6" /></button>
        <div className="mb-12">
           <h2 className="text-3xl font-black text-slate-900 tracking-tight">Media Management</h2>
           <p className="text-slate-500 font-medium italic mt-1">{vehicle.make} {vehicle.model} • Asset Vault</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-10">
           {images.map((img, i) => (
             <div key={i} className="relative aspect-square rounded-[2rem] overflow-hidden border-2 border-white shadow-xl group">
                <img src={img} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="bg-red-600 text-white p-3 rounded-xl shadow-2xl hover:scale-110 transition active:scale-95"><Trash2 className="w-4 h-4" /></button>
                </div>
             </div>
           ))}
           {images.length < 10 && (
             <button onClick={() => fileInputRef.current?.click()} className="aspect-square rounded-[2rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center gap-3 hover:bg-orange-50 transition-all text-slate-400 hover:text-orange-600 group">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-white transition-colors">{isUploading ? <Activity className="w-6 h-6 animate-spin text-orange-600" /> : <Upload className="w-6 h-6" />}</div>
                <span className="text-[9px] font-black uppercase tracking-widest">Add Asset</span>
             </button>
           )}
        </div>
        <input type="file" multiple hidden ref={fileInputRef} onChange={handleFileChange} />
        <div className="flex gap-4">
           <button onClick={onClose} className="flex-1 bg-slate-100 text-slate-500 p-6 rounded-full font-black uppercase tracking-widest text-[10px]">Discard</button>
           <button onClick={() => { onUpdate(vehicle.id, images); onClose(); }} className="flex-1 bg-slate-900 text-white p-6 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-orange-600 transition-all">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export const DashboardPage = ({ state, vehicles, setVehicles }: { state: AppState, vehicles: Vehicle[], setVehicles?: any }) => {
  const [selectedForPhotos, setSelectedForPhotos] = useState<Vehicle | null>(null);
  const [activeTab, setActiveTab] = useState<'inventory' | 'vault'>('inventory');

  if (state.userType !== 'dealer') return <Navigate to="/login" />;
  const d = state.userData as Dealer;
  const items = vehicles.filter(v => v.dealerId === d.id);

  const handleUpdateStatus = (id: string, status: VehicleStatus) => {
    if (setVehicles) setVehicles((prev: Vehicle[]) => prev.map(v => v.id === id ? { ...v, status } : v));
  };

  const handleToggleRental = (id: string) => {
    if (setVehicles) setVehicles((prev: Vehicle[]) => prev.map(v => v.id === id ? { ...v, isRentalAvailable: !v.isRentalAvailable } : v));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this listing permanently?')) {
      if (setVehicles) setVehicles((prev: Vehicle[]) => prev.filter(v => v.id !== id));
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-24 animate-in fade-in duration-700">
      {selectedForPhotos && <ManagePhotosModal vehicle={selectedForPhotos} onClose={() => setSelectedForPhotos(null)} onUpdate={(id, imgs) => setVehicles((prev: Vehicle[]) => prev.map(v => v.id === id ? { ...v, images: imgs } : v))} />}

      <div className="flex flex-col lg:flex-row justify-between items-start mb-20 gap-10">
        <div className="space-y-6">
           <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-orange-600/20 rounded-[2.5rem] blur-2xl group-hover:bg-orange-600/30 transition-all"></div>
                <img src={d.logo} className="relative w-28 h-28 rounded-[2.5rem] object-cover shadow-2xl border-4 border-white" alt="" />
              </div>
              <div className="space-y-1">
                 <h1 className="text-6xl font-black tracking-tighter leading-none text-slate-900">{d.name}</h1>
                 <div className="flex flex-wrap items-center gap-3 pt-2">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-full border shadow-sm ${d.status === 'VERIFIED_DEALER' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200'}`}>
                      {d.status.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-5 py-2 rounded-full border border-slate-100 flex items-center gap-2">
                       <LayoutGrid className="w-3 h-3" /> Showroom Admin
                    </span>
                 </div>
              </div>
           </div>
        </div>
        <div className="flex flex-wrap gap-4 w-full lg:w-auto">
           <Link to="/list-car" className="flex-1 lg:flex-none bg-orange-600 text-white px-12 py-7 rounded-[2.5rem] font-black shadow-2xl shadow-orange-600/30 hover:bg-slate-900 transition-all flex items-center justify-center gap-3 active:scale-95">
              <PlusCircle className="w-6 h-6" />
              <span className="uppercase tracking-widest text-xs">Sell New Unit</span>
           </Link>
           <button onClick={() => window.open('https://wa.me/256700123456', '_blank')} className="flex-1 lg:flex-none bg-white border border-slate-100 text-slate-900 px-12 py-7 rounded-[2.5rem] font-black shadow-xl shadow-slate-200/50 hover:bg-slate-50 transition-all flex items-center justify-center gap-3 active:scale-95">
              <MessageSquare className="w-6 h-6 text-orange-600" /> 
              <span className="uppercase tracking-widest text-xs">Nexa Desk</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
         {[
           { l: 'Inventory Total', v: items.length, i: <BarChart3 />, c: 'text-blue-600', b: 'bg-blue-50' },
           { l: 'Units Sold', v: items.filter(v => v.status === 'SOLD').length, i: <ShoppingCart />, c: 'text-green-600', b: 'bg-green-50' },
           { l: 'Hire Listing', v: items.filter(v => v.isRentalAvailable).length, i: <Key />, c: 'text-indigo-600', b: 'bg-indigo-50' },
           { l: 'Identity Sync', v: '100%', i: <ShieldCheck />, c: 'text-orange-600', b: 'bg-orange-50' }
         ].map((stat, i) => (
           <div key={i} className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-all duration-500">
              <div>
                 <div className={`w-14 h-14 ${stat.b} ${stat.c} rounded-2xl flex items-center justify-center mb-8`}>{stat.i}</div>
                 <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.l}</h3>
                 <p className="text-5xl font-black text-slate-900 tracking-tighter">{stat.v}</p>
              </div>
           </div>
         ))}
      </div>

      <div className="flex gap-4 mb-12 bg-slate-100/50 p-2 rounded-full w-fit">
        {['inventory', 'vault'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab as any)} className={`px-12 py-4 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white shadow-xl text-orange-600' : 'text-slate-400 hover:text-slate-600'}`}>{tab}</button>
        ))}
      </div>

      {activeTab === 'inventory' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {items.map(v => (
            <div key={v.id} className="bg-white rounded-[4rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 flex flex-col">
               <div className="relative aspect-[16/10]">
                  <img src={v.images[0]} className="w-full h-full object-cover" alt="" />
                  <div className={`absolute top-8 left-8 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl border border-white/20 ${v.status === 'LIVE' ? 'bg-green-600 text-white' : v.status === 'SOLD' ? 'bg-red-600 text-white' : 'bg-slate-900 text-white'}`}>
                    {v.status}
                  </div>
                  {v.isRentalAvailable && (
                    <div className="absolute top-8 right-8 bg-blue-600 text-white p-2 rounded-xl shadow-xl">
                      <Key className="w-4 h-4" />
                    </div>
                  )}
               </div>
               <div className="p-10 space-y-8 flex-grow flex flex-col">
                  <div>
                    <h4 className="text-2xl font-black tracking-tight text-slate-900 leading-none truncate">{v.year} {v.make} {v.model}</h4>
                    <p className="text-slate-400 font-bold uppercase text-[9px] mt-2 tracking-widest">{v.regNumber || 'Verified Bond Unit'}</p>
                  </div>
                  
                  <div className="flex items-center justify-between border-y border-slate-50 py-6">
                     <div>
                       <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Selling Price</p>
                       <p className="font-black text-slate-900">{CURRENCY} {v.price.toLocaleString()}</p>
                     </div>
                     <div className="text-right">
                       {v.status === 'LIVE' ? (
                         <button onClick={() => handleUpdateStatus(v.id, 'SOLD')} className="flex items-center gap-2 text-[10px] font-black uppercase text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl transition-all">Mark as Sold <ArrowRight className="w-3 h-3" /></button>
                       ) : (
                         <button onClick={() => handleUpdateStatus(v.id, 'LIVE')} className="flex items-center gap-2 text-[10px] font-black uppercase text-green-600 hover:bg-green-50 px-4 py-2 rounded-xl transition-all">Relist Unit <Activity className="w-3 h-3" /></button>
                       )}
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <button onClick={() => setSelectedForPhotos(v)} className="bg-slate-50 text-slate-900 p-5 rounded-3xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-100"><Camera className="w-4 h-4" /> Gallery</button>
                     <button onClick={() => handleToggleRental(v.id)} className={`p-5 rounded-3xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all border ${v.isRentalAvailable ? 'bg-blue-600 text-white border-blue-500' : 'bg-white text-slate-400 border-slate-100'}`}><Key className="w-4 h-4" /> Rental</button>
                  </div>
                  
                  <button onClick={() => handleDelete(v.id)} className="w-full bg-red-50 text-red-600 p-5 rounded-3xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all"><Trash2 className="w-4 h-4" /> Remove Listing</button>
               </div>
            </div>
          ))}
          {items.length === 0 && <div className="col-span-full py-40 text-center bg-slate-50 rounded-[5rem] border-2 border-dashed border-slate-100 italic text-slate-300 uppercase tracking-[0.2em] font-black">Manifest first inventory item.</div>}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
           {d.vaultFiles?.map(file => (
              <div key={file.id} className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col justify-between">
                 <div className="w-20 h-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all"><FileText className="w-10 h-10 text-orange-600" /></div>
                 <div>
                    <p className="text-xl font-black text-slate-900 truncate tracking-tight">{file.name}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{(file.size / (1024 * 1024)).toFixed(2)} MB • {file.type.split('/')[1].toUpperCase()}</p>
                 </div>
                 <div className="pt-8 mt-8 border-t border-slate-50 flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sync Active</span>
                    <button className="text-[10px] font-black text-blue-600 uppercase underline">Inspect</button>
                 </div>
              </div>
           ))}
           <div onClick={() => window.open('https://wa.me/256700123456', '_blank')} className="cursor-pointer bg-slate-50 rounded-[4rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center p-12 hover:bg-orange-50 hover:border-orange-200 transition-all text-center">
              <Upload className="w-12 h-12 text-slate-200 mb-6" />
              <p className="text-slate-400 font-black uppercase text-xs tracking-widest leading-relaxed">Identity vault sync is managed during compliance window. <br/> <span className="text-orange-600 underline">Contact desk to update.</span></p>
           </div>
        </div>
      )}
    </div>
  );
};
