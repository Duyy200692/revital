
import React, { useState, useRef, useEffect } from 'react';
import { getCoffeeRecommendation } from '../services/gemini';
import { ChatMessage, MessageRole } from '../types';

const CoffeeAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: MessageRole.MODEL, text: "Xin chào! Tôi là Revital Sommelier. Bạn đang muốn tìm một loại thức uống như thế nào?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: MessageRole.USER, text: userMsg }]);
    setLoading(true);

    const response = await getCoffeeRecommendation(userMsg);
    setMessages(prev => [...prev, { role: MessageRole.MODEL, text: response }]);
    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-white rounded-full shadow-2xl z-50 flex items-center justify-center hover:scale-110 transition-transform group"
      >
        <div className="absolute -top-12 right-0 bg-dark text-white text-[10px] font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Trợ lý Sommelier AI
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-28 right-8 w-[350px] max-w-[calc(100vw-2rem)] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-10 pointer-events-none'}`}>
        {/* Header */}
        <div className="p-6 bg-primary text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">☕</div>
              <div>
                <h4 className="font-black leading-tight">Revital Sommelier</h4>
                <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold">AI Assistant</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[400px] custom-scrollbar bg-gray-50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === MessageRole.USER ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                m.role === MessageRole.USER 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-white text-dark shadow-sm rounded-tl-none border border-gray-100'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 flex gap-1">
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Tôi thích vị cà phê béo..."
              className="flex-1 bg-accent border-none rounded-full px-5 py-3 text-sm focus:ring-2 focus:ring-primary outline-none"
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="w-11 h-11 bg-primary text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <p className="text-[10px] text-gray-400 text-center mt-3 uppercase tracking-tighter">Powered by Revital AI Core</p>
        </div>
      </div>
    </>
  );
};

export default CoffeeAI;
