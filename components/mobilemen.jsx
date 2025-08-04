"use client"

import React from 'react'
import { LayoutDashboard, BrainCircuit, BookOpen } from "lucide-react";
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { motion } from "framer-motion"
import Link from 'next/link'
import { Layers3Icon, MapIcon } from "lucide-react";
import { useState } from 'react';
import { AnimatePresence } from "framer-motion";

const Mobilebar = () => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    
const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "AI Assistant", href: "/ai-assistant", icon: BrainCircuit },
    // { name: "Simulator", href: "/simulator", icon: ChartCandlestick },
    { name: "Learn", href: "/learning", icon: BookOpen },
  ]

  return (
    <div>
    <div>
         <Button
              variant="ghost"
              size="sm"
              className="md:hidden w-9 h-9 p-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <MapIcon className="w-5 h-5" /> : <Layers3Icon className="w-5 h-5" />}
            </Button>
          </div>
        

         {mobileMenuOpen && (
            <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4"
          >
            
            <div className="space-y-2 mt-20 bg-white w-full">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (

                  <Link key={item.name} href={item.href} className='pt-10 mt-5'>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start gap-3 ${
                        isActive ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white" : ""
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5 p" />
                      {item.name}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </motion.div>
          </AnimatePresence>
        )}
    
 </div>
  )
}

export default Mobilebar