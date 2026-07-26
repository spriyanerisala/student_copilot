import React, { useState } from 'react';
import { Bot, User, Copy, Check } from 'lucide-react';
import type { ChatMessage } from '@/services/aiService';

interface AiChatMessageProps {
  message: ChatMessage;
}

export const AiChatMessage: React.FC<AiChatMessageProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const isAi = message.sender === 'ai';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-3 text-xs sm:text-sm ${isAi ? 'justify-start' : 'justify-end'}`}>
      {isAi && (
        <div className="w-8 h-8 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-300 flex items-center justify-center shrink-0 mt-1">
          <Bot className="w-4 h-4" />
        </div>
      )}

      <div
        className={`p-4 rounded-2xl max-w-[85%] sm:max-w-[75%] space-y-2 relative group shadow-lg leading-relaxed ${
          isAi
            ? 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none'
            : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-none font-medium'
        }`}
      >
        {isAi && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-800/80 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-white transition-all"
            title="Copy message"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        )}

        <div className="whitespace-pre-wrap font-sans text-xs sm:text-sm">{message.text}</div>
        <span className="block text-[10px] text-slate-400 text-right opacity-60 font-mono">{message.timestamp}</span>
      </div>

      {!isAi && (
        <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-md">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};
