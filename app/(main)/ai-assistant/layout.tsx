// src/app/(app)/layout.tsx
"use client";


import { Suspense } from "react";
import { LoadingScreen } from "@/components/loading-screen";

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, Settings as SettingsIcon } from 'lucide-react';

// import { cn } from '@/lib/utils';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,

} from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import AppLogo from '@/components/layout/AppLogo';
import { ScrollArea } from '@/components/ui/scroll-area';


interface AppLayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: '/ai-assistant', label: 'chat', icon: MessageSquare },
  { href: '/ai-assistant/settings', label: 'settings', icon: SettingsIcon },
];

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider defaultOpen>
        <Sidebar 
          side="left" 
          collapsible="icon" 
          variant="sidebar" 
          className="border-r-0 bg-gradient-to-b from-violet-50/80 via-cyan-50/60 to-emerald-50/40 dark:from-slate-900/90 dark:via-purple-900/30 dark:to-slate-900/90 backdrop-blur-xl shadow-2xl"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-4 w-16 h-16 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-lg animate-pulse"></div>
            <div className="absolute bottom-32 right-2 w-20 h-20 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full blur-lg animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-2 w-12 h-12 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-lg animate-pulse delay-500"></div>
          </div>

          <SidebarHeader className="relative p-6 flex items-center justify-center border-b border-white/20 dark:border-slate-700/30 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm">
            <div className="relative">
              <AppLogo />
              
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-xl blur-xl animate-pulse -z-10"></div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="relative p-4 space-y-2">
            <SidebarMenu className="space-y-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <Link href={item.href} passHref legacyBehavior>
                      <SidebarMenuButton
                        asChild={false}
                        isActive={isActive}
                        className={`
                          relative w-full rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden
                          ${isActive 
                            ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white shadow-xl shadow-blue-500/30 border border-blue-400/20' 
                            : 'bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-white/30 dark:border-slate-600/30 hover:border-blue-300/50 dark:hover:border-blue-500/50'
                          }
                          backdrop-blur-sm shadow-lg hover:shadow-xl
                        `}
                        tooltip={{children: item.label, side: "right", align: "center"}}
                        size="default"
                      >
                        {/* Animated background for active item */}
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-indigo-400/20 animate-pulse rounded-2xl"></div>
                        )}
                        
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-100/20 via-blue-100/10 to-indigo-100/20 dark:from-slate-700/20 dark:via-slate-600/10 dark:to-slate-700/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                        
                        <div className="relative z-10 flex items-center gap-3 px-4 py-3">
                          <div className={`
                            p-2 rounded-xl transition-all duration-300
                            ${isActive 
                              ? '' 
                              : ''
                            }
                          `}>
                            <item.icon className={`
                              h-5 w-5 transition-all duration-300
                              ${isActive ? 'text-white' : 'text-blue-600 dark:text-blue-400'}
                            `} />
                          </div>
                          <span className={`
                            group-data-[collapsible=icon]:hidden font-semibold capitalize transition-all duration-300
                            ${isActive 
                              ? 'text-white' 
                              : 'text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white'
                            }
                          `}>
                            {item.label}
                          </span>
                        </div>
                        
                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-pulse shadow-lg"></div>
                        )}
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
            
            {/* Decorative elements */}
            {/* <div className="mt-8 space-y-4">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent dark:via-slate-600/50"></div>
              <div className="flex justify-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 animate-pulse"></div>
              </div>
            </div> */}
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          {/* <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-foreground">
                {navItems.find(item => item.href === pathname)?.label || 'Verse Advisor'}
              </h1>
            </div>
          </header> */}
          <ScrollArea className="flex-1 h-[calc(100vh-4rem)]">
             <main className="p-4 md:p-6 pb-5 ">
                <Suspense fallback={<LoadingScreen />}>
                  {children}
                </Suspense>
             </main>
          </ScrollArea>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
