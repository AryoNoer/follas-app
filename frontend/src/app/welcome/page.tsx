"use client";

import Image from 'next/image'
import React from 'react'
import Button from '../components/Button'
import { ArrowRightIcon } from '@heroicons/react/16/solid'

export default function WelcomePage() {
  return (
    <main className="flex h-screen flex-col space-y-16 items-center justify-center p-8 bg-[#506C2F]">
        <div>
            <h1 className="text-white font-medium text-[22px]">
            Sebelum lebih jauh yuk simak langkah dibawah !
            </h1>
        </div>
        <div className='flex flex-col space-y-5'>
            <Image
                src="/langkah 1.svg"
                alt="follas-logo"
                width={480}
                height={37}
                priority
            />
            <Image
                src="/langkah 2.svg"
                alt="follas-logo"
                width={480}
                height={37}
                priority
            />
            <Image
                src="/langkah 3.svg"
                alt="follas-logo"
                width={480}
                height={37}
                priority
            />
        </div>
        <div className="flex flex-col sm:space-y-5 md:flex-row md:space-y-0 md:space-x-8 justify-center items-center">
            <Button 
                text="Pesan Menu"
                className="w-52 flex items-center justify-center font-medium text-lg rounded-2xl" 
                onClick={() => window.location.href = "/menu"}
            >
                <ArrowRightIcon className="w-6 h-6 ml-2"/>
            </Button>

            <Button 
                text="Login" 
                type="login"
                className="w-52 flex items-center justify-center font-medium text-lg rounded-2xl" 
                onClick={() => window.location.href = "/welcome/login"}
            >
            </Button>
        </div>

    </main>
  )
}

