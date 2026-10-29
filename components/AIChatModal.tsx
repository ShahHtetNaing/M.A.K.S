
import React, { useState, useEffect, useRef } from 'react';
import { Send, X, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { askTutor, checkAiAvailability } from '../services/groqService';

interface AIChatModalProps {
  context?: string;
}

const AIChatModal: React.FC<AIChatModalProps> = ({ context }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string, sender: 'user' | 'ai' }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [hasKey, setHasKey] = useState<boolean | null>(null);

  useEffect(() => {
    if (isOpen && !hasKey) checkAiAvailability().then(setHasKey);
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !hasKey) return;
    const userMsg = input;
    const history = messages;
    setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askTutor(userMsg, context, history);
      setMessages(prev => [...prev, { text: response, sender: 'ai' }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: 'An error occurred. Please try again later.', sender: 'ai' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition-all transform hover:scale-105 z-50 flex items-center space-x-2"
      >
        <Sparkles size={20} />
        <span className="hidden md:inline font-bold">Ask AI Tutor</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4">
          <div className="p-4 bg-emerald-600 text-white flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Sparkles size={18} />
              <h3 className="font-bold text-sm">M.A.K.S AI Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>

          {hasKey === false && (
            <div className="p-3 bg-amber-50 border-b border-amber-100 flex items-center space-x-2 text-[10px] text-amber-800 font-bold uppercase tracking-tight">
              <AlertTriangle size={14} />
              <span>AI features disabled: No API Key found</span>
            </div>
          )}

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-emerald-50/30">
            {messages.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <p className="font-bold text-emerald-900">Welcome to M.A.K.S!</p>
                <p className="text-xs mt-2 px-6">
                  {hasKey !== false
                    ? "I am your dedicated AI tutor. Ask me about Arabic grammar, Quranic verses, or your learning path."
                    : "The AI Tutor is currently offline because no API Key was provided during setup. You can still use the rest of the site normally."}
                </p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`relative group max-w-[85%] p-4 rounded-2xl text-sm ${
                  m.sender === 'user' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white border border-emerald-100 text-gray-800 shadow-sm'
                }`}>
                  <p className="whitespace-pre-wrap">{m.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-emerald-100 p-3 rounded-2xl">
                  <Loader2 className="animate-spin text-emerald-600" size={18} />
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t bg-white flex space-x-2">
            <input
              value={input}
              disabled={!hasKey}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={hasKey ? "Type your question..." : hasKey === null ? "Connecting to AI Tutor..." : "AI Chat is disabled"}
              className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-50"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !hasKey}
              className="p-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 disabled:opacity-50 transition-all active:scale-90"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatModal;
