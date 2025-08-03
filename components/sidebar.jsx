"use client"

import { BarChart3, Bot, TrendingUp, BookOpen, Wallet, Sparkles, Zap, Target, Award } from "lucide-react"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: BarChart3,
    description: "Budget Tracking",
    gradient: "from-blue-500 to-purple-600",
    iconBg: "bg-gradient-to-r from-blue-500 to-purple-600",
  },
  {
    id: "ai-assistant",
    label: "AI Assistant",
    icon: Bot,
    description: "Financial Guidance",
    gradient: "from-emerald-500 to-teal-600",
    iconBg: "bg-gradient-to-r from-emerald-500 to-teal-600",
  },
  {
    id: "paper-trading",
    label: "Paper Trading",
    icon: TrendingUp,
    description: "Investment Simulator",
    gradient: "from-orange-500 to-red-600",
    iconBg: "bg-gradient-to-r from-orange-500 to-red-600",
  },
  {
    id: "learning",
    label: "Learn",
    icon: BookOpen,
    description: "Financial Education",
    gradient: "from-pink-500 to-rose-600",
    iconBg: "bg-gradient-to-r from-pink-500 to-rose-600",
  },
]

const quickActions = [
  { icon: Zap, label: "Quick Add", color: "text-yellow-500" },
  { icon: Target, label: "Goals", color: "text-green-500" },
  { icon: Award, label: "Rewards", color: "text-purple-500" },
]

export function Sidebar({ activeTab, setActiveTab, isOpen = true, onClose }) {
  const handleNavClick = (tabId) => {
    setActiveTab(tabId)
    if (onClose) onClose()
  }

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full w-72 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white shadow-2xl border-r border-white/10 z-40 transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      )}
    >
      <div className="p-4 sm:p-6 overflow-y-auto h-full">
        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="relative">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Wallet className="w-5 sm:w-7 h-5 sm:h-7 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 sm:w-4 h-3 sm:h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-1.5 sm:w-2 h-1.5 sm:h-2 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold gradient-text">FinWise</h1>
            <p className="text-xs sm:text-sm text-white/60">Smart Finance</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl transition-all duration-300 text-left group relative overflow-hidden",
                  isActive
                    ? "bg-white/10 text-white shadow-lg backdrop-blur-sm border border-white/20"
                    : "text-white/70 hover:bg-white/5 hover:text-white",
                )}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50" />
                )}
                <div
                  className={cn(
                    "w-8 sm:w-10 h-8 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 relative z-10 flex-shrink-0",
                    isActive ? item.iconBg : "bg-white/10 group-hover:bg-white/20",
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 sm:w-5 h-4 sm:h-5 transition-all duration-300",
                      isActive ? "text-white scale-110" : "text-white/80 group-hover:scale-105",
                    )}
                  />
                </div>
                <div className="relative z-10 min-w-0 flex-1">
                  <div className="font-semibold text-sm sm:text-base truncate">{item.label}</div>
                  <div className="text-xs opacity-70 truncate hidden sm:block">{item.description}</div>
                </div>
                {isActive && (
                  <div className="absolute right-3 sm:right-4 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full pulse-glow flex-shrink-0" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Quick Actions */}
        <div className="bg-white/5 rounded-2xl p-3 sm:p-4 backdrop-blur-sm border border-white/10 mb-4 sm:mb-6">
          <h3 className="text-xs sm:text-sm font-semibold text-white/80 mb-2 sm:mb-3 flex items-center gap-2">
            <Sparkles className="w-3 sm:w-4 h-3 sm:h-4" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-3 gap-1 sm:gap-2">
            {quickActions.map((action, index) => {
              const ActionIcon = action.icon
              return (
                <button
                  key={index}
                  className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                >
                  <ActionIcon
                    className={cn("w-4 sm:w-5 h-4 sm:h-5 group-hover:scale-110 transition-transform", action.color)}
                  />
                  <span className="text-xs text-white/70 group-hover:text-white truncate">{action.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-3 sm:p-4 border border-green-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm text-white/80">This Month</span>
            <TrendingUp className="w-3 sm:w-4 h-3 sm:h-4 text-green-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white">+$2,340</div>
          <div className="text-xs text-green-400">↗ 12% increase</div>
        </div>
      </div>
    </div>
  )
}
