// src/components/chat/ChatMessage.tsx
"use client";

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './MarkdownRenderer';
import type { ReactNode } from 'react';
// import { useState } from 'react';

export interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  isError?: boolean;
}

interface ChatMessageProps {
  message: Message;
  userIcon?: ReactNode;
  aiIcon?: ReactNode;
}

export function ChatMessage({ message, userIcon, aiIcon }: ChatMessageProps) {
  const isUser = message.type === 'user';
  // const [usenode,setusenode]= useState(false);

  return (
    <div className={cn('flex items-start gap-4 w-full group', isUser ? 'justify-end pl-8 sm:pl-16' : 'justify-start pr-8 sm:pr-16')}>
      {!isUser && (
        <div className="relative">
          <Avatar className="h-10 w-10 border-2 border-white/50 dark:border-slate-600/50 shadow-lg shrink-0 bg-gradient-to-r from-blue-500 to-indigo-600">
            {aiIcon}
            {!aiIcon && <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold">{message.type.toUpperCase().charAt(0)}</AvatarFallback>}
          </Avatar>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white dark:border-slate-800 rounded-full"></div>
        </div>
      )}
      <div
        className={cn(
          'max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-4 text-sm leading-relaxed shadow-xl backdrop-blur-sm transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02] relative overflow-hidden ',
          isUser 
            ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 text-white shadow-blue-500/30 border border-blue-400/20' 
            : 'bg-gradient-to-br from-white/90 via-cyan-50/50 to-blue-50/30 dark:from-slate-800/90 dark:via-slate-700/50 dark:to-slate-800/30 text-slate-800 dark:text-slate-100 border border-cyan-200/30 dark:border-slate-600/30 shadow-cyan-200/20 dark:shadow-slate-900/50',
          message.isError ? 'bg-gradient-to-br from-red-500 via-pink-500 to-red-600 text-white shadow-red-500/30 border border-red-400/20' : ''
        )}
      >
        {/* Animated background for user messages */}
        {isUser && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-indigo-400/20 animate-pulse rounded-2xl"></div>
        )}
        {/* Animated background for AI messages */}
        {!isUser && !message.isError && (
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-100/30 via-blue-100/20 to-indigo-100/30 dark:from-slate-700/30 dark:via-slate-600/20 dark:to-slate-700/30 animate-pulse rounded-2xl"></div>
        )}
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <CodeBlock language={match[1]} value={String(children).replace(/\n$/, '')} {...props} />
              ) : (
                <code className={cn(className, "bg-muted/70 text-muted-foreground px-[0.4rem] py-[0.2rem] rounded-sm text-xs font-mono")} {...props}>
                  {children}
                </code>
              );
            },
            p: ({ ...props}) => <p className="mb-2 last:mb-0" {...props} />,
            ul: ({ ...props}) => <ul className="list-disc list-inside my-2 pl-2 space-y-1" {...props} />,
            ol: ({ ...props}) => <ol className="list-decimal list-inside my-2 pl-2 space-y-1" {...props} />,
            blockquote: ({ ...props}) => <blockquote className="border-l-4 border-border pl-4 italic my-2 text-muted-foreground" {...props} />,
            h1: ({ ...props}) => <h1 className="text-2xl font-bold my-3" {...props} />,
            h2: ({ ...props}) => <h2 className="text-xl font-semibold my-3" {...props} />,
            h3: ({ ...props}) => <h3 className="text-lg font-semibold my-2" {...props} />,
            strong: ({ ...props}) => <strong className="font-semibold" {...props} />,
            em: ({ ...props}) => <em className="italic" {...props} />,
            a: ({ ...props}) => <a className="text-accent-foreground hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
          }}
          className="break-words"
        >
          
          {message.content}
        </ReactMarkdown>
      </div>
      {isUser && (
        <div className="relative">
          <Avatar className="h-10 w-10 border-2 border-white/50 dark:border-slate-600/50 shadow-lg shrink-0 bg-gradient-to-r from-slate-600 to-slate-700 dark:from-slate-400 dark:to-slate-500">
            {userIcon}
            {!userIcon && <AvatarFallback className="bg-gradient-to-r from-slate-600 to-slate-700 dark:from-slate-400 dark:to-slate-500 text-white font-semibold">{message.type.toUpperCase().charAt(0)}</AvatarFallback>}
          </Avatar>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-400 border-2 border-white dark:border-slate-800 rounded-full"></div>
        </div>
      )}
      
    </div>
  );
}
