'use client'
import { ModeToggle } from '@/components/global/mode-toggle'
import { useScrollTop } from '@/hooks/use-scroll-top'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navigation = () => {
  const scrolled = useScrollTop()
  return (
    <div className={cn("fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-10 border-b-2 shadow-xl",scrolled && 'bg-background')}>
      <aside className="flex items-center gap-2">
        <Image
          src={'/assets/logo3.svg'}
          width={40}
          height={40}
          alt="plur logo"
          className='text-background'
        />
        <span className="text-xl font-bold text-[#007adf] dark:text-white">ReadMe.md</span>
      </aside>
       <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
          <ul className="flex items-center justify-center gap-8 font-bold">
            <Link href={'#'}>Home</Link>
            <Link href={'#'}>Docs</Link>
            <Link href={'#'}>Documentation</Link>
            <a href={'https://aarjun8060.vercel.app/'} target='_blank'>Hire Me </a>
          </ul>
        </nav>
      <aside className="flex gap-2 items-center">
        <Link
          href={'/editor'}
          className="bg-primary text-white p-2 px-4 rounded-md hover:bg-primary/80"
        >
          <span>Get Started</span>
        </Link>

        <ModeToggle />
      </aside>
    </div>
  )
}

export default Navigation
