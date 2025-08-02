import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import Image from 'next/image'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { LayoutDashboard, PenBox } from 'lucide-react';

const Header = () => {
  return (
    <div className='fixed top-0 w-full'>
        <nav className='container mx-auto px-4 py-4 flex items-center justify-between'>
            <Link href="/">
            <Image alt="logo" src="/logo.png" height={100} width={100} className="cursor-pointer h-12 w-auto bg-white"/>
            </Link> 
            <div className='flex items-center gap-4'    >
                <SignedIn className='flex items-center gap-2'>
                    <Link href={"/dashboard"} className='text-gray-600 hover:text-blue-500'>
                        <Button className="flex items-center gap-2">
                            <LayoutDashboard size={18}/>
                            <span className='hidden md:inline'>Dashboard</span>
                        </Button>
                    </Link>
                    <Link href={"/transaction/create"} className='text-gray-600 hover:text-blue-500'>
                        <Button className="flex items-center gap-2">
                            <PenBox size={18}/>
                            <span className='hidden md:inline'>Create Transaction</span>
                        </Button>
                    </Link>
                </SignedIn>

                <SignedOut>
                    <SignInButton forceRedirectUrl='/dashboard'>
                        <Button variant="outline">Log in</Button>
                    </SignInButton>
                    <SignUpButton>
                        <Button variant="outline">Sign Up</Button>
                    </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton appearance={{
                    elements:{
                        avatarBox:"w-15 h-15",
                    },
                  }} 
                  />
                </SignedIn>
            </div>
        </nav>
    </div>
  )
}

export default Header