
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../components/StatCard';
import { getBusinessInsights, BusinessInsight } from '../services/geminiService';
import { GoogleAnalyticsService, GADataPoint, GALeadDetail } from '../services/googleAnalyticsService';

const Dashboard: React.FC = () => {
  const [insights, setInsights] = useState<BusinessInsight[]>([]);
  const [chartData, setChartData] = useState<GADataPoint[]>([]);
  const [leads, setLeads] = useState<GALeadDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [reportData, leadData] = await Promise.all([
        GoogleAnalyticsService.getRealReport(),
        GoogleAnalyticsService.getLeadDetails()
      ]);
      
      setChartData(reportData);
      setLeads(leadData);
      
      const aiInsights = await getBusinessInsights({ 
        source: 'GA4 Monthly Data',
        metrics: reportData,
        leadSummary: leadData.slice(0, 5)
      });
      setInsights(aiInsights);
    } catch (e: any) {
      setError(e.message || "Failed to sync with API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Backend Overview</h2>
          <div className="flex items-center mt-1 text-sm">
            <span className="text-emerald-600 font-medium flex items-center">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
              Live Data (30 Days): Property 514477194
            </span>
          </div>
        </div>
        <button onClick={loadData} disabled={loading} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all flex items-center">
          <svg className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          Sync Now
        </button>
      </header>

      {error && (
        <div className="bg-rose-50 border border-rose-100 text-rose-600 p-4 rounded-xl text-sm flex items-center">
          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
          <div>
            <p className="font-bold">Connection Issue</p>
            <p className="opacity-80">{error}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Users (30d)" value={chartData.reduce((acc, curr) => acc + curr.traffic, 0).toLocaleString()} change="Monthly" isPositive={true} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>} />
        <StatCard title="Total Leads (30d)" value={leads.reduce((acc, curr) => acc + curr.conversions, 0)} change="Monthly" isPositive={true} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>} />
        <StatCard title="Primary Channel" value={leads[0]?.source || 'Scanning...'} change="Top" isPositive={true} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/></svg>} />
        <StatCard title="Sessions" value={leads.reduce((acc, curr) => acc + curr.sessions, 0).toLocaleString()} change="Traffic" isPositive={true} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 min-h-[400px]">
            <h3 className="font-bold text-slate-800 mb-6">Monthly Traffic & Lead Performance</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                  <Area type="monotone" dataKey="traffic" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorTraffic)" name="Visitors" />
                  <Area type="monotone" dataKey="conv" stroke="#10b981" strokeWidth={3} fillOpacity={0} name="Leads" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Traffic Sources & Potential Leads (GA4)</h3>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full uppercase">30 Days</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase">Live</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[11px] text-slate-400 uppercase bg-slate-50/50">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Date</th>
                    <th className="px-6 py-3 font-semibold">Source / Medium</th>
                    <th className="px-6 py-3 font-semibold">Campaign</th>
                    <th className="px-6 py-3 font-semibold text-right">Sessions</th>
                    <th className="px-6 py-3 font-semibold text-right">Conversions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {leads.length > 0 ? leads.map((lead, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-600">{lead.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2 ${lead.source.includes('facebook') ? 'bg-blue-500' : lead.source.includes('google') ? 'bg-orange-400' : lead.source.includes('direct') ? 'bg-slate-400' : 'bg-indigo-400'}`}></span>
                          <span className="text-slate-800 font-semibold">{lead.source}</span>
                          <span className="text-slate-400 mx-1">/</span>
                          <span className="text-slate-500">{lead.medium}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500 italic text-xs truncate max-w-[150px]">{lead.campaign === '(not set)' ? 'Direct/General' : lead.campaign}</td>
                      <td className="px-6 py-4 text-right font-medium text-slate-600">{lead.sessions}</td>
                      <td className="px-6 py-4 text-right">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${lead.conversions > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-300'}`}>
                          {lead.conversions}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-slate-400 italic">
                        {loading ? 'Fetching monthly source data...' : 'No traffic source data found. Ensure your GA4 tag is firing.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {leads.length > 0 && leads.every(l => l.conversions === 0) && (
              <div className="p-4 bg-amber-50 border-t border-amber-100 flex items-start">
                <svg className="w-4 h-4 text-amber-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/></svg>
                <p className="text-[11px] text-amber-700">
                  <strong>Note:</strong> Traffic is being tracked, but 0 conversions were found. To see conversions here, you must mark events as <strong>"Key Events"</strong> in your Google Analytics Admin panel.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-900 rounded-3xl p-6 text-white shadow-xl">
            <h3 className="font-bold text-lg mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-indigo-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"/></svg>
              Channel Insights
            </h3>
            <div className="space-y-4">
              {insights.length > 0 ? insights.map((insight, idx) => (
                <div key={idx} className="bg-indigo-800/40 rounded-xl p-4 border border-indigo-700/50">
                  <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
                  <p className="text-xs text-indigo-200 mb-2">{insight.description}</p>
                  <p className="text-[11px] text-white italic font-medium bg-indigo-700/30 p-2 rounded border-l-2 border-indigo-400">
                    {insight.recommendation}
                  </p>
                </div>
              )) : (
                <p className="text-sm text-indigo-300 italic">Analyzing traffic data...</p>
              )}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
             <h4 className="font-bold text-slate-800 mb-4 text-sm">Traffic Share</h4>
             <div className="space-y-4">
                {Array.from(new Set(leads.map(l => l.source))).slice(0, 5).map((source, i) => {
                  const count = leads.filter(l => l.source === source).reduce((a, b) => a + b.sessions, 0);
                  const total = leads.reduce((a, b) => a + b.sessions, 0) || 1;
                  const pct = Math.round((count / total) * 100);
                  return (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-slate-600 truncate mr-2">{source}</span>
                        <span className="text-slate-400">{pct}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
