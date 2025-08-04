
// src/app/(app)/page.tsx - Main Chat Page
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
// UserProfileForm is removed
import { ChatInput } from '@/components/chat/ChatInput';
import { ChatMessage, Message } from '@/components/chat/ChatMessage';
import { personalizedOnboarding, PersonalizedOnboardingOutput } from '@/ai/flows/onboarding-flow'; // Input type not needed here
import { maintainConversationContext, MaintainConversationContextOutput } from '@/ai/flows/context-management-flow';
import useLocalStorage from '@/hooks/use-local-storage';
import { LOCAL_STORAGE_KEYS } from '@/lib/constants';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DollarSign, UserCircle, Loader2 } from 'lucide-react'; // Changed Brain to DollarSign for AI icon
import { useToast } from '@/hooks/use-toast';
// Button import might not be needed directly unless for other UI elements

// UserProfile interface might be redefined or removed if not directly used for form
// export interface UserProfile extends PersonalizedOnboardingInput {
//   onboardingSummary?: string;
// }

export default function ChatPage() {
  // Removed isOnboardingComplete and userProfile related to form onboarding
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationHistory, setConversationHistory] = useLocalStorage<string>(
    LOCAL_STORAGE_KEYS.CONVERSATION_HISTORY,
    ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsComponentMounted(true);
  }, []);

  const scrollToBottom = useCallback(() => {
    if (scrollAreaRef.current) {
      // A slight delay can help ensure the DOM has updated, especially with new messages.
      setTimeout(() => {
        scrollAreaRef.current?.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
      }, 100);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);
  
  // Effect for initial AI greeting or loading existing chat
  useEffect(() => {
    if (isComponentMounted) {
      if (!conversationHistory) { // New user, AI starts the conversation
        setIsLoading(true);
        personalizedOnboarding()
          .then((result: PersonalizedOnboardingOutput) => {
            const aiGreeting: Message = { type: 'ai', content: result.initialAiMessage, id: Date.now().toString() };
            setMessages([aiGreeting]);
            setConversationHistory(`AI: ${result.initialAiMessage}`);
            toast({ title: "Welcome!", description: "Your financial  QuantAI is ready to assist." });
          })
          .catch(error => {
            console.error("Initial greeting error:", error);
            const errorMessage: Message = { type: 'ai', content: "I seem to be having trouble starting our conversation. Please refresh.", id: Date.now().toString(), isError: true };
            setMessages([errorMessage]);
            toast({ title: "Initialization Error", description: "Could not start the conversation. Please try refreshing.", variant: "destructive" });
          })
          .finally(() => setIsLoading(false));
      } else if (messages.length === 0) { // Existing history, reconstruct messages
        const historyLines = conversationHistory.split('\n');
        const reconstructedMessages: Message[] = [];
        let currentSpeaker: 'ai' | 'user' | null = null;
        let currentContent: string[] = [];

        historyLines.forEach((line, index) => {
            const lineId = `hist-${index}`;
            if (line.startsWith('User: ')) {
                if (currentSpeaker && currentContent.length > 0) {
                    reconstructedMessages.push({type: currentSpeaker, content: currentContent.join('\n'), id: `${lineId}-prev`});
                }
                currentSpeaker = 'user';
                currentContent = [line.substring(6)];
            } else if (line.startsWith('AI: ')) {
                 if (currentSpeaker && currentContent.length > 0) {
                    reconstructedMessages.push({type: currentSpeaker, content: currentContent.join('\n'), id: `${lineId}-prev`});
                }
                currentSpeaker = 'ai';
                currentContent = [line.substring(4)];
            } else if (currentSpeaker) { // Handles multi-line messages
                currentContent.push(line);
            }
        });
         if (currentSpeaker && currentContent.length > 0) { // Push the last gathered message
            reconstructedMessages.push({type: currentSpeaker, content: currentContent.join('\n'), id: `hist-last`});
        }
        if (reconstructedMessages.length > 0) {
            setMessages(reconstructedMessages);
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComponentMounted, conversationHistory]); // Removed setMessages, setConversationHistory, toast from deps

  // handleOnboardingSubmit is removed as onboarding is now conversational

  const handleSendMessage = async (userInput: string) => {
    if (!userInput.trim()) return;

    const newUserMessage: Message = { type: 'user', content: userInput, id: Date.now().toString() };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsLoading(true);
    
    // Optimistically update conversation history for the context management flow
    const tempHistory = conversationHistory + `\nUser: ${userInput}`;

    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      const result: MaintainConversationContextOutput = await maintainConversationContext({
        userInput,
        conversationHistory: tempHistory, // Use optimistically updated history
      });
      const aiResponse: Message = { type: 'ai', content: result.aiResponse, id: (Date.now() + 1).toString() };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
      setConversationHistory(result.updatedConversationHistory); // Set the full updated history from the flow
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessageContent = "I apologize, but I encountered a slight difficulty in processing that. Could you perhaps rephrase or try again shortly?";
      const errorMessage: Message = { type: 'ai', content: errorMessageContent, id: (Date.now() + 1).toString(), isError: true };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      toast({ title: "A Moment's Pause", description: "There was a slight hiccup. Please try your query again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isComponentMounted) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // The UserProfileForm is no longer rendered here. Chat interface is always primary.
  return (
    <div className="flex flex-col h-full max-h-screen bg-gradient-to-br from-violet-50 via-cyan-50/40 to-emerald-50/30 dark:from-slate-900 dark:via-purple-900/20 dark:to-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/30 dark:border-slate-700/50 backdrop-blur-sm pb-5">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between p-4 sm:p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-b border-white/30 dark:border-slate-700/40">
        <div className="flex items-center gap-4">
          <div className="relative p-3 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 shadow-xl">
            <DollarSign className="w-7 h-7 text-white" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-50 blur animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
              QuantAI Assistant
            </h1>
            <p className="text-sm font-medium bg-gradient-to-r from-slate-600 to-slate-500 dark:from-slate-300 dark:to-slate-400 bg-clip-text text-transparent">Your Financial Intelligence Partner</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 border border-emerald-200/50 dark:border-emerald-700/50">
            <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full animate-pulse shadow-lg"></div>
            <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Online</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 p-0.5">
            <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center">
              <span className="text-sm font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">AI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages with Custom Scrollbar */}
      <div className="h-96 overflow-y-auto p-6 space-y-4">
        <ScrollArea className="h-full p-4 sm:p-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gradient-to-r scrollbar-thumb-from-blue-400 scrollbar-thumb-to-purple-400 hover:scrollbar-thumb-from-blue-500 hover:scrollbar-thumb-to-purple-500" ref={scrollAreaRef}>
          
          <div className="space-y-8 pb-6">
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                className={`transform transition-all duration-700 ease-out ${
                  index === messages.length - 1 ? 'animate-in slide-in-from-bottom-6 fade-in-0' : ''
                }`}
              >
                <ChatMessage
                  message={msg}
                  userIcon={<UserCircle className="w-full h-full text-white" />}
                  aiIcon={<DollarSign className="w-full h-full text-white" />}
                />
              </div>
            ))}
            {/* Show thinking indicator only if the last message was from user and AI is loading */}
            {isLoading && messages.length > 0 && messages[messages.length-1]?.type === 'user' && (
              <div className="animate-in slide-in-from-bottom-6 fade-in-0 duration-500">
                <ChatMessage
                  message={{id: 'loading', type: 'ai', content: '🤔 The QuantAI is contemplating your query...'}}
                  aiIcon={<DollarSign className="w-full h-full text-white animate-pulse" />}
                />
              </div>
            )}
             {/* Show initial loading when messages are empty and history is also empty (first load) */}
            {isLoading && messages.length === 0 && (
              <div className="animate-in slide-in-from-bottom-6 fade-in-0 duration-500">
                <ChatMessage
                  message={{id: 'initial-loading', type: 'ai', content: '✨ The QuantAI is preparing their wisdom...'}}
                  aiIcon={<DollarSign className="w-full h-full text-white animate-pulse" />}
                />
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="relative p-4 sm:p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-t border-white/30 dark:border-slate-700/40">
        <div className="max-w-4xl mx-auto">
          <ChatInput 
            onSubmit={handleSendMessage} 
            isLoading={isLoading} 
            placeholder="💬 Ask me anything about finance, investments, or market analysis..." 
          />
        </div>
      </div>
    </div>
  );
}
