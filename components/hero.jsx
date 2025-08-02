// "use client"

// import { Button } from "./ui/button"
// import React from 'react'
// import Link from 'next/link'

// const HeroSection = () => {
//   return (
//     <div className='pb-20 px-4 py-16'>
//         <div className='container mx-auto text-center'>
//             <h1>Manage your personal expenses with ease</h1>
//             <p>Welth is a personal finance management tool that helps you track your expenses and manage your budget.</p>
//             <div>
//                 <Link href="/dashboard" className="cursor-pointer">
//                     <Button size="lg" className='mt-4'>Get Started</Button>
//                 </Link>
//                 <Link href="https://www.youtube.com/watch?v=egS6fnZAdzk" className="cursor-pointer">
//                     <Button size="lg" variant="outline" className='mt-4'>watch demo</Button>
//                 </Link>
//             </div>
//             {/* <div>
//                <img src="/banner.png" alt="banner" />
//             </div> */}

//         </div>
//     </div>
//   )
// }   

// export default HeroSection;

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Card } from "@/components/ui/card"
// import { ThemeToggle } from "@/components/ui/theme-toggle"
import {
  SparklesIcon,
  ChartBarIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline"

const features = [
  {
    icon: ChartBarIcon,
    title: "Smart Dashboard",
    description: "Visualize your financial journey with beautiful, insightful charts",
    color: "from-emerald-400 to-teal-500",
  },
  {
    icon: SparklesIcon,
    title: "AI Assistant",
    description: "Get personalized financial advice that understands your mood",
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: CurrencyDollarIcon,
    title: "Investment Simulator",
    description: "Practice investing with virtual money and compete with friends",
    color: "from-orange-400 to-red-500",
  },
  {
    icon: AcademicCapIcon,
    title: "Learn & Grow",
    description: "Master finance through interactive lessons and challenges",
    color: "from-blue-400 to-indigo-500",
  },
  {
    icon: UserGroupIcon,
    title: "Family Budgets",
    description: "Share expenses and budgets with roommates or family",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: ShieldCheckIcon,
    title: "Privacy First",
    description: "Your data stays yours with local storage options",
    color: "from-gray-400 to-slate-500",
  },
]

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    setIsLoaded(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Theme Toggle - Fixed Position */}
      {/* <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div> */}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-emerald-300/30 to-teal-300/30 rounded-full organic-blob animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-coral-300/20 to-orange-300/20 rounded-full organic-blob animate-pulse delay-1000"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            <span className="gradient-text">Fin</span>
            <span className="handwritten text-coral-500">Verse</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Your personal finance universe where money management becomes
            <span className="handwritten text-emerald-600"> magical</span>,
            <span className="handwritten text-purple-600"> educational</span>, and
            <span className="handwritten text-coral-500"> fun</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            //   onClick={() => router.push("/dashboard")}
              >
              Start Your Journey ✨
            </Button>
            </Link>
            <Link href="https://www.youtube.com/watch?v=egS6fnZAdzk" className="cursor-pointer">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 px-8 py-4 text-lg rounded-2xl transition-all duration-300 bg-transparent"
              // onClick={() => router.push("/learn")}
            >
              Watch Demo
            </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why <span className="handwritten gradient-text">FinVerse</span> is Different
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We believe finance should be approachable, engaging, and empowering. Every feature is crafted with love
              and attention to your unique journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="glass-card p-8 h-full hover:shadow-2xl transition-all duration-500 border-0 relative overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>

                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-full h-full text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your
            <span className="handwritten gradient-text"> Financial Future</span>?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands who've already started their journey to financial freedom
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-12 py-6 text-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => router.push("/dashboard")}
          >
            Begin Your Adventure 🚀
          </Button>
        </motion.div>
      </section>
    </div>
  )
}


