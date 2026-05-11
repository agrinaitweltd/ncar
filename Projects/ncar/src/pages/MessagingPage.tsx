import React, { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { Send, Search, MoreVertical, Phone, MessageSquare, Clock, User, ChevronLeft, Car, Info } from 'lucide-react';
import { AppState, Conversation, Message, Vehicle, Dealer } from "../types/index";
import { MOCK_VEHICLES, MOCK_DEALERS } from "../data/mockData";
import { CURRENCY } from "../config/constants";

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    vehicleId: 'v1',
    buyerId: 'b1',
    dealerId: 'd1',
    lastMessageDate: new Date().toISOString(),
    messages: [
      { id: 'm1', senderId: 'b1', text: 'Is the Land Cruiser still available?', timestamp: new Date(Date.now() - 3600000).toISOString() },
      { id: 'm2', senderId: 'd1', text: 'Yes, it is available for inspection at our Nakawa bond. When can you visit?', timestamp: new Date(Date.now() - 1800000).toISOString() }
    ]
  }
];

export const MessagingPage = ({ state }: { state: AppState }) => {
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [activeId, setActiveId] = useState<string | null>(conversations[0]?.id || null);
  const [newMessage, setNewMessage] = useState('');
  const [showList, setShowList] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeId, conversations]);

  if (state.userType === 'guest') return <Navigate to="/login" />;

  const activeConv = conversations.find(c => c.id === activeId);
  const activeVehicle = MOCK_VEHICLES.find(v => v.id === activeConv?.vehicleId);
  const activePartner = state.userType === 'dealer' 
    ? { name: 'Buyer • Allan K.', id: activeConv?.buyerId } 
    : MOCK_DEALERS.find(d => d.id === activeConv?.dealerId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeId) return;

    const msg: Message = {
      id: 'm-new-' + Date.now(),
      senderId: state.userData?.id || 'unknown',
      text: newMessage,
      timestamp: new Date().toISOString()
    };

    setConversations(prev => prev.map(c => 
      c.id === activeId ? { ...c, messages: [...c.messages, msg], lastMessageDate: msg.timestamp } : c
    ));
    setNewMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 h-[calc(100vh-160px)] my-8 flex gap-8 animate-in fade-in duration-500">
      {/* Sidebar List */}
      <div className={`${showList ? 'flex' : 'hidden'} lg:flex flex-col w-full lg:w-96 bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden`}>
         <div className="p-8 border-b border-gray-50">
            <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
               <MessageSquare className="w-8 h-8 text-orange-600" />
               Chats
            </h2>
            <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-orange-600 transition-colors" />
               <input placeholder="Search messages..." className="w-full bg-gray-50 p-5 pl-12 rounded-[1.5rem] outline-none font-bold text-xs border-2 border-transparent focus:border-orange-500 transition-all" />
            </div>
         </div>
         <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {conversations.map(c => {
               const partner = state.userType === 'dealer' ? 'Allan K. (Buyer)' : MOCK_DEALERS.find(d => d.id === c.dealerId)?.name;
               const vehicle = MOCK_VEHICLES.find(v => v.id === c.vehicleId);
               const isActive = activeId === c.id;
               return (
                  <button 
                    key={c.id} 
                    onClick={() => { setActiveId(c.id); setShowList(false); }}
                    className={`w-full p-6 rounded-[2rem] text-left transition-all relative overflow-hidden group ${isActive ? 'bg-orange-600 text-white shadow-xl shadow-orange-600/30' : 'hover:bg-gray-50 active:scale-[0.98]'}`}
                  >
                     {isActive && <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>}
                     <div className="flex justify-between items-start mb-2 relative z-10">
                        <p className={`font-black text-sm truncate pr-4 ${isActive ? 'text-white' : 'text-gray-900'}`}>{partner}</p>
                        <p className={`text-[9px] font-bold shrink-0 ${isActive ? 'text-white/60' : 'text-gray-400'}`}>
                           {new Date(c.lastMessageDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                     </div>
                     <div className="flex items-center gap-2 relative z-10">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${isActive ? 'bg-white/10 border-white/20' : 'bg-gray-100 border-gray-200'}`}>
                           <Car className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                        </div>
                        <p className={`text-[10px] font-bold uppercase tracking-tight truncate ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                           {vehicle?.year} {vehicle?.make} {vehicle?.model}
                        </p>
                     </div>
                  </button>
               );
            })}
         </div>
      </div>

      {/* Main Chat Area */}
      <div className={`${!showList ? 'flex' : 'hidden'} lg:flex flex-1 flex-col bg-white rounded-[4rem] shadow-2xl border border-gray-100 overflow-hidden`}>
         {activeConv ? (
            <>
               {/* Chat Header */}
               <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-white relative z-10">
                  <div className="flex items-center gap-5">
                     <button onClick={() => setShowList(true)} className="lg:hidden p-3 hover:bg-gray-50 rounded-2xl transition">
                        <ChevronLeft className="w-6 h-6" />
                     </button>
                     <div className="relative">
                        <div className="h-16 w-16 bg-orange-100 text-orange-600 rounded-[1.5rem] flex items-center justify-center border-2 border-white shadow-lg font-black text-xl">
                           {activePartner?.name?.charAt(0)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
                     </div>
                     <div>
                        <h3 className="font-black text-gray-900 text-xl tracking-tight leading-none">{activePartner?.name}</h3>
                        <div className="flex items-center gap-3 mt-2">
                           <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest flex items-center gap-1.5 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                              <Car className="w-3 h-3" /> {activeVehicle?.make} {activeVehicle?.model}
                           </span>
                           <span className="text-[9px] font-bold text-gray-400 uppercase">Active Now</span>
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <button className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-gray-400 hover:text-orange-600 transition shadow-sm hover:shadow-md"><Phone className="w-5 h-5" /></button>
                     <button className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-gray-400 hover:text-orange-600 transition shadow-sm hover:shadow-md"><Info className="w-5 h-5" /></button>
                  </div>
               </div>

               {/* Messages Scroll Area */}
               <div className="flex-1 overflow-y-auto p-10 space-y-10 bg-[#F9FAFB]/30">
                  <div className="flex justify-center">
                     <span className="bg-white px-5 py-2 rounded-full border border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] shadow-sm">Today</span>
                  </div>
                  
                  {activeConv.messages.map(msg => {
                     const isMine = msg.senderId === state.userData?.id;
                     return (
                        <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                           <div className={`max-w-[75%] lg:max-w-[60%] group relative`}>
                              <div className={`p-6 shadow-xl ${isMine ? 'bg-gray-900 text-white rounded-[2.5rem] rounded-tr-md' : 'bg-white text-gray-900 rounded-[2.5rem] rounded-tl-md border border-gray-100'}`}>
                                 <p className="font-bold text-[15px] leading-relaxed">{msg.text}</p>
                                 <div className={`flex items-center gap-1.5 mt-3 text-[9px] font-black uppercase tracking-widest ${isMine ? 'text-white/40' : 'text-gray-400'}`}>
                                    <Clock className="w-3 h-3" />
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                 </div>
                              </div>
                           </div>
                        </div>
                     );
                  })}
                  <div ref={chatEndRef} />
               </div>

               {/* Message Input */}
               <div className="p-8 bg-white border-t border-gray-50">
                  <form onSubmit={handleSendMessage} className="bg-gray-50 p-2 rounded-[2.5rem] border border-gray-200 flex gap-4 focus-within:border-orange-500 focus-within:bg-white transition-all shadow-inner">
                     <input 
                       value={newMessage}
                       onChange={e => setNewMessage(e.target.value)}
                       placeholder="Message your dealer..." 
                       className="flex-1 bg-transparent p-5 rounded-full outline-none font-bold text-sm"
                     />
                     <button 
                       type="submit"
                       disabled={!newMessage.trim()}
                       className="bg-orange-600 text-white p-5 rounded-full shadow-2xl shadow-orange-600/30 hover:bg-orange-700 active:scale-95 transition disabled:opacity-50"
                     >
                        <Send className="w-6 h-6" />
                     </button>
                  </form>
               </div>
            </>
         ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
               <div className="w-48 h-48 bg-gray-50 rounded-full flex items-center justify-center mb-12 border-4 border-white shadow-2xl relative">
                  <MessageSquare className="w-20 h-20 text-gray-100" />
                  <div className="absolute top-0 right-0 w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center border-4 border-white animate-bounce">
                     <Send className="w-5 h-5" />
                  </div>
               </div>
               <h3 className="text-4xl font-black text-gray-900 tracking-tighter mb-4">Select a conversation</h3>
               <p className="max-w-xs text-gray-500 font-medium italic">Communicate directly with verified car bond managers in Uganda.</p>
            </div>
         )}
      </div>

      {/* Detail Sidebar (Desktop Only) */}
      {activeConv && activeVehicle && (
        <div className="hidden xl:flex flex-col w-80 bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-56 overflow-hidden">
            <img src={activeVehicle.images[0]} className="w-full h-full object-cover" alt="" />
          </div>
          <div className="p-8 space-y-8">
            <div>
              <h4 className="text-xl font-black text-gray-900 mb-1">{activeVehicle.make} {activeVehicle.model}</h4>
              <p className="text-orange-600 font-black text-lg">{CURRENCY} {activeVehicle.price.toLocaleString()}</p>
            </div>
            
            <div className="space-y-4">
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Vehicle Specs</p>
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-2xl text-center">
                    <p className="text-[8px] font-black text-gray-400 uppercase">Year</p>
                    <p className="text-xs font-black">{activeVehicle.year}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-2xl text-center">
                    <p className="text-[8px] font-black text-gray-400 uppercase">Mileage</p>
                    <p className="text-xs font-black">{activeVehicle.mileage}km</p>
                  </div>
               </div>
            </div>

            <button className="w-full bg-gray-900 text-white p-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-black transition shadow-xl shadow-gray-900/10">View Listing</button>
          </div>
        </div>
      )}
    </div>
  );
};