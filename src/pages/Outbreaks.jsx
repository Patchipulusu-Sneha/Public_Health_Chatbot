import React, { useState } from 'react';
import { ShieldAlert, Radio, Search, MapPin, Layers, HeartPulse } from 'lucide-react';

function Outbreaks() {
  // Mock tracking registry retrieved from public health databases
  const [outbreaks] = useState([
    { id: 1, disease: "Seasonal Influenza (Flu-A)", region: "Zone A (Northern Hub)", cases: "142 Active", risk: "Moderate", advisory: "Increased vaccination clinics active.", trend: "Rising" },
    { id: 2, disease: "Dengue Fever Vector Virus", region: "Zone C (Southern District)", cases: "58 Active", risk: "High Alert", advisory: "Foggings and vector control active.", trend: "Stable" },
    { id: 3, disease: "Gastroenteritis Outbreak", region: "Zone B (Eastern Sector)", cases: "29 Active", risk: "Low Containment", advisory: "Water pipeline screening ongoing.", trend: "Declining" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredOutbreaks = outbreaks.filter(item => 
    item.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 text-[#1e3a8a] animate-fadeIn">
      {/* Header Info */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
          <ShieldAlert className="w-7 h-7 text-[rgb(65,65,227)]" /> Epidemiological Outbreak Tracking
        </h1>
        <p className="text-sm text-[#0369a1] font-medium mt-1">
          Real-time monitoring of local transmission logs, active clinical isolation clusters, and regional vector control alerts.
        </p>
      </div>

      {/* Visual Analytics Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Mock Map Vector Placeholder Panel */}
        <div className="lg:col-span-2 bg-white border border-[#bae6fd] rounded-2xl p-6 shadow-sm flex flex-col justify-between h-80 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#f0f9ff] pb-3 z-10 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[rgb(65,65,227)]" />
              <h2 className="text-sm font-extrabold text-[#0f172a]">Regional Transmission Clusters</h2>
            </div>
            <span className="text-[10px] font-bold text-white bg-[rgb(65,65,227)] px-2 py-0.5 rounded-md">Live Vector Simulation</span>
          </div>

          {/* Abstract Grid Map Simulation Layer using pure style overlays */}
          <div className="absolute inset-0 bg-[#f0f9ff]/40 flex items-center justify-center pointer-events-none p-12 mt-12">
            <div className="w-full h-full border border-dashed border-[#bae6fd] rounded-xl relative bg-white/40">
              {/* Dynamic blinking hotspot nodes using theme shades */}
              <div className="absolute top-1/4 left-1/3 flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full animate-ping absolute" />
                <span className="w-3 h-3 bg-red-600 rounded-full relative" />
                <span className="text-[10px] font-bold bg-white px-1.5 py-0.5 rounded shadow border border-[#bae6fd] text-slate-800">Zone A Hub</span>
              </div>
              <div className="absolute bottom-1/3 right-1/4 flex items-center gap-2">
                <span className="w-3 h-3 bg-[rgb(65,65,227)] rounded-full animate-pulse absolute" />
                <span className="w-3 h-3 bg-[rgb(65,65,227)] rounded-full relative" />
                <span className="text-[10px] font-bold bg-white px-1.5 py-0.5 rounded shadow border border-[#bae6fd] text-slate-800">Zone C Alert</span>
              </div>
            </div>
          </div>

          <div className="z-10 bg-[#f0f9ff] border border-[#bae6fd] p-3 rounded-xl flex items-center gap-3 text-xs font-semibold">
            <MapPin className="w-4 h-4 text-[rgb(65,65,227)] shrink-0" />
            <span>Interactive Map Modules will link your frontend maps with coordinate matrix JSON parameters downstream.</span>
          </div>
        </div>

        {/* Status Advisory Summary Box */}
        <div className="bg-white border border-[#bae6fd] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-[#0f172a] mb-1">Global Containment Matrix</h3>
            <p className="text-xs text-[#0284c7] font-medium mb-4">Current epidemiological defense indexes</p>
            
            <div className="space-y-3">
              <div className="p-3.5 bg-[#f0f9ff] border border-[#bae6fd] rounded-xl">
                <div className="flex justify-between text-xs font-bold">
                  <span>Containment Efficiency</span>
                  <span className="text-[rgb(65,65,227)]">92.4%</span>
                </div>
                <div className="w-full bg-white h-2 rounded-full mt-2 overflow-hidden border border-[#bae6fd]">
                  <div className="bg-[rgb(65,65,227)] h-full rounded-full" style={{ width: '92.4%' }} />
                </div>
              </div>

              <div className="p-3.5 bg-[#f0f9ff] border border-[#bae6fd] rounded-xl">
                <div className="flex justify-between text-xs font-bold">
                  <span>Vaccine Logistics Stock</span>
                  <span className="text-[rgb(65,65,227)]">78.1%</span>
                </div>
                <div className="w-full bg-white h-2 rounded-full mt-2 overflow-hidden border border-[#bae6fd]">
                  <div className="bg-[rgb(65,65,227)] h-full rounded-full" style={{ width: '78.1%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#f0f9ff] pt-4 flex items-center gap-2 text-xs font-bold text-[#0284c7]">
            <Radio className="w-4 h-4 text-[rgb(65,65,227)] animate-pulse" />
            <span>Refreshed: Live Telemetry Active</span>
          </div>
        </div>

      </div>

      {/* Database Filtering Cluster */}
      <div className="bg-white border border-[#bae6fd] rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#0284c7] absolute left-3 top-3" />
          <input 
            type="text" 
            placeholder="Search outbreaks or zones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#f0f9ff]/60 border border-[#bae6fd] rounded-xl text-xs font-bold text-[#0f172a] placeholder-[#0284c7] focus:outline-none focus:border-[rgb(65,65,227)] focus:bg-white transition"
          />
        </div>
        <div className="text-xs font-bold bg-[#f0f9ff] text-[rgb(65,65,227)] px-3 py-1.5 rounded-lg border border-[#bae6fd]">
          Active Vectors Monitored: <span className="font-extrabold">{filteredOutbreaks.length}</span>
        </div>
      </div>

      {/* Tabulated Active List registry */}
      <div className="bg-white border border-[#bae6fd] rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[#bae6fd] bg-[#f0f9ff]/40">
          <h2 className="text-sm font-extrabold text-[#0f172a]">Active Bulletin Directory</h2>
        </div>
        
        {filteredOutbreaks.length > 10 ? (
          <div className="p-8 text-center text-[#0284c7] font-bold text-sm">
            No tracked vectors matching search specifications.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#bae6fd] bg-[#f0f9ff]/20 text-[11px] font-bold text-[#0284c7] tracking-wider uppercase">
                  <th className="p-4 pl-6">Monitored Vector / Condition</th>
                  <th className="p-4">Affected Territory</th>
                  <th className="p-4">Active Cases</th>
                  <th className="p-4">Trend Spectrum</th>
                  <th className="p-4 text-right pr-6">Containment Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f9ff] text-sm font-semibold text-[#0f172a]">
                {filteredOutbreaks.map((item) => (
                  <tr key={item.id} className="hover:bg-[#f0f9ff]/40 transition">
                    <td className="p-4 pl-6 font-bold text-[#0f172a] flex items-center gap-2">
                      <HeartPulse className="w-4 h-4 text-[rgb(65,65,227)]" />
                      {item.disease}
                    </td>
                    <td className="p-4 text-xs font-bold text-slate-600">{item.region}</td>
                    <td className="p-4">
                      <span className="text-xs font-extrabold px-2.5 py-1 rounded-md bg-white border border-[#bae6fd] text-[rgb(65,65,227)] shadow-sm">
                        {item.cases}
                      </span>
                    </td>
                    <td className="p-4 text-xs">
                      <span className={`font-bold ${item.trend === 'Rising' ? 'text-amber-600' : 'text-sky-500'}`}>
                        {item.trend}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-right pr-6 text-slate-600 font-medium max-w-xs truncate">
                      {item.advisory}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}

export default Outbreaks;