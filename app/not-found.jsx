
"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] px-4 text-center">
      <h1 className="text-6xl font-bold gradient-title mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p>
      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
}



// "use client";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Sparkles, ArrowLeftCircle } from "lucide-react";
// import { useEffect, useRef } from "react";

// // Particle background animation
// function ParticleBackground() {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     let particlesArray = [];

//     const resizeCanvas = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);

//     class Particle {
//       constructor() {
//         this.x = Math.random() * canvas.width;
//         this.y = Math.random() * canvas.height;
//         this.size = Math.random() * 2 + 0.5;
//         this.speedX = Math.random() * 0.5 - 0.25;
//         this.speedY = Math.random() * 0.5 - 0.25;
//       }

//       update() {
//         this.x += this.speedX;
//         this.y += this.speedY;

//         if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
//         if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
//       }

//       draw() {
//         ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.fill();
//       }
//     }

//     function initParticles() {
//       particlesArray = [];
//       for (let i = 0; i < 150; i++) {
//         particlesArray.push(new Particle());
//       }
//     }

//     function animateParticles() {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       for (let i = 0; i < particlesArray.length; i++) {
//         particlesArray[i].update();
//         particlesArray[i].draw();
//       }
//       requestAnimationFrame(animateParticles);
//     }

//     initParticles();
//     animateParticles();

//     return () => window.removeEventListener("resize", resizeCanvas);
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
//     />
//   );
// }

// // Main NotFound Component
// export default function NotFound() {
//   return (
//     <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white px-6">
//       <ParticleBackground />

//       <motion.div
//         initial={{ opacity: 0, y: 40, scale: 0.95 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className="relative z-10 text-center max-w-2xl"
//       >
//         <motion.h1
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
//           className="text-7xl sm:text-8xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl"
//         >
//           404
//         </motion.h1>

//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.8 }}
//           className="text-2xl sm:text-3xl font-semibold mt-6"
//         >
//           Whoops! Page vanished into the void.
//         </motion.h2>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1 }}
//           className="mt-4 text-zinc-300 text-lg"
//         >
//           Looks like the URL you typed doesn’t lead anywhere. Maybe it's the multiverse?
//         </motion.p>

//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 1.2 }}
//           className="mt-8"
//         >
//           <Link
//             href="/"
//             className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-xl"
//           >
//             <ArrowLeftCircle className="w-5 h-5 animate-pulse" />
//             Return Home
//           </Link>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }
