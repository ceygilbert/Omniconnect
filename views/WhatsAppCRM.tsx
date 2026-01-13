
import React, { useState } from 'react';
import { WhatsAppContact } from '../types';

const mockContacts: WhatsAppContact[] = [
  { id: '1', name: 'Loading...', lastMessage: 'Fetching...', unreadCount: 0, avatar: '' },
  { id: '2', name: 'Loading...', lastMessage: 'Fetching...', unreadCount: 0, avatar: '' },
];

const WhatsAppCRM: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<WhatsAppContact>(mockContacts[0]);

  return (
    <div className="h-full flex flex-col space-y-4 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Conversations Center</h2>
        <p className="text-slate-500 mt-1">Direct customer support via integrated WhatsApp Business API.</p>
      </header>

      <div className="flex-1 min-h-0 bg-white rounded-3xl shadow-sm border border-slate-100 flex overflow-hidden">
        {/* Contact List */}
        <div className="w-80 border-r border-slate-100 flex flex-col h-full bg-slate-50/50">
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <input 
                disabled
                type="text" 
                placeholder="Syncing contacts..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-sm cursor-not-allowed italic text-slate-400"
              />
              <svg className="w-4 h-4 absolute left-3 top-2.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-2 px-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest py-2">Active Sessions</p>
            </div>
            {mockContacts.map((contact) => (
              <div
                key={contact.id}
                className={`w-full flex items-center p-4 transition-colors border-b border-slate-50 ${selectedContact.id === contact.id ? 'bg-indigo-50/50' : ''}`}
              >
                {/* Avatar Skeleton */}
                <div className="w-12 h-12 rounded-full mr-3 bg-slate-200 animate-pulse shrink-0"></div>
                
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex justify-between items-center">
                    {/* Name Skeleton */}
                    <div className="h-3 bg-slate-200 rounded-full w-24 animate-pulse"></div>
                    <div className="h-2 bg-slate-100 rounded-full w-8 animate-pulse"></div>
                  </div>
                  {/* Message Skeleton */}
                  <div className="h-2 bg-slate-100 rounded-full w-full animate-pulse"></div>
                </div>
              </div>
            ))}
            
            {/* Status Footer for List */}
            <div className="mt-auto p-4 flex items-center justify-center space-x-2 text-indigo-400">
               <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
               <span className="text-[10px] font-bold uppercase tracking-wider">Refreshing Contact List...</span>
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col h-full bg-white">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center">
              {/* Header Avatar Skeleton */}
              <div className="w-10 h-10 rounded-full mr-3 bg-slate-200 animate-pulse"></div>
              <div>
                {/* Header Name Skeleton */}
                <div className="h-4 bg-slate-200 rounded-full w-32 animate-pulse mb-1"></div>
                <p className="text-[10px] text-indigo-500 font-semibold flex items-center">
                   <svg className="w-3 h-3 mr-1 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                   Syncing...
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-slate-300 cursor-not-allowed"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg></button>
              <button className="p-2 text-slate-300 cursor-not-allowed"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/></svg></button>
            </div>
          </div>

          {/* Loading State Area */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50/30">
            <div className="w-full max-w-md space-y-6">
              {/* Skeleton Bubbles */}
              <div className="flex justify-start">
                <div className="bg-slate-200 h-10 w-3/4 rounded-2xl rounded-tl-none animate-pulse"></div>
              </div>
              <div className="flex justify-end">
                <div className="bg-indigo-100 h-10 w-2/3 rounded-2xl rounded-tr-none animate-pulse"></div>
              </div>
              <div className="flex justify-start">
                <div className="bg-slate-200 h-16 w-4/5 rounded-2xl rounded-tl-none animate-pulse"></div>
              </div>

              {/* Central Loading Message */}
              <div className="flex flex-col items-center py-8">
                <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center text-center max-w-xs animate-in zoom-in duration-700">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
                     <svg className="w-6 h-6 text-indigo-600 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  </div>
                  <h5 className="text-sm font-bold text-slate-800 mb-1">Connecting to Backend</h5>
                  <p className="text-xs text-slate-500 mb-4">Establishing secure handshake with Meta Cloud API...</p>
                  <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full w-2/3 animate-[loading_2s_ease-in-out_infinite]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-slate-100">
            <div className="flex gap-2 opacity-50 grayscale cursor-not-allowed">
              <button type="button" disabled className="p-2 text-slate-400"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg></button>
              <input 
                disabled
                type="text" 
                placeholder="Synchronizing data..." 
                className="flex-1 px-4 py-2 border border-slate-200 rounded-xl text-sm bg-slate-50"
              />
              <button disabled className="bg-slate-400 text-white px-4 py-2 rounded-xl transition-colors">
                <svg className="w-5 h-5 transform rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default WhatsAppCRM;
