// "use client";

// import React, { useEffect, useRef } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// const HeroSection = () => {
//   const imageRef = useRef(null);

//   useEffect(() => {
//     const imageElement = imageRef.current;

//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       const scrollThreshold = 100;

//       if (scrollPosition > scrollThreshold) {
//         imageElement.classList.add("scrolled");
//       } else {
//         imageElement.classList.remove("scrolled");
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <section className="pt-40 pb-20 px-4">
//       <div className="container mx-auto text-center">
//         <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
//           Manage Your Finances <br /> with Intelligence
//         </h1>
//         <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
//           An AI-powered financial management platform that helps you track,
//           analyze, and optimize your spending with real-time insights.
//         </p>
//         <div className="flex justify-center space-x-4">
//           <Link href="/dashboard">
//             <Button size="lg" className="px-8">
//               Get Started
//             </Button>
//           </Link>
//           <Link href="https://www.youtube.com/roadsidecoder">
//             <Button size="lg" variant="outline" className="px-8">
//               Watch Demo
//             </Button>
//           </Link>
//         </div>
//         <div className="hero-image-wrapper mt-5 md:mt-0">
//           <div ref={imageRef} className="hero-image">
//             <Image
//               src="/banner.jpeg"
//               width={1280}
//               height={720}
//               alt="Dashboard Preview"
//               className="rounded-lg shadow-2xl border mx-auto"
//               priority
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Card } from "@/components/ui/card"
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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-pink-200 via-orange-100 to-cyan-100">
        {/* Large circular element on the left */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
          <div className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-cyan-200 to-blue-300 rounded-full opacity-60"></div>
        </div>
        
        {/* Decorative stars */}
        <div className="absolute top-20 right-20 text-gray-400 text-2xl">✦</div>
        <div className="absolute top-32 right-32 text-gray-300 text-lg">✦</div>
        <div className="absolute bottom-32 left-20 text-gray-300 text-xl">✦</div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto z-10"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            <span className="text-emerald-600 font-bold">Quant</span>
            <span className="text-orange-500 font-bold italic">AI</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Your personal finance universe where money management becomes{' '}
            <span className="text-emerald-600 italic font-medium">magical</span>,{' '}
            <span className="text-purple-600 italic font-medium">educational</span>, and{' '}
            <span className="text-orange-500 italic font-medium">fun</span>
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
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Your Journey ✨
              </Button>
            </Link>
            <Link href="https://youtu.be/4Y4ZVj-TBgk?si=6-klpGBh6J9-0joh" className="cursor-pointer">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-orange-400 text-orange-500 hover:bg-orange-50 px-8 py-3 text-lg rounded-full transition-all duration-300 bg-white/80"
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
              Why <span className="handwritten gradient-text">QuantAI</span> is Different
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
            Join thousands who have already started their journey to financial freedom
          </p>
          <Link href="/dashboard">
          <Button
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-12 py-6 text-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            // onClick={() => router.push("/dashboard")}
          >
            Begin Your Adventure 🚀
          </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}


