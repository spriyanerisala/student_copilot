import React, { useState } from 'react';
import { Bot, Send, X, Sparkles, User } from 'lucide-react';
import { Button, Input } from '@/components/ui';

interface AskAiDrawerProps {
  lessonTitle: string;
}

export const AskAiDrawer: React.FC<AskAiDrawerProps> = ({ lessonTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputPrompt, setInputPrompt] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello! I am your AI Mentor for "${lessonTitle}". Ask me to explain concepts, generate quick code examples, or test you with MCQs!`,
    },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim()) return;

    const userText = inputPrompt;
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInputPrompt('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Here is a breakdown for "${userText}": In ${lessonTitle}, key concepts emphasize data integrity, proper indexing, and avoiding redundant schema designs. Would you like a 3-question MCQ quiz on this?`,
        },
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-2xl shadow-purple-500/40 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all border border-purple-400/30"
      >
        <Bot className="w-5 h-5 text-purple-200 animate-bounce" />
        <span>Ask AI Mentor</span>
      </button>

      {/* Drawer Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

          <div className="w-full max-w-md h-full glass-panel bg-slate-950/95 border-l border-white/10 p-6 flex flex-col justify-between relative z-10 shadow-2xl animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">AI Mentor & Tutor</h3>
                  <p className="text-[10px] text-purple-300 truncate max-w-[200px]">Context: {lessonTitle}</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Chat Viewport */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 text-xs ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.sender === 'ai' && (
                    <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-purple-600 text-white rounded-tr-none'
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                  {m.sender === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="pt-3 border-t border-white/10 flex gap-2">
              <Input
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Ask AI anything about this lesson..."
                className="text-xs"
              />
              <Button type="submit" size="sm" className="px-4">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
