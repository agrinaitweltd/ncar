import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Activity, CheckCircle2, Upload, FileCheck, ShieldCheck, X, FileText, AlertCircle, FileIcon, Eye, Camera } from 'lucide-react';
import { Logo } from "../components/Logo";
import { Dealer, VaultFile } from "../types/index";
import { PaymentModal } from "./PaymentPage";

// Fix: Corrected onFilesChanged type to support functional updates and resolved 'unknown' type errors for File objects
const VaultUploader = ({ files, onFilesChanged }: { files: VaultFile[], onFilesChanged: React.Dispatch<React.SetStateAction<VaultFile[]>> }) => {
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const SUPPORTED_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'image/jpeg',
    'image/png',
    'image/gif'
  ];
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    setError('');
    const newFiles: VaultFile[] = [];

    // Fix: Explicitly cast Array.from(selectedFiles) to File[] to ensure property access
    const filesArray = Array.from(selectedFiles) as File[];

    filesArray.forEach(file => {
      if (!SUPPORTED_TYPES.includes(file.type)) {
        setError(`Type "${file.type}" not supported. Use PDF, DOC, or Images.`);
        return;
      }
      if (file.size > MAX_SIZE) {
        setError('File too large. Max 10MB.');
        return;
      }

      const id = Math.random().toString(36).substring(7);
      const newFile: VaultFile = {
        id,
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
        status: 'uploading',
        progress: 0,
        uploadedAt: new Date().toISOString()
      };
      
      newFiles.push(newFile);
      simulateUpload(id);
    });

    onFilesChanged(prev => [...prev, ...newFiles]);
  };

  const simulateUpload = (id: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        updateFileStatus(id, 100, 'completed');
      } else {
        updateFileStatus(id, Math.floor(progress), 'uploading');
      }
    }, 400);
  };

  const updateFileStatus = (id: string, progress: number, status: 'uploading' | 'completed' | 'error') => {
    onFilesChanged(prev => prev.map(f => f.id === id ? { ...f, progress, status } : f));
  };

  const removeFile = (id: string) => {
    onFilesChanged(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-6">
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="w-full border-4 border-dashed border-slate-100 rounded-[2.5rem] p-12 text-center hover:bg-orange-50 hover:border-orange-200 transition-all cursor-pointer group flex flex-col items-center gap-4"
      >
        <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-xl border border-slate-50 group-hover:scale-110 transition-transform">
          <Upload className="w-8 h-8 text-orange-600" />
        </div>
        <div>
          <h4 className="text-xl font-black text-slate-900 tracking-tight">Access Document Vault</h4>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2 italic">PDF, Word, or Scanned Images (Max 10MB)</p>
        </div>
        <input 
          type="file" 
          multiple 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept={SUPPORTED_TYPES.join(',')}
        />
      </div>

      {error && (
        <div className="bg-red-50 p-4 rounded-2xl border border-red-100 flex items-center gap-3 animate-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">{error}</p>
        </div>
      )}

      <div className="space-y-3">
        {files.map(file => (
          <div key={file.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 flex items-center gap-4 shadow-sm group">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-orange-600 transition-colors overflow-hidden">
               {file.type.startsWith('image/') ? (
                 <img src={file.url} className="w-full h-full object-cover" />
               ) : (
                 <FileText className="w-6 h-6" />
               )}
            </div>
            <div className="flex-1 min-w-0">
               <div className="flex justify-between items-end mb-1">
                  <p className="text-[11px] font-black text-slate-900 truncate pr-4">{file.name}</p>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
               </div>
               <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${file.status === 'completed' ? 'bg-green-500' : 'bg-orange-500'}`}
                    style={{ width: `${file.progress}%` }}
                  ></div>
               </div>
               <div className="flex justify-between mt-1">
                  <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${file.status === 'completed' ? 'text-green-600' : 'text-orange-600'}`}>
                    {file.status === 'completed' ? 'Stored in Vault' : `Encrypting ${file.progress}%`}
                  </span>
                  {file.status === 'completed' && (
                    <div className="flex gap-2">
                      <a href={file.url} target="_blank" className="text-[8px] font-black text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-1">
                        <Eye className="w-2.5 h-2.5" /> Preview
                      </a>
                    </div>
                  )}
               </div>
            </div>
            <button onClick={() => removeFile(file.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const DealerSignUp = ({ setDealers, setState }: { setDealers: any, setState: any }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [step, setStep] = useState<'info' | 'docs'>('info');
  const [vaultFiles, setVaultFiles] = useState<VaultFile[]>([]);
  const logoInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    businessRegNo: '',
    representativeName: '',
    district: 'Kampala',
    address: '',
    logo: ''
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'info') {
      if (!formData.logo) {
        alert('Please upload your dealership logo to proceed.');
        return;
      }
      setStep('docs');
    } else {
      if (vaultFiles.length === 0) {
        alert('Please upload at least one identification document for compliance verification.');
        return;
      }
      const allDone = vaultFiles.every(f => f.status === 'completed');
      if (!allDone) {
        alert('Please wait for all encryption processes to complete before proceeding.');
        return;
      }
      setIsPaymentOpen(true);
    }
  };

  const handlePaymentSuccess = (method: 'MTN' | 'AIRTEL' | 'CARD') => {
    setIsPaymentOpen(false);
    setLoading(true);
    
    setTimeout(() => {
      const mockDealer: Dealer = {
        id: 'new-d-' + Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        whatsapp: formData.phone.replace(/[^0-9]/g, ''),
        location: formData.address || formData.district,
        district: formData.district,
        businessRegNo: formData.businessRegNo,
        representativeName: formData.representativeName,
        logo: formData.logo || 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=100&h=100',
        isVerified: false,
        status: 'PENDING_VERIFICATION',
        joinedDate: new Date().toISOString(),
        paymentStatus: 'PAID',
        paymentMethod: method,
        vaultFiles: vaultFiles
      };
      
      setDealers((prev: Dealer[]) => [...prev, mockDealer]);
      setState((prev: any) => ({
        ...prev,
        userType: 'dealer',
        userId: mockDealer.id,
        userData: mockDealer
      }));
      navigate('/dashboard');
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-20 animate-in fade-in duration-500">
      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        onPaymentComplete={handlePaymentSuccess}
        dealerName={formData.name || 'New Bond'}
      />

      <div className="bg-white max-w-4xl w-full rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        <div className="bg-orange-600 text-white p-12 md:w-5/12 hidden md:flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="mb-10">
              <Logo className="h-16" variant="white" />
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-black leading-tight mb-4">Merchant Portal</h2>
                <p className="text-sm text-orange-100 font-medium italic">Join Uganda's premium automotive network.</p>
              </div>
              
              <div className="space-y-4 mt-8 pt-8 border-t border-white/10">
                {[
                  { label: 'Merchant Identity', step: 'info' },
                  { label: 'Document Vault', step: 'docs' },
                  { label: 'Activation', step: 'payment' }
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-black transition-colors ${step === s.step || (step === 'docs' && s.step === 'info') ? 'bg-white text-orange-600 border-white' : 'border-white/30 text-white/50'}`}>
                      {i + 1}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${step === s.step ? 'text-white' : 'text-white/40'}`}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto space-y-4 pt-12 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="bg-orange-500/30 p-2 rounded-xl"><Lock className="w-4 h-4" /></div>
                <span className="text-[10px] font-black uppercase tracking-widest">AES-256 Storage</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-orange-500/30 p-2 rounded-xl"><ShieldCheck className="w-4 h-4" /></div>
                <span className="text-[10px] font-black uppercase tracking-widest">Compliance Ready</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-8 md:p-14 md:w-7/12 flex flex-col justify-center">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tighter">
              {step === 'info' ? 'Create Showroom' : 'Document Vault'}
            </h2>
            <p className="text-gray-500 text-sm italic">
              {step === 'info' ? 'Establish your digital marketplace presence.' : 'Securely upload your business credentials.'}
            </p>
          </div>
          
          <form onSubmit={handleNext} className="space-y-5">
            {step === 'info' ? (
              <>
                {/* Logo Upload Section */}
                <div className="flex flex-col items-center mb-8">
                  <div 
                    onClick={() => logoInputRef.current?.click()}
                    className="w-24 h-24 rounded-[2rem] bg-slate-50 border-4 border-dashed border-slate-100 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all group overflow-hidden"
                  >
                    {formData.logo ? (
                      <img src={formData.logo} className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <Camera className="w-6 h-6 text-slate-300 group-hover:text-orange-500 transition-colors" />
                        <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 mt-1">Logo</span>
                      </>
                    )}
                  </div>
                  <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">Dealership Logo Required</p>
                </div>

                <div className="relative group">
                  <label className="absolute -top-2 left-4 bg-white px-2 text-[9px] font-black text-orange-600 uppercase tracking-widest z-10">Legal Entity Name</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white p-4 rounded-2xl outline-none font-bold text-sm border-2 border-gray-100 focus:border-orange-500 transition-all shadow-sm" placeholder="e.g. Kampala Motors" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <label className="absolute -top-2 left-4 bg-white px-2 text-[9px] font-black text-gray-400 uppercase tracking-widest z-10">Trade License No</label>
                    <input required value={formData.businessRegNo} onChange={e => setFormData({...formData, businessRegNo: e.target.value})} className="w-full bg-white p-4 rounded-2xl outline-none font-bold text-sm border-2 border-gray-100 focus:border-orange-500 transition-all shadow-sm" placeholder="800..." />
                  </div>
                  <div className="relative group">
                    <label className="absolute -top-2 left-4 bg-white px-2 text-[9px] font-black text-gray-400 uppercase tracking-widest z-10">Business Contact</label>
                    <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-white p-4 rounded-2xl outline-none font-bold text-sm border-2 border-gray-100 focus:border-orange-500 transition-all shadow-sm" placeholder="07..." />
                  </div>
                </div>
                <div className="relative group">
                  <label className="absolute -top-2 left-4 bg-white px-2 text-[9px] font-black text-gray-400 uppercase tracking-widest z-10">Merchant Email</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white p-4 rounded-2xl outline-none font-bold text-sm border-2 border-gray-100 focus:border-orange-500 transition-all shadow-sm" placeholder="dealer@email.com" />
                </div>
                <div className="relative group">
                  <label className="absolute -top-2 left-4 bg-white px-2 text-[9px] font-black text-gray-400 uppercase tracking-widest z-10">Passkey</label>
                  <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-white p-4 rounded-2xl outline-none font-bold text-sm border-2 border-gray-100 focus:border-orange-500 transition-all shadow-sm" placeholder="••••••••" />
                </div>
              </>
            ) : (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                <VaultUploader files={vaultFiles} onFilesChanged={setVaultFiles} />
                
                <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <ShieldCheck className="w-4 h-4 text-green-500 mt-0.5" />
                  <p className="text-[9px] text-slate-400 font-bold leading-relaxed uppercase tracking-wide">
                    All uploads are processed through our secure encryption layer. Verified administrators will review your credentials within 24 hours.
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              {step === 'docs' && (
                <button type="button" onClick={() => setStep('info')} className="flex-1 bg-slate-100 text-slate-400 p-5 rounded-[2rem] font-black hover:bg-slate-200 transition-all active:scale-[0.98]">
                  <span className="uppercase tracking-widest text-xs">Back</span>
                </button>
              )}
              <button disabled={loading} className="flex-[2] bg-orange-600 text-white p-5 rounded-[2rem] font-black hover:bg-orange-700 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 shadow-lg shadow-orange-600/30 active:scale-[0.98]">
                <span className="uppercase tracking-widest text-xs">
                  {step === 'info' ? 'Next: Identity Vault' : 'Secure & Authorize'}
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
          
          <div className="mt-10 pt-8 border-t border-gray-50 text-center">
            <p className="text-sm text-gray-500 font-bold">
              Return to Showroom? <Link to="/login" className="text-orange-600 ml-2 hover:underline font-black">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};