import React from 'react';
import { ShieldAlert, Activity, Users, Radio, ArrowRight, HeartPulse } from 'lucide-react';

function Dashboard({ setCurrentPage }) {
  const stats = [
    { label: 'Active Regional Outbreaks', value: '2 Tracked', icon: ShieldAlert },
    { label: 'System Health Index', value: '98.4%', icon: Activity },
    { label: 'Available Medical Facilities', value: '24 Operational', icon: Users },
  ];

  const alerts = [
    { id: 1, title: 'Seasonal Influenza Surge', region: 'Zone A & C', severity: 'Level 2 Monitor', time: '2 hours ago' },
    { id: 2, title: 'Dengue Advisory: High Vector Activity', region: 'Southern District', severity: 'Level 3 Alert', time: '1 day ago' },
  ];

  return (
    <div className="space-y-8 text-[#1e3a8a]">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-[#bae6fd] p-6 lg:p-8 shadow-sm">
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <HeartPulse className="w-40 h-40 text-[rgb(65,65,227)]" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[rgb(65,65,227)] px-2.5 py-1 rounded-full bg-[#f0f9ff] border border-[#bae6fd]">
            CarePulse Live System
          </span>
          <h1 className="text-3xl font-extrabold text-[#0f172a] mt-3 tracking-tight">Public Health Monitoring Panel</h1>
          <p className="text-[#0369a1] mt-2 text-sm font-medium leading-relaxed">
            Welcome to your unified epidemiological monitoring center. Access integrated health analytics, interact with clinical conversational AI, or review emergency public welfare assets.
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white border border-[#bae6fd] rounded-xl p-5 flex items-center gap-4 shadow-sm">
              <div className="p-3 rounded-xl border border-[#bae6fd] bg-[#f0f9ff] text-[rgb(65,65,227)] shadow-sm">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0284c7] tracking-wide uppercase">{stat.label}</p>
                <p className="text-xl font-extrabold text-[#0f172a] mt-1">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Insights Layout Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Outbreak Bulletins */}
        <div className="lg:col-span-2 bg-white border border-[#bae6fd] rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Radio className="w-5 h-5 text-[rgb(65,65,227)] animate-pulse" />
              <h2 className="text-lg font-bold text-[#0f172a]">Active Public Health Alerts</h2>
            </div>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-4 rounded-xl bg-[#f0f9ff]/60 border border-[#bae6fd] hover:bg-[#f0f9ff] transition duration-150 flex justify-between items-center shadow-sm">
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-[#0f172a]">{alert.title}</h3>
                    <p className="text-xs text-[#0369a1] font-medium">Affected Regions: <span className="text-[#1e3a8a] font-semibold">{alert.region}</span></p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] px-2.5 py-1 rounded-full border border-[#bae6fd] bg-white text-[rgb(65,65,227)] font-bold uppercase tracking-wider shadow-sm">
                      {alert.severity}
                    </span>
                    <p className="text-[10px] text-[#0284c7] font-medium mt-1.5">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button 
            onClick={() => setCurrentPage('outbreaks')}
            className="w-full mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#bae6fd] bg-[#f0f9ff]/30 text-sm font-bold text-[#0284c7] hover:bg-[#f0f9ff] hover:text-[rgb(65,65,227)] transition duration-150 cursor-pointer shadow-sm"
          >
            Review Outbreak Map Data <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Launch Panel */}
        <div className="bg-white border border-[#bae6fd] rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#0f172a] mb-1">Quick Actions</h2>
            <p className="text-xs text-[#0284c7] font-medium mb-4">Jump straight into core interactive modules</p>
            
            <div className="space-y-2.5">
              <button 
                onClick={() => setCurrentPage('chat')}
                className="w-full text-left p-3.5 rounded-xl bg-[rgb(65,65,227)] hover:bg-[rgb(50,50,200)] text-white shadow-md transition duration-150 cursor-pointer"
              >
                <h4 className="text-sm font-bold text-white">Consult AI Chatbot</h4>
                <p className="text-[11px] text-[#e0f2fe] mt-0.5 font-medium">Symptom screening and public health inquiry desk.</p>
              </button>

              <button 
                onClick={() => setCurrentPage('resources')}
                className="w-full text-left p-3.5 rounded-xl bg-[#f0f9ff]/60 hover:bg-[#f0f9ff] border border-[#bae6fd] shadow-sm transition duration-150 cursor-pointer text-[#0284c7] hover:text-[rgb(65,65,227)]"
              >
                <h4 className="text-sm font-bold text-[#1e3a8a]">Check Resource Stocks</h4>
                <p className="text-[11px] text-[#0369a1] mt-0.5 font-medium">Locate operational medical items, supplies, and spaces.</p>
              </button>
            </div>
          </div>

          <div className="mt-6 border-t border-[#f0f9ff] pt-4 text-center">
            <span className="text-[11px] font-mono font-bold text-[#38bdf8]">CarePulse Engine v1.0.0</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;