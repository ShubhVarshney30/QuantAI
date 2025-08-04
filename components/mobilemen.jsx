"use client";

import React, { useState, useEffect } from 'react';
import { LayoutDashboard, BrainCircuit, BookOpen, Menu, X, DollarSign, TrendingUp, Settings, LogOut } from "lucide-react";
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import { cn } from '@/lib/utils';

const MobileNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navigation = [
    { 
      name: "Dashboard", 
      href: "/dashboard", 
      icon: LayoutDashboard,
      description: "Overview & Analytics"
    },
    { 
      name: "AI Assistant", 
      href: "/ai-assistant", 
      icon: BrainCircuit,
      description: "Smart Financial Advisor"
    },
    { 
      name: "Transactions", 
      href: "/transaction/create", 
      icon: DollarSign,
      description: "Manage Your Money"
    },
    { 
      name: "Learning", 
      href: "/learning", 
      icon: BookOpen,
      description: "Financial Education"
    },
  ];

  const menuVariants = {
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      x: -20
    },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden mobile-menu-container">
        <Button
          variant="ghost"
          size="sm"
          className="w-10 h-10 p-0 hover:bg-white/20 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <motion.div
            animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            )}
          </motion.div>
        </Button>
      </div>

      {/* Mobile Menu Overlay and Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Menu Sidebar */}
            <motion.div
              className="fixed top-0 left-0 h-full w-80 bg-white/95 dark:bg-gray-900 backdrop-blur-xl shadow-2xl z-50 md:hidden mobile-menu-container"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Menu Header */}
              <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-orange-500 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-emerald-600 font-bold text-xl">Quant</span>
                      <span className="text-orange-500 font-bold italic text-xl">AI</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Your Smart Financial Assistant
                </p>
              </div>

              {/* Navigation Links */}
              <div className="p-4 space-y-2">
                {navigation.map((item, index) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                  const Icon = item.icon;
                  
                  return (
                    <motion.div
                      key={item.name}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                      custom={index}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                          isActive
                            ? "bg-gradient-to-r from-emerald-500/10 to-orange-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-700/50"
                            : "hover:bg-gray-100/50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                        )}
                      >
                        <div className={cn(
                          "p-2 rounded-lg transition-colors",
                          isActive
                            ? "bg-gradient-to-r from-emerald-500 to-orange-500 text-white"
                            : "bg-gray-100 dark:bg-gray-800 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30"
                        )}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {item.description}
                          </div>
                        </div>
                        {isActive && (
                          <motion.div
                            layoutId="mobile-active-indicator"
                            className="w-2 h-2 bg-emerald-500 rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Menu Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50">
                <motion.div
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  custom={navigation.length}
                  className="space-y-2"
                >
                  <Link
                    href="/settings"
                    className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 text-gray-600 dark:text-gray-400 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Settings</span>
                  </Link>
                  <button className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors w-full text-left">
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Sign Out</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavbar;