
import React, { useState, useRef } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Activity, CheckCircle2, Upload, X, ShieldCheck, Image as ImageIcon, ArrowLeft, ArrowRight, Layout, Camera, ListChecks, AlertTriangle, Key, Zap, Info, Users, Compass } from 'lucide-react';
import { CAR_MAKES, FUEL_TYPES, TRANSMISSIONS, CONDITIONS, VEHICLE_FEATURES } from "../config/constants";
import { Vehicle, AppState, Dealer, FuelType, TransmissionType, CarCondition, DriveTrain, BodyType, RentalType } from "../types/index";

const BODY_TYPES = ['SUV', 'Sedan', 'Hatchback', 'Pickup', 'Coupe', 'Van', 'Bus', 'Truck'];
const DRIVE_TRAINS = ['FWD', 'RWD', 'AWD', '4WD'];

const PhotoUploadZone = ({ onPhotosAdded, photos }: { onPhotosAdded: (urls: string[]) => void, photos: string[] }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setIsUploading(true);
    const newPhotos: string[] = [];
    const filesArray = Array.from(files);
    
    filesArray.forEach((file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPhotos.push(reader.result as string);
        if (newPhotos.length === filesArray.length) {
          onPhotosAdded([...photos, ...newPhotos].slice(0, 10));
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Vehicle Gallery (Max 10)</h4>
        <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-3 py-1 rounded-full">{photos.length}/10</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {photos.map((url, i) => (
          <div key={i} className="relative aspect-square rounded-3xl overflow-hidden shadow-lg group">
            <img src={url} className="w-full h-full object-cover" alt="" />
            <button onClick={() => onPhotosAdded(photos.filter((_, idx) => idx !== i))} className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all"><X className="w-4 h-4" /></button>
          </div>
        ))}
        {photos.length < 10 && (
          <button onClick={() => fileInputRef.current?.click()} className="aspect-square rounded-3xl border-4 border-dashed border-slate-100 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-all">
            <Camera className="w-8 h-8 text-slate-200" />
            <span className="text-[8px] font-black uppercase text-slate-400">Add Image</span>
          </button>
        )}
      </div>
      <input type="file" multiple hidden ref={fileInputRef} onChange={handleFileChange} />
    </div>
  );
};

export const VehicleListing = ({ state, setVehicles }: { state: AppState, setVehicles: any }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    make: CAR_MAKES[0], 
    model: '', 
    year: new Date().getFullYear().toString(),
    price: '', 
    mileage: '', 
    fuelType: FUEL_TYPES[0], 
    transmission: TRANSMISSIONS[0],
    engineSize: '', 
    enginePower: '',
    torque: '',
    seatingCapacity: '5',
    driveTrain: DRIVE_TRAINS[0],
    bodyType: BODY_TYPES[0],
    vin: '',
    condition: CONDITIONS[1], 
    color: '', 
    regNumber: '', 
    description: '',
    unitsAvailable: '1',
    isRentalAvailable: false,
    rentalType: 'Self-drive' as RentalType,
    dailyRate: '',
    driverIncluded: false,
  });

  if (state.userType !== 'dealer') return <Navigate to="/login" />;
  const d = state.userData as Dealer;

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (photos.length === 0) { alert('Photos required.'); return; }
    setLoading(true);
    setTimeout(() => {
      const newV: Vehicle = {
        ...formData,
        id: 'v-' + Date.now(),
        year: Number(formData.year),
        price: Number(formData.price),
        mileage: Number(formData.mileage),
        seatingCapacity: Number(formData.seatingCapacity),
        unitsAvailable: Number(formData.unitsAvailable),
        dailyRate: formData.dailyRate ? Number(formData.dailyRate) : undefined,
        dealerId: d.id,
        status: 'PENDING',
        location: d.location,
        images: photos,
        isVerified: false, 
        isFeatured: false, 
        createdAt: new Date().toISOString(), 
        features: selectedFeatures,
        fuelType: formData.fuelType as FuelType,
        transmission: formData.transmission as TransmissionType,
        condition: formData.condition as CarCondition,
        driveTrain: formData.driveTrain as DriveTrain,
        bodyType: formData.bodyType as BodyType,
        rentalType: formData.rentalType as RentalType,
      };
      setVehicles((prev: Vehicle[]) => [...prev, newV]);
      setLoading(false);
      navigate('/dashboard');
    }, 2000);
  };

  const nextStep = () => {
    setStep(s => Math.min(s + 1, 4));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const fields_step1 = [
    { l: 'Manufacturer', f: 'make', t: 'select', opts: CAR_MAKES },
    { l: 'Specific Model', f: 'model', t: 'text', ph: 'e.g. Land Cruiser 300' },
    { l: 'Model Year', f: 'year', t: 'number', ph: '2023' },
    { l: 'Body Type', f: 'bodyType', t: 'select', opts: BODY_TYPES },
    { l: 'Condition Status', f: 'condition', t: 'select', opts: CONDITIONS },
    { l: 'External Color', f: 'color', t: 'text', ph: 'Pearl White' },
  ];

  const fields_step2 = [
    { l: 'Engine Displacement', f: 'engineSize', t: 'text', ph: '3.3L V6' },
    { l: 'Engine Power (HP)', f: 'enginePower', t: 'text', ph: '304 HP' },
    { l: 'Max Torque (Nm)', f: 'torque', t: 'text', ph: '700 Nm' },
    { l: 'Transmission', f: 'transmission', t: 'select', opts: TRANSMISSIONS },
    { l: 'Fuel Type', f: 'fuelType', t: 'select', opts: FUEL_TYPES },
    { l: 'Drive Train', f: 'driveTrain', t: 'select', opts: DRIVE_TRAINS },
    { l: 'Mileage (KM)', f: 'mileage', t: 'number', ph: '12,500' },
    { l: 'Seats', f: 'seatingCapacity', t: 'number', ph: '7' },
    { l: 'VIN / Chassis', f: 'vin', t: 'text', ph: 'Optional' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-24 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="flex justify-between items-end mb-16">
        <div>
           <h1 className="text-5xl font-black tracking-tighter">Manifest <span className="text-orange-600">Unit.</span></h1>
           <p className="text-slate-400 font-medium italic mt-2">New detailed listing for {d.name}</p>
        </div>
        <div className="flex gap-2">
           {[1, 2, 3, 4].map(s => (
             <div key={s} className={`h-2 w-12 rounded-full transition-all duration-500 ${step >= s ? 'bg-orange-600' : 'bg-slate-100'}`} />
           ))}
        </div>
      </div>

      <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-slate-50 relative overflow-hidden">
        {step === 1 && (
          <div className="space-y-12 animate-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-4">
               <Layout className="w-8 h-8 text-orange-600" />
               <h3 className="text-3xl font-black tracking-tighter">Primary Identity</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               {fields_step1.map(f => (
                 <div key={f.f} className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{f.l}</label>
                    {f.t === 'select' ? (
                      <select className="w-full bg-slate-50 p-5 rounded-3xl outline-none font-black text-sm border-2 border-transparent focus:border-orange-500 transition-all" value={(formData as any)[f.f]} onChange={e => setFormData({...formData, [f.f]: e.target.value})}>
                        {f.opts?.map(o => <option key={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input type={f.t} placeholder={f.ph} className="w-full bg-slate-50 p-5 rounded-3xl outline-none font-black text-sm border-2 border-transparent focus:border-orange-500 transition-all" value={(formData as any)[f.f]} onChange={e => setFormData({...formData, [f.f]: e.target.value})} />
                    )}
                 </div>
               ))}
            </div>
            <div className="flex justify-end pt-8"><button onClick={nextStep} className="bg-slate-900 text-white px-12 py-6 rounded-full font-black uppercase text-xs tracking-widest flex items-center gap-3 hover:bg-orange-600 transition-all">Next: Technical Specs <ArrowRight className="w-4 h-4" /></button></div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-12 animate-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-4">
               <Zap className="w-8 h-8 text-orange-600" />
               <h3 className="text-3xl font-black tracking-tighter">Technical Manifest</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               {fields_step2.map(f => (
                 <div key={f.f} className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{f.l}</label>
                    {f.t === 'select' ? (
                       <select className="w-full bg-slate-50 p-5 rounded-3xl outline-none font-black text-sm border-2 border-transparent focus:border-orange-500 transition-all" value={(formData as any)[f.f]} onChange={e => setFormData({...formData, [f.f]: e.target.value})}>
                          {f.opts?.map(o => <option key={o}>{o}</option>)}
                       </select>
                    ) : (
                       <input type={f.t} placeholder={f.ph} className="w-full bg-slate-50 p-5 rounded-3xl outline-none font-black text-sm border-2 border-transparent focus:border-orange-500 transition-all" value={(formData as any)[f.f]} onChange={e => setFormData({...formData, [f.f]: e.target.value})} />
                    )}
                 </div>
               ))}
            </div>
            <div className="flex justify-between pt-8">
               <button onClick={prevStep} className="bg-slate-100 text-slate-400 px-12 py-6 rounded-full font-black uppercase text-xs tracking-widest">Back</button>
               <button onClick={nextStep} className="bg-slate-900 text-white px-12 py-6 rounded-full font-black uppercase text-xs tracking-widest flex items-center gap-3 hover:bg-orange-600 transition-all">Next: Assets <ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-12 animate-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-4">
               <Camera className="w-8 h-8 text-orange-600" />
               <h3 className="text-3xl font-black tracking-tighter">Asset & Finance</h3>
            </div>
            <PhotoUploadZone photos={photos} onPhotosAdded={setPhotos} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Sale Price (UGX)</label>
                  <input type="number" placeholder="150,000,000" className="w-full bg-slate-50 p-5 rounded-3xl outline-none font-black text-sm border-2 border-transparent focus:border-orange-500 transition-all" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Units In Stock</label>
                  <input type="number" placeholder="1" className="w-full bg-slate-50 p-5 rounded-3xl outline-none font-black text-sm border-2 border-transparent focus:border-orange-500 transition-all" value={formData.unitsAvailable} onChange={e => setFormData({...formData, unitsAvailable: e.target.value})} />
               </div>
            </div>
            <div className="p-8 bg-blue-50/50 rounded-[3rem] border-2 border-dashed border-blue-200 space-y-6">
               <label className="flex items-center gap-4 cursor-pointer group">
                  <input type="checkbox" className="w-6 h-6 accent-blue-600" checked={formData.isRentalAvailable} onChange={e => setFormData({...formData, isRentalAvailable: e.target.checked})} />
                  <div>
                    <h4 className="text-xl font-black text-blue-900 flex items-center gap-2"><Key className="w-5 h-5" /> Activate Rental Module</h4>
                    <p className="text-xs text-blue-500 font-bold">This will list the unit in the Nexa Hire directory.</p>
                  </div>
               </label>
               {formData.isRentalAvailable && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Daily Hire Rate (UGX)</label>
                      <input type="number" className="w-full bg-white p-5 rounded-3xl outline-none font-black text-sm border-2 border-transparent focus:border-blue-500" value={formData.dailyRate} onChange={e => setFormData({...formData, dailyRate: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Rental Style</label>
                      <select className="w-full bg-white p-5 rounded-3xl outline-none font-black text-sm border-2 border-transparent focus:border-blue-500" value={formData.rentalType} onChange={e => setFormData({...formData, rentalType: e.target.value as RentalType})}>
                         <option>Self-drive</option><option>With Driver</option><option>Both</option>
                      </select>
                    </div>
                 </div>
               )}
            </div>
            <div className="flex justify-between pt-8">
               <button onClick={prevStep} className="bg-slate-100 text-slate-400 px-12 py-6 rounded-full font-black uppercase text-xs tracking-widest">Back</button>
               <button onClick={nextStep} className="bg-slate-900 text-white px-12 py-6 rounded-full font-black uppercase text-xs tracking-widest flex items-center gap-3 hover:bg-orange-600 transition-all">Finalize <ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-12 animate-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-4">
               <ListChecks className="w-8 h-8 text-orange-600" />
               <h3 className="text-3xl font-black tracking-tighter">Features & Dispatch</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
               {VEHICLE_FEATURES.map(f => (
                 <button key={f} type="button" onClick={() => setSelectedFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f])} className={`p-5 rounded-3xl font-bold text-[10px] text-left uppercase tracking-widest transition-all flex items-center gap-3 border-2 ${selectedFeatures.includes(f) ? 'bg-orange-600 text-white border-orange-600' : 'bg-slate-50 text-slate-400 border-transparent hover:border-slate-200'}`}>
                   {f}
                 </button>
               ))}
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Editorial Description</label>
               <textarea rows={5} className="w-full bg-slate-50 p-8 rounded-[3rem] outline-none font-bold text-sm border-2 border-transparent focus:border-orange-500" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>
            <div className="flex justify-between pt-8">
               <button onClick={prevStep} className="bg-slate-100 text-slate-400 px-12 py-6 rounded-full font-black uppercase text-xs tracking-widest">Back</button>
               <button onClick={handleFinalSubmit} disabled={loading} className="bg-orange-600 text-white px-16 py-7 rounded-full font-black uppercase text-sm tracking-[0.2em] flex items-center gap-4 hover:bg-slate-900 transition-all shadow-2xl shadow-orange-600/30 active:scale-95 disabled:opacity-50">
                  {loading ? <Activity className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-6 h-6" />}
                  {loading ? 'Transmitting...' : 'Verify & Publish'}
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
