import React, { useState } from 'react';
import { Database, Search, ShieldCheck, Activity, Package, Building, AlertCircle } from 'lucide-react';

function Resources() {
  // Mock resource logistics inventory
  const [resources] = useState([
    { id: 1, item: "Intensive Care Beds (ICU)", type: "Facility Space", total: "150 Units", available: "42 Vacant", status: "Optimal Allocation", zone: "Zone A Hub" },
    { id: 2, item: "Liquid Medical Oxygen (LMO)", type: "Critical Supply", total: "5,000 Liters", available: "1,250 Liters Left", status: "Refill Requested", zone: "Zone C District" },
    { id: 3, item: "Antiviral Therapeutic Kits", type: "Pharmaceutical", total: "1,200 Packs", available: "840 Available", status: "Optimal Allocation", zone: "Zone B Sector" },
    { id: 4, item: "Mechanical Ventilators", type: "Medical Equipment", total: "85 Units", available: "19 Unused", status: "High Demand", zone: "Zone A Hub" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredResources = resources.filter(res => 
    res.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.zone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 text-[#1e3a8a] animate-fadeIn text-base">
      {/* Header Info - Upgraded Sizing */}
      <div>
        <h1 className="text-3xl font-black text-[#0f172a] flex items-center gap-2.5">
          <Database className="w-7 h-7 text-[rgb(65,65,227)]" /> Public Medical Resource Registry
        </h1>
        <p className="text-base text-[#0369a1] font-semibold mt-1.5">
          Live supply chain coordination log monitoring clinical stockpiles, critical patient care equipment, and municipal space capacities.
        </p>
      </div>

      {/* Metrics Summary Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-[#bae6fd] rounded-2xl p-5 flex items-center gap-4 shadow-sm">
          <div className="p-3.5 rounded-xl border border-[#bae6fd] bg-[#f0f9ff] text-[rgb(65,65,227)] shadow-sm">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-black text-[#0284c7] tracking-wide uppercase">Tracked Facilities</p>
            <p className="text-2xl font-black text-[#0f172a] mt-0.5">14 Active</p>
          </div>
        </div>

        <div className="bg-white border border-[#bae6fd] rounded-2xl p-5 flex items-center gap-4 shadow-sm">
          <div className="p-3.5 rounded-xl border border-[#bae6fd] bg-[#f0f9ff] text-[rgb(65,65,227)] shadow-sm">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-black text-[#0284c7] tracking-wide uppercase">Supply Line Status</p>
            <p className="text-2xl font-black text-[#0f172a] mt-0.5">94.8% Fluid</p>
          </div>
        </div>

        <div className="bg-white border border-[#bae6fd] rounded-2xl p-5 flex items-center gap-4 shadow-sm">
          <div className="p-3.5 rounded-xl border border-[#bae6fd] bg-[#f0f9ff] text-[rgb(65,65,227)] shadow-sm">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-black text-[#0284c7] tracking-wide uppercase">Urgent Procurement requests</p>
            <p className="text-2xl font-black text-[#0f172a] mt-0.5">1 Flagged</p>
          </div>
        </div>
      </div>

      {/* Database Filtering & Search Area */}
      <div className="bg-white border border-[#bae6fd] rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-5 h-5 text-[#0284c7] absolute left-3 top-3.5" />
          <input 
            type="text" 
            placeholder="Search equipment, metrics, or regions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#f0f9ff]/60 border border-[#bae6fd] rounded-xl text-sm font-bold text-[#0f172a] placeholder-[#0284c7] focus:outline-none focus:border-[rgb(65,65,227)] focus:bg-white transition"
          />
        </div>
        <div className="text-sm font-black bg-[#f0f9ff] text-[rgb(65,65,227)] px-4 py-2 rounded-xl border border-[#bae6fd]">
          Registry Rows Loaded: <span className="font-black">{filteredResources.length} Items</span>
        </div>
      </div>

      {/* Inventory Log Data Table */}
      <div className="bg-white border border-[#bae6fd] rounded-2xl overflow-hidden shadow-md">
        <div className="p-5 border-b border-[#bae6fd] bg-[#f0f9ff]/40">
          <h2 className="text-base font-black text-[#0f172a]">Live Resource Allocations</h2>
        </div>
        
        {filteredResources.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#bae6fd] bg-[#f0f9ff]/20 text-xs font-black text-[#0284c7] tracking-wider uppercase">
                  <th className="p-4 pl-6">Resource Allocation asset</th>
                  <th className="p-4">Classification</th>
                  <th className="p-4">Operational Campus Location</th>
                  <th className="p-4">Total Inventory</th>
                  <th className="p-4">Immediate Availability</th>
                  <th className="p-4 text-right pr-6">Logistics Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f9ff] text-base font-bold text-[#0f172a]">
                {filteredResources.map((item) => (
                  <tr key={item.id} className="hover:bg-[#f0f9ff]/40 transition">
                    <td className="p-4 pl-6 flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-[rgb(65,65,227)] shrink-0" />
                      <span className="font-extrabold text-[#0f172a]">{item.item}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-xs bg-[#f0f9ff] border border-[#bae6fd] text-[#0284c7] px-2.5 py-0.5 rounded-md font-bold">
                        {item.type}
                      </span>
                    </td>
                    <td className="p-4 text-sm font-bold text-slate-600">{item.zone}</td>
                    <td className="p-4 text-sm font-mono text-slate-500 font-bold">{item.total}</td>
                    <td className="p-4">
                      <span className="text-sm font-black px-2.5 py-1 rounded-md bg-white border border-[#bae6fd] text-[rgb(65,65,227)] shadow-sm">
                        {item.available}
                      </span>
                    </td>
                    <td className="p-4 text-right pr-6 text-sm">
                      <span className={`inline-flex items-center gap-1 font-bold ${
                        item.status === 'Refill Requested' || item.status === 'High Demand' 
                          ? 'text-amber-600' 
                          : 'text-sky-500'
                      }`}>
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-[#0284c7] font-bold text-base">
            No tracked logistical resources matched your search query.
          </div>
        )}
      </div>
    </div>
  );
}

export default Resources;