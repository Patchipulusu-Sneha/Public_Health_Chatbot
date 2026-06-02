import React, { useState, useEffect } from 'react';
import { Send, Bot, User, Sparkles, AlertCircle, Mic, MicOff } from 'lucide-react';

// Destructure messages and setMessages from props instead of local state
function Chat({ messages, setMessages }) {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => setIsListening(true);
      rec.onend = () => setIsListening(false);
      
      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => (prev ? prev + " " + transcript : transcript));
      };

      setRecognition(rec);
    }
  }, []);

  const toggleListening = () => {
    if (!recognition) {
      alert("Voice transcription is not supported by your current browser profile.");
      return;
    }
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [...prev, {
        id: prev.length + 1,
        sender: 'bot',
        text: "I have received your inquiry. Once my Python backend server is active and the Gemini API pipeline is established by your team, I will evaluate this query against verified medical models instantly.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col justify-between text-[#1e3a8a]">
      
      <div className="bg-white border border-[#bae6fd] rounded-2xl p-4 flex items-start gap-3 shadow-sm mb-4">
        <AlertCircle className="w-5 h-5 text-[rgb(65,65,227)] shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-[#0f172a]">Automated Educational Screening Only</h4>
          <p className="text-[11px] text-[#0369a1] font-medium mt-0.5">
            This AI assistant provides automated insights based on public health documentation. For acute medical complications or severe emergencies, always contact local emergency services immediately.
          </p>
        </div>
      </div>

      <div className="flex-1 bg-white border border-[#bae6fd] rounded-2xl p-6 overflow-y-auto space-y-4 shadow-sm custom-scrollbar">
        {messages.map((msg) => {
          const isBot = msg.sender === 'bot';
          return (
            <div key={msg.id} className={`flex gap-3 max-w-3xl ${isBot ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}>
              
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                isBot 
                  ? 'bg-[#f0f9ff] border-[#bae6fd] text-[rgb(65,65,227)]' 
                  : 'bg-[rgb(65,65,227)] border-transparent text-white'
              }`}>
                {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div>
                <div className={`p-4 rounded-2xl text-sm font-semibold leading-relaxed shadow-sm ${
                  isBot 
                    ? 'bg-[#f0f9ff]/70 text-[#0f172a] border border-[#f0f9ff] rounded-tl-none' 
                    : 'bg-[rgb(65,65,227)] text-white rounded-tr-none'
                }`}>
                  {msg.text}
                </div>
                <p className={`text-[10px] font-bold mt-1 text-[#0284c7] ${!isBot && 'text-right'}`}>
                  {msg.time}
                </p>
              </div>

            </div>
          );
        })}
      </div>

      <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
        <div className="relative flex-1">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isListening ? "Listening closely... Speak clearly into your mic." : "Describe symptoms or ask a question..."}
            className={`w-full bg-white border rounded-xl pl-4 pr-24 py-3.5 text-sm font-bold text-[#0f172a] placeholder-[#0284c7] shadow-sm focus:outline-none transition ${
              isListening ? 'border-red-400 ring-2 ring-red-100 bg-red-50/20' : 'border-[#bae6fd] focus:border-[rgb(65,65,227)]'
            }`}
            disabled={isListening}
          />
          
          <div className="absolute right-3 top-2 flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2 rounded-lg transition-all border duration-150 cursor-pointer ${
                isListening 
                  ? 'bg-red-500 text-white border-transparent animate-bounce' 
                  : 'bg-[#f0f9ff] text-[rgb(65,65,227)] border-[#bae6fd] hover:bg-[#e0f2fe]'
              }`}
              title={isListening ? "Stop Listening" : "Dictate Symptoms via Mic"}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
            <div className="text-[rgb(65,65,227)]/40 p-1">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </div>
        
        <button 
          type="submit"
          disabled={isListening}
          className="bg-[rgb(65,65,227)] hover:bg-[rgb(50,50,200)] text-white px-5 rounded-xl transition shadow-md flex items-center justify-center cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4 group-hover:translate-x-0.5 transition duration-150" />
        </button>
      </form>

    </div>
  );
}

export default Chat;