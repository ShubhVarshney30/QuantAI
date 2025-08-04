// "use client"

import React from "react";


import Lightbox from "./light-box";
import { Button } from "./ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";
import Image from "next/image";
import Mobilebar from "./mobilemen";
// import { motion } from "framer-motion";
// import { usePathname } from "next/navigation";
// import { ChartBarIcon, ChatBubbleLeftRightIcon, CurrencyDollarIcon, AcademicCapIcon } from "lucide-react";


const Header = async() => {

  await checkUser();
  // const pathname = usePathname();
 

  return (
    <nav className=" bg-gradient-to-br from-pink-200 via-orange-100 to-cyan-300 border-0 sticky top-0 z-40 backdrop-blur-md pt-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16  ">
        <Link href="/dashboard" className="flex items-center" aria-label="QuantAI dashboard home">
          <Image
            src="/logo.png"
            alt="QuantAI Logo"
            width={200}
            height={60}
            className="h-16 w-auto object-contain"
          />
          <div className="flex items-center">
            <span className="text-emerald-600 font-bold text-2xl mr-1">Quant</span>
            <span className="text-orange-500 font-bold italic text-2xl">AI</span>
          </div>
        </Link>

        {/* Navigation Links - Different for signed in/out users */}
      

        {/* Action Buttons */}
        <div className="flex items-center justify-center space-x-4">
          <SignedIn className="flex items-center justify-center space-x-4">
          <Lightbox />
          <Mobilebar />
          </SignedIn>
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
            
          </SignedIn>
        </div>
      </div>
      </div>
    </nav>
    
  );
};

export default Header;
