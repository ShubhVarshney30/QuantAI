"use client"

import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BrainCircuit, BookOpen } from "lucide-react";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "AI Assistant", href: "/ai-assistant", icon: BrainCircuit },
    // { name: "Simulator", href: "/simulator", icon: ChartCandlestick },
    { name: "Learn", href: "/learning", icon: BookOpen },
  ]

const Lightbox = () => {
    const pathname = usePathname()
  return (
    <div>
       <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`flex items-center gap-2 ${
                      isActive
                        ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                        : "hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </div>
    </div>
  )
}

export default Lightbox