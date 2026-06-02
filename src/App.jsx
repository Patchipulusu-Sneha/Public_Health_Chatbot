import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Wellness from './pages/Wellness';
import Chat from './pages/Chat';
import Outbreaks from './pages/Outbreaks';
import Resources from './pages/Resources'; // 1. Import our new logistics page file

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [activeSessionId, setActiveSessionId] = useState(1);
  const [sessions, setSessions] = useState([
    {
      id: 1,
      title: 'Initial Health Consultation',
      messages: [
        {
          id: 1,
          sender: 'bot',
          text: "Hello! I am your AI Health Assistant. How can I help you today?",
          time: "Live"
        }
      ]
    }
  ]);

  const handleCreateNewChat = () => {
    const newId = Date.now();
    const newSession = {
      id: newId,
      title: `Health Query ${sessions.length + 1}`,
      messages: [
        {
          id: 1,
          sender: 'bot',
          text: "Started a brand new conversation channel. Describe your health query or symptoms...",
          time: "Live"
        }
      ]
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newId);
    setCurrentPage('chat');
  };

  const handleDeleteChat = (sessionIdToDelete, e) => {
    e.stopPropagation();
    if (sessions.length === 1) {
      alert("You must keep at least one conversation history open.");
      return;
    }
    const remainingSessions = sessions.filter(s => s.id !== sessionIdToDelete);
    setSessions(remainingSessions);
    if (activeSessionId === sessionIdToDelete) {
      setActiveSessionId(remainingSessions[0].id);
      setCurrentPage('chat');
    }
  };

  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];

  const updateActiveMessages = (updaterFunc) => {
    setSessions(prevSessions => prevSessions.map(session => {
      if (session.id === activeSession.id) {
        const updatedMessages = typeof updaterFunc === 'function' ? updaterFunc(session.messages) : updaterFunc;
        
        let updatedTitle = session.title;
        if (session.title.startsWith('Health Query') && updatedMessages.length > 1) {
          const firstUserMsg = updatedMessages.find(m => m.sender === 'user');
          if (firstUserMsg) {
            updatedTitle = firstUserMsg.text.slice(0, 24) + (firstUserMsg.text.length > 24 ? '...' : '');
          }
        }

        return { ...session, title: updatedTitle, messages: updatedMessages };
      }
      return session;
    }));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard setCurrentPage={setCurrentPage} />;
      case 'chat':
        return <Chat messages={activeSession.messages} setMessages={updateActiveMessages} />;
      case 'outbreaks':
        return <Outbreaks />;
      case 'resources':
        return <Resources />; // 2. Mount live inventory tracking registry here
      case 'wellness':
        return <Wellness />;
      default:
        return <div className="text-slate-800">Page not found</div>;
    }
  };

  return (
    <Layout 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage}
      sessions={sessions}
      activeSessionId={activeSessionId}
      setActiveSessionId={setActiveSessionId}
      onCreateNewChat={handleCreateNewChat}
      onDeleteChat={handleDeleteChat}
    >
      {renderPage()}
    </Layout>
  );
}

export default App;