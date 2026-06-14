import React, { useState } from 'react';
import { MessageSquare, LayoutDashboard, Database, ShieldAlert, HeartPulse, Menu, X, PlusCircle, Trash2 } from 'lucide-react';

function Layout({ 
  children, 
  currentPage, 
  setCurrentPage, 
  sessions = [], 
  activeSessionId, 
  setActiveSessionId, 
  onCreateNewChat,
  onDeleteChat
}) {

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const staticNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'outbreaks', label: 'Disease Tracking', icon: ShieldAlert },
    { id: 'resources', label: 'Resource Registry', icon: Database },
    { id: 'wellness', label: 'Personal Wellness', icon: HeartPulse },
  ];

  return (
    // Global container text size upgraded to text-lg (Large)
    <div className="flex h-screen w-screen bg-[#e0f2fe] text-[#1e3a8a] overflow-hidden font-sans text-lg">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#1e3a8a]/20 z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Panel - Width increased to w-72 for text clearance */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-[#bae6fd] flex flex-col justify-between transform transition-transform duration-300 ease-in-out shrink-0 shadow-md
        lg:relative lg:transform-none lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-[calc(100vh-5rem)] overflow-hidden">
          
          {/* Sidebar Header */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-[#f0f9ff] shrink-0">
            <div className="flex items-center gap-2.5">
              <HeartPulse className="w-7 h-7 text-[rgb(65,65,227)]" />
              <span className="font-black text-xl tracking-wide text-[#1e3a8a]">
                CarePulse AI
              </span>
            </div>
            <button className="lg:hidden text-[#0284c7] hover:text-[#0369a1] p-1.5" onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Core System App Dashboards - Upgraded to text-base + font-bold */}
          <div className="p-4 pb-2 space-y-2.5 shrink-0">
            {staticNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold text-base transition-all duration-200 cursor-pointer
                    ${isActive 
                      ? 'bg-[rgb(65,65,227)] text-white shadow-md scale-[1.01]' 
                      : 'text-[#0284c7] hover:bg-[#f0f9ff] hover:text-[rgb(65,65,227)] border border-transparent'}
                  `}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-[#38bdf8]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <hr className="border-[#f0f9ff] mx-4 my-3" />

          {/* Gemini-Style Chat History Console */}
          <div className="flex-1 flex flex-col min-h-0 px-4 pb-2">
            
            {/* New Thread Button - Upgraded to text-sm + font-extrabold */}
            <button
              onClick={() => {
                onCreateNewChat();
                setSidebarOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-4 rounded-xl border-2 border-dashed border-[#bae6fd] bg-[#f0f9ff]/50 hover:bg-[#f0f9ff] text-[rgb(65,65,227)] font-extrabold text-sm transition duration-150 cursor-pointer mb-4 shrink-0 group shadow-sm"
            >
              <PlusCircle className="w-4 h-4 group-hover:scale-110 transition" />
              New Conversation Thread
            </button>

            {/* Scrollable Conversation Stream Titles */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              <p className="text-xs font-black uppercase tracking-wider text-[#38bdf8] px-3 mb-2">Recent Chats</p>
              
              {sessions.map((session) => {
                const isSelected = currentPage === 'chat' && activeSessionId === session.id;
                return (
                  <div 
                    key={session.id}
                    className="group/item relative w-full flex items-center justify-between"
                  >
                    {/* Chat Item List Button - Upgraded to text-sm + font-bold */}
                    <button
                      onClick={() => {
                        setActiveSessionId(session.id);
                        setCurrentPage('chat');
                        setSidebarOpen(false);
                      }}
                      className={`
                        w-full flex items-center gap-3 px-3.5 py-3 pr-9 rounded-xl text-left text-sm font-bold transition truncate cursor-pointer border
                        ${isSelected 
                          ? 'bg-[#f0f9ff] text-[rgb(65,65,227)] border-[#bae6fd] shadow-sm' 
                          : 'text-[#0369a1] bg-transparent border-transparent hover:bg-slate-50 hover:text-[#0f172a]'}
                      `}
                    >
                      <MessageSquare className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[rgb(65,65,227)]' : 'text-[#38bdf8]'}`} />
                      <span className="truncate">{session.title}</span>
                    </button>

                    {/* Delete icon - enlarged for easier targeting */}
                    <button
                      onClick={(e) => onDeleteChat(session.id, e)}
                      className="absolute right-2 p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 cursor-pointer transition lg:opacity-0 lg:group-hover/item:opacity-100"
                      title="Delete Thread"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Sidebar User Footer - Interactive Trigger for Login Details */}
        <div className="p-4 border-t border-[#bae6fd] bg-[#f0f9ff]/50 h-20 shrink-0 flex items-center">
          <button 
            onClick={() => setIsLoginOpen(true)}
            className="flex items-center gap-3 px-2 w-full text-left rounded-xl p-1.5 hover:bg-[#bae6fd]/30 transition duration-150 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[rgb(65,65,227)] text-white flex items-center justify-center font-black text-base shadow-sm shrink-0">
              U
            </div>
            <div className="overflow-hidden w-full">
              <p className="text-sm font-black text-[#1e3a8a] truncate">Public Session</p>
              <p className="text-xs text-[#0284c7] font-bold truncate">Frontend Active</p>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content Workspace Layout */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-[#bae6fd] flex items-center px-6 justify-between lg:justify-end shrink-0">
          <button 
            className="lg:hidden p-2 -ml-2 text-[#0284c7] hover:text-[#0369a1] rounded-lg"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          
          {/* Header Badge text size increased */}
          <div className="text-sm font-mono text-[#1e3a8a] border border-[#bae6fd] rounded-full px-4 py-1.5 bg-[#f0f9ff] font-extrabold">
            API Status: <span className="text-[rgb(65,65,227)] font-black">Awaiting Connection</span>
          </div>
        </header>

        {/* View Surface Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>

      </div>

      {/* Login Modal Overlay */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-[#1e3a8a]/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white border-2 border-[#bae6fd] rounded-2xl shadow-2xl max-w-md w-full p-6">
            
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#f0f9ff] text-[rgb(65,65,227)] flex items-center justify-center text-2xl mx-auto mb-2 font-black border border-[#bae6fd]">
                🔐
              </div>
              <h3 className="text-2xl font-black text-[#1e3a8a]">Secure Portal Access</h3>
              <p className="text-sm text-[#0284c7] font-bold mt-1">Enter your clinical practitioner credentials</p>
            </div>

            {/* Form Fields */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="block text-[#0369a1] text-sm font-black mb-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="sneha.p@carepulse.ai" 
                  className="w-full p-3 text-base rounded-xl border border-[#bae6fd] bg-[#f0f9ff]/30 focus:outline-none focus:border-[rgb(65,65,227)] font-mono"
                />
              </div>

              <div>
                <label className="block text-[#0369a1] text-sm font-black mb-1">Security Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full p-3 text-base rounded-xl border border-[#bae6fd] bg-[#f0f9ff]/30 focus:outline-none focus:border-[rgb(65,65,227)] font-mono"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsLoginOpen(false)}
                  className="flex-1 p-3 bg-[#f0f9ff] text-[#1e3a8a] font-extrabold rounded-xl border border-[#bae6fd] hover:bg-[#bae6fd]/30 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 p-3 bg-[rgb(65,65,227)] text-white font-extrabold rounded-xl hover:bg-[rgb(50,50,200)] shadow-md transition-colors cursor-pointer"
                >
                  Verify Portal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Layout;