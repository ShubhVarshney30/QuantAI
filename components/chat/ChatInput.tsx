// src/components/chat/ChatInput.tsx
"use client";

import { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2, CornerDownLeft } from 'lucide-react';
// import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

interface ChatInputProps {
  onSubmit: (message: string) => Promise<void>;
  isLoading: boolean;
  placeholder?: string; // Added placeholder prop
}

export function ChatInput({ onSubmit, isLoading, placeholder = "Send a message..." }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!message.trim() || isLoading) return;
    const currentMessage = message;
    setMessage(''); 
    if (textareaRef.current) { 
        textareaRef.current.style.height = 'auto';
    }
    await onSubmit(currentMessage);
    textareaRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };
  
  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; 
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`; 
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);


  return (
    <div className="relative">
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-cyan-400/20 rounded-3xl blur-xl animate-pulse"></div>
      
      <form onSubmit={handleSubmit} className="relative flex items-end gap-4 p-5 rounded-3xl bg-gradient-to-br from-white/90 via-cyan-50/30 to-blue-50/20 dark:from-slate-800/90 dark:via-slate-700/30 dark:to-slate-800/20 backdrop-blur-xl border border-cyan-200/40 dark:border-slate-600/40 shadow-2xl transition-all duration-300 hover:shadow-3xl focus-within:shadow-3xl focus-within:border-blue-400/60 dark:focus-within:border-blue-500/60 focus-within:scale-[1.02]">
        {/* Inner glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-100/20 via-purple-100/10 to-cyan-100/20 dark:from-slate-700/20 dark:via-slate-600/10 dark:to-slate-700/20 animate-pulse"></div>
        
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="relative z-10 flex-1 resize-none min-h-[3rem] max-h-[12.5rem] overflow-y-auto rounded-2xl border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm px-5 py-4 pr-28 text-sm font-medium placeholder:text-slate-500 dark:placeholder:text-slate-400 placeholder:font-normal shadow-inner focus-visible:ring-0 focus:ring-transparent focus:outline-none transition-all duration-300 focus:bg-white/70 dark:focus:bg-slate-800/70"
          rows={1}
          disabled={isLoading}
          aria-label="Chat message input"
        />
        
        <div className="absolute right-5 bottom-5 flex flex-col gap-3 z-20">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={isLoading || !message.trim()} 
                  className="h-12 w-12 shrink-0 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-700 shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-0 hover:scale-110 active:scale-95 relative overflow-hidden"
                >
                  {/* Button inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl animate-pulse"></div>
                  
                  {isLoading ? (
                    <Loader2 className="h-6 w-6 animate-spin text-white relative z-10" />
                  ) : (
                    <Send className="h-6 w-6 text-white relative z-10" />
                  )}
                  <span className="sr-only">Send message</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" align="center" className="bg-gradient-to-r from-slate-800 to-slate-700 dark:from-slate-200 dark:to-slate-100 text-white dark:text-slate-800 border-slate-600 dark:border-slate-400 shadow-xl">
                <p className="font-semibold">Send message</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <div className="hidden md:flex items-center justify-center text-xs font-medium text-slate-500 dark:text-slate-400 bg-gradient-to-r from-slate-100/80 to-slate-200/60 dark:from-slate-700/80 dark:to-slate-600/60 px-3 py-2 rounded-xl backdrop-blur-sm border border-slate-200/50 dark:border-slate-600/50 shadow-lg">
            <CornerDownLeft size={12} className="mr-2 text-blue-500" /> 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Enter</span>
          </div>
        </div>
      </form>
    </div>
  );
}
