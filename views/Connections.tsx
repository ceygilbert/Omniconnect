import React from 'react';
import { GoogleAnalyticsService } from '../services/googleAnalyticsService';

const Connections: React.FC = () => {
  const isGAConfigured = GoogleAnalyticsService.isConfigured();
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-20">
      <header>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">API Backend Configuration</h2>
        <p className="text-slate-500 mt-1">Manage your business data pipeline and credentials securely.</p>
      </header>

      {/* Security Warning Section */}
      <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 flex flex-col md:flex-row items-start gap-6 shadow-sm">
        <div className="bg-amber-100 p-4 rounded-2xl text-amber-600 shrink-0">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H8m13 2.857A2.857 2.857 0 0118.143 21H5.857A2.857 2.857 0 013 18.143V5.857A2.857 2.857 0 015.857 3h12.286A2.857 2.857 0 0121 5.857v12.286zM12 9V5" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-amber-900 font-bold text-lg mb-2 flex items-center">
            GitHub "Push Rejected"?
          </h3>
          <p className="text-amber-800 text-sm leading-relaxed mb-4">
            GitHub blocks commits that contain sensitive API keys to protect your account. 
            To upload successfully, you <strong>must not hardcode</strong> secrets. Instead, use Netlify's Environment Variables.
          </p>
          <div className="bg-white/50 rounded-xl p-4 border border-amber-100">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">Netlify Configuration Guide</h4>
            <p className="text-xs text-amber-800">
              Go to: <strong>Site configuration > Environment variables</strong>
            </p>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between text-[11px] font-mono bg-amber-100/50 p-2 rounded">
                <span className="text-amber-900 font-bold">GA_CLIENT_ID</span>
                <span className="text-amber-700">your-client-id</span>
              </div>
              <div className="flex justify-between text-[11px] font-mono bg-amber-100/50 p-2 rounded">
                <span className="text-amber-900 font-bold">GA_CLIENT_SECRET</span>
                <span className="text-amber-700">your-secret-key</span>
              </div>
              <div className="flex justify-between text-[11px] font-mono bg-amber-100/50 p-2 rounded">
                <span className="text-amber-900 font-bold">GA_REFRESH_TOKEN</span>
                <span className="text-amber-700">your-refresh-token</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* GA4 Card */}
        <div className={`bg-white rounded-[2rem] p-8 shadow-sm border transition-all duration-500 ${isGAConfigured ? 'border-emerald-100 ring-4 ring-emerald-50' : 'border-slate-100'}`}>
          <div className="flex items-center justify-between mb-8">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center p-4">
              <img src="https://www.gstatic.com/analytics-suite/header/suite/v2/ic_analytics.svg" alt="GA4" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col items-end">
              <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                isGAConfigured ? 'bg-emerald-500 text-white' : 'bg-rose-100 text-rose-600'
              }`}>
                {isGAConfigured ? 'CONNECTED' : 'DISCONNECTED'}
              </span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Google Analytics 4</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            {isGAConfigured 
              ? 'Netlify environment variables detected. Live traffic data is active.' 
              : 'Credentials not found in Netlify. Dashboard is showing demo/mock data.'}
          </p>
        </div>

        {/* Facebook Mock */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 opacity-50 grayscale transition-all cursor-not-allowed">
           <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center p-4 mb-8">
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="FB" className="w-full h-full object-contain" />
           </div>
           <h3 className="text-xl font-bold text-slate-800 mb-2">Facebook Ads</h3>
           <p className="text-sm text-slate-500">Facebook Marketing API integration is pending client_id verification.</p>
        </div>

        {/* WhatsApp Mock */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 opacity-50 grayscale transition-all cursor-not-allowed">
           <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center p-4 mb-8">
             <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" className="w-full h-full object-contain" />
           </div>
           <h3 className="text-xl font-bold text-slate-800 mb-2">WhatsApp Cloud</h3>
           <p className="text-sm text-slate-500">Business API requires a verified Business Manager phone ID.</p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full -mr-32 -mt-32 opacity-10 blur-3xl"></div>
        
        <div className="relative z-10 max-w-4xl">
          <h4 className="text-2xl font-bold mb-2">Netlify Deployment Tutorial</h4>
          <p className="text-slate-400 mb-10 text-sm">Follow these steps to safely connect your live data without triggering GitHub security blocks.</p>
          
          <div className="space-y-12">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold mr-6 shrink-0 border-4 border-slate-900 ring-1 ring-indigo-400 text-sm">1</div>
              <div className="flex-1">
                <h5 className="font-bold text-lg mb-1">Clean Your Code</h5>
                <p className="text-slate-400 text-sm mb-4">Make sure no strings like "client_secret" are hardcoded in any .ts files.</p>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                  <p className="text-[10px] text-slate-300">
                    GitHub scans for patterns. Use <code>process.env.VARIABLE_NAME</code> instead of values.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold mr-6 shrink-0 border-4 border-slate-900 ring-1 ring-indigo-400 text-sm">2</div>
              <div className="flex-1">
                <h5 className="font-bold text-lg mb-1">Add Variables in Netlify</h5>
                <p className="text-slate-400 text-sm mb-4">Login to Netlify and navigate to your site's settings.</p>
                
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <p className="text-xs text-slate-300 mb-4">Under <strong>Environment variables</strong>, click "Add a variable":</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
                       <span className="text-[9px] font-bold text-slate-500 uppercase block mb-1">Key</span>
                       <code className="text-[10px] text-indigo-300 font-mono">GA_CLIENT_ID</code>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
                       <span className="text-[9px] font-bold text-slate-500 uppercase block mb-1">Key</span>
                       <code className="text-[10px] text-rose-300 font-mono">GA_CLIENT_SECRET</code>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
                       <span className="text-[9px] font-bold text-slate-500 uppercase block mb-1">Key</span>
                       <code className="text-[10px] text-emerald-300 font-mono">GA_REFRESH_TOKEN</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold mr-6 shrink-0 border-4 border-slate-900 ring-1 ring-indigo-400 text-sm">3</div>
              <div className="flex-1">
                <h5 className="font-bold text-lg mb-1">Redeploy</h5>
                <p className="text-slate-400 text-sm">Trigger a manual deploy or push your code again. Netlify will inject these keys into the build.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connections;