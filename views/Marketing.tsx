
import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { getMarketingStrategy, AdStrategy } from '../services/geminiService';

const campaignData = [
  { name: 'Retargeting_Fall_23', spend: 4500, clicks: 12000, conv: 340, costPerConv: 13.23, roi: 3.2 },
  { name: 'Lookalike_Broad_New', spend: 8200, clicks: 25000, conv: 520, costPerConv: 15.76, roi: 2.8 },
  { name: 'Newsletter_Signup_Lead', spend: 2100, clicks: 8000, conv: 410, costPerConv: 5.12, roi: 5.4 },
  { name: 'Brand_Awareness_Video', spend: 12000, clicks: 45000, conv: 120, costPerConv: 100.00, roi: 0.8 },
];

const trafficSources = [
  { name: 'Direct', value: 400, color: '#6366f1' },
  { name: 'Social', value: 300, color: '#8b5cf6' },
  { name: 'Organic', value: 300, color: '#ec4899' },
  { name: 'Paid', value: 200, color: '#f43f5e' },
];

const Marketing: React.FC = () => {
  const [strategy, setStrategy] = useState<AdStrategy | null>(null);
  const [loadingStrategy, setLoadingStrategy] = useState(false);

  // Identify the winner and laggard automatically for the UI
  const bestCampaign = [...campaignData].sort((a, b) => a.costPerConv - b.costPerConv)[0];
  const worstCampaign = [...campaignData].sort((a, b) => b.costPerConv - a.costPerConv)[0];

  const fetchAIStrategy = async () => {
    setLoadingStrategy(true);
    const result = await getMarketingStrategy(campaignData);
    setStrategy(result);
    setLoadingStrategy(false);
  };

  useEffect(() => {
    fetchAIStrategy();
  }, []);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Marketing Intelligence</h2>
          <p className="text-slate-500 mt-1">Strategic breakdown of your Ad performance and acquisition efficiency.</p>
        </div>
        <button 
          onClick={fetchAIStrategy}
          disabled={loadingStrategy}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center"
        >
          {loadingStrategy ? (
            <svg className="animate-spin h-4 w-4 mr-2 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          ) : (
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          )}
          Refresh Strategy
        </button>
      </header>

      {/* Strategy Spotlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
            <svg className="w-16 h-16 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
          </div>
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Top Performer</p>
          <h4 className="text-lg font-bold text-emerald-900 truncate mb-1">{bestCampaign.name}</h4>
          <p className="text-2xl font-black text-emerald-700">${bestCampaign.costPerConv.toFixed(2)} <span className="text-xs font-normal text-emerald-600">CPA</span></p>
        </div>

        <div className="bg-rose-50 border border-rose-100 p-6 rounded-3xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
            <svg className="w-16 h-16 text-rose-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
          </div>
          <p className="text-[10px] font-bold text-rose-600 uppercase tracking-widest mb-1">Optimization Required</p>
          <h4 className="text-lg font-bold text-rose-900 truncate mb-1">{worstCampaign.name}</h4>
          <p className="text-2xl font-black text-rose-700">${worstCampaign.costPerConv.toFixed(2)} <span className="text-xs font-normal text-rose-600">CPA</span></p>
        </div>

        <div className="md:col-span-2 bg-indigo-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden flex items-center">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full -mr-16 -mt-16 opacity-20"></div>
          <div className="relative z-10 flex-1">
            <div className="flex items-center mb-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-300">Live Ad Analysis</p>
            </div>
            <p className="text-sm text-indigo-100 leading-relaxed italic">
              "You are spending {Math.round((worstCampaign.spend / (bestCampaign.spend + worstCampaign.spend)) * 100)}% of your budget on your least efficient campaign. Consider reallocating to <strong>{bestCampaign.name}</strong>."
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Campaign Breakdown Table */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
              Ad Set Performance Comparison
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[11px] text-slate-400 uppercase bg-slate-50 border-y border-slate-100">
                  <tr>
                    <th className="px-4 py-3 font-bold">Campaign Name</th>
                    <th className="px-4 py-3 font-bold text-right">Spend</th>
                    <th className="px-4 py-3 font-bold text-right">Conv.</th>
                    <th className="px-4 py-3 font-bold text-right">CPA</th>
                    <th className="px-4 py-3 font-bold text-right">ROI</th>
                    <th className="px-4 py-3 text-center">Efficiency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {campaignData.map((campaign, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-4 py-5 font-bold text-slate-700 truncate max-w-[180px]">{campaign.name}</td>
                      <td className="px-4 py-5 text-right text-slate-600 font-medium">${campaign.spend.toLocaleString()}</td>
                      <td className="px-4 py-5 text-right text-slate-600">{campaign.conv}</td>
                      <td className="px-4 py-5 text-right font-bold text-indigo-600">${campaign.costPerConv.toFixed(2)}</td>
                      <td className="px-4 py-5 text-right font-bold text-emerald-600">{campaign.roi}x</td>
                      <td className="px-4 py-5">
                        <div className="w-20 h-2 bg-slate-100 rounded-full mx-auto overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${campaign.costPerConv < 15 ? 'bg-emerald-500' : campaign.costPerConv < 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                            style={{ width: `${Math.min(100, (1 / campaign.costPerConv) * 500)}%` }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-6">Efficiency Chart (ROI vs CPA)</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={campaignData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dy={10} />
                  <YAxis yAxisId="left" orientation="left" stroke="#6366f1" axisLine={false} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" stroke="#10b981" axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                  <Legend verticalAlign="top" align="right" />
                  <Bar yAxisId="left" dataKey="costPerConv" name="CPA ($)" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={40} />
                  <Bar yAxisId="right" dataKey="roi" name="ROI (x)" fill="#10b981" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* AI Strategy Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-indigo-50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600"></div>
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <span className="bg-indigo-100 p-2 rounded-xl mr-3">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
              </span>
              AI Strategy Studio
            </h3>

            {strategy ? (
              <div className="space-y-6 animate-in fade-in zoom-in duration-500">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Winning Campaign</label>
                  <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <p className="font-bold text-indigo-900 text-lg">{strategy.winner}</p>
                    <p className="text-xs text-indigo-700 mt-1">{strategy.reasoning}</p>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Tactical Steps</label>
                  <ul className="space-y-3">
                    {strategy.tacticalAdvice.map((step, idx) => (
                      <li key={idx} className="flex items-start text-sm text-slate-600">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-bold mt-0.5 mr-3">{idx + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Scaling Potential</p>
                    <p className={`font-bold capitalize ${strategy.scalingPotential === 'high' ? 'text-emerald-600' : 'text-amber-500'}`}>{strategy.scalingPotential}</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12"/></svg>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="inline-block animate-bounce mb-4">
                  <svg className="w-10 h-10 text-slate-200" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/></svg>
                </div>
                <p className="text-sm text-slate-400 italic">Analysis engine offline. Refresh to generate tactical advice.</p>
              </div>
            )}
          </div>

          <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
            <h4 className="font-bold text-slate-800 mb-4 text-xs uppercase tracking-widest">Traffic Volume Mix</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficSources}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {trafficSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {trafficSources.map((src, i) => (
                <div key={i} className="flex items-center text-[10px] font-bold text-slate-500">
                  <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: src.color }}></span>
                  {src.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketing;
