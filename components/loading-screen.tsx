"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Loading world...");

  // Simulate loading progress
  useEffect(() => {
    const loadingTexts = [
      "Loading world...",
      "Generating quant...",
      "Calculating finance...",
      "Preparing adventure...",
      "Almost ready...",
    ]; 

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });

      setLoadingText(
        loadingTexts[Math.floor(Math.random() * loadingTexts.length)]
      );
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-blue-950/50 dark:to-indigo-950/30 flex flex-col items-center justify-center z-50">
        
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-300/20 to-teal-300/20 rounded-full organic-blob animate-pulse"></div>
    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full organic-blob animate-pulse delay-1000"></div>
  </div>
      <div className="w-full max-w-md px-4 text-center">
        {/* Pixelated Logo */}
        <div className="mb-8 pixel-art">
          
          <div className="flex items-center">
          
          <span className="text-emerald-600 font-bold text-8xl">Quant</span>
          <span className="text-orange-500 font-bold italic text-8xl">AI</span>

</div>
          
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 relative">
              <div className="absolute inset-0 pixel-chest"></div>
            </div>
          </div>
        </div>

        {/* Loading Bar */}
        <div className="w-full h-8 bg-[#352f44] border-4 border-black mb-4 relative overflow-hidden">
          <motion.div
            className="h-full bg-black"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }}
          />

          {/* Pixelated blocks on top of loading bar */}
          <div className="absolute inset-0 pixel-loading-overlay"></div>
        </div>

        {/* Loading Text */}
        <p className="text-black pixel-text">{loadingText}</p>
        <p className="text-black mt-2 pixel-text">
          {Math.floor(progress)}%
        </p>

        {/* Animated Pixel Character */}
        <div className="mt-8">
          <div className="pixel-character"></div>
        </div>
      </div>
    </div>
  );
}