import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, AlertCircle, Mic, MicOff, Loader } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function Chat({ messages, setMessages }) {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [micError, setMicError] = useState("");
  const bottomRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Setup Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => {
        setIsListening(true);
        setMicError("");
      };

      rec.onend = () => setIsListening(false);

      rec.onerror = (event) => {
        setIsListening(false);
        if (event.error === "not-allowed") {
          setMicError("Microphone access denied. Please allow mic access in your browser settings.");
        } else if (event.error === "no-speech") {
          setMicError("No speech detected. Please try again.");
        } else {
          setMicError(`Mic error: ${event.error}`);
        }
      };

      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => (prev ? prev + " " + transcript : transcript));
        setMicError("");
      };

      setRecognition(rec);
    }
  }, []);

  const toggleListening = async () => {
    if (!recognition) {
      setMicError("Voice input is not supported in this browser. Try Chrome or Edge.");
      return;
    }

    // Request mic permission explicitly first
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setMicError("Microphone access denied. Please allow mic access in your browser settings.");
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      setMicError("");
      recognition.start();
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput })
      });
      const data = await response.json();
      setMessages((prev) => [...prev, {
        id: prev.length + 1,
        sender: 'bot',
        text: data.response || "Sorry, I couldn't get a response.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch {
      setMessages((prev) => [...prev, {
        id: prev.length + 1,
        sender: 'bot',
        text: "Unable to reach the server. Please try again later.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col justify-between text-[#1e3a8a]">

      {/* Disclaimer */}
      <div className="bg-white border border-[#bae6fd] rounded-2xl p-4 flex items-start gap-3 shadow-sm mb-4">
        <AlertCircle className="w-5 h-5 text-[rgb(65,65,227)] shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-[#0f172a]">Automated Educational Screening Only</h4>
          <p className="text-[11px] text-[#0369a1] font-medium mt-0.5">
            This AI assistant provides automated insights based on public health documentation. For acute medical complications or severe emergencies, always contact local emergency services immediately.
          </p>
        </div>
      </div>

      {/* Mic error banner */}
      {micError && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2 mb-3 text-xs text-red-600 font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {micError}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 bg-white border border-[#bae6fd] rounded-2xl p-6 overflow-y-auto space-y-4 shadow-sm custom-scrollbar">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#f0f9ff] border border-[#bae6fd] flex items-center justify-center">
              <Bot className="w-7 h-7 text-[rgb(65,65,227)]" />
            </div>
            <p className="text-sm font-bold text-[#0f172a]">Hello! I'm your Health Assistant</p>
            <p className="text-xs text-[#0284c7]">Describe your symptoms or ask a health question to get started.</p>
          </div>
        )}

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

        {isLoading && (
          <div className="flex gap-3 max-w-3xl mr-auto">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border bg-[#f0f9ff] border-[#bae6fd] text-[rgb(65,65,227)]">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-[#f0f9ff]/70 border border-[#f0f9ff] rounded-tl-none flex items-center gap-2">
              <Loader className="w-4 h-4 animate-spin text-[rgb(65,65,227)]" />
              <span className="text-sm text-[#0284c7] font-semibold">Thinking...</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isListening ? "Listening... speak now 🎙️" : "Describe symptoms or ask a question..."}
            className={`w-full bg-white border rounded-xl pl-4 pr-24 py-3.5 text-sm font-bold text-[#0f172a] placeholder-[#0284c7] shadow-sm focus:outline-none transition ${
              isListening ? 'border-red-400 ring-2 ring-red-100 bg-red-50/20' : 'border-[#bae6fd] focus:border-[rgb(65,65,227)]'
            }`}
          />
          <div className="absolute right-3 top-2 flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggleListening}
              disabled={isLoading}
              className={`p-2 rounded-lg transition-all border duration-150 cursor-pointer ${
                isListening
                  ? 'bg-red-500 text-white border-transparent animate-pulse'
                  : 'bg-[#f0f9ff] text-[rgb(65,65,227)] border-[#bae6fd] hover:bg-[#e0f2fe]'
              }`}
              title={isListening ? "Stop listening" : "Click to speak"}
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
          disabled={isLoading || !input.trim()}
          className="bg-[rgb(65,65,227)] hover:bg-[rgb(50,50,200)] text-white px-5 rounded-xl transition shadow-md flex items-center justify-center cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading
            ? <Loader className="w-4 h-4 animate-spin" />
            : <Send className="w-4 h-4 group-hover:translate-x-0.5 transition duration-150" />
          }
        </button>
      </form>

    </div>
  );
}

export default Chat;
