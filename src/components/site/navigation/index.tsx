'use client'
import { ModeToggle } from '@/components/global/mode-toggle'
import useDeviceDetect from '@/hooks/use-mobile-detect'
import { Download } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Navigation = ({
  selectedSectionSlugs,
  setShowModal,
  getTemplate,
  onMenuClick,
  isDrawerOpen
}:any) => {
  const pathname = usePathname();
  const { isMobile } = useDeviceDetect();
  const markdown = selectedSectionSlugs?.reduce((acc, section) => {
    const template = getTemplate(section);
    if (template) {
      return `${acc}${template?.markdown}`;
    } else {
      return acc;
    }
  }, ``);

  const downloadMarkDownFile = () => {
    const a = document.createElement('a');
    const blob = new Blob([markdown]);
    a.href = URL.createObjectURL(blob);
    a.download = 'README.md';
    a.click();
    if (isMobile && isDrawerOpen) {
      onMenuClick();
    }
    setShowModal(true);
  }
  return (
    <div className="fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-10 border-b-2 shadow-xl">
      <aside className="flex items-center gap-2">
        <Image
          src={'./assets/plura-logo.svg'}
          width={40}
          height={40}
          alt="plur logo"
        />
        <span className="text-xl font-bold">ReadMe.md</span>
      </aside>
      {
        pathname === '/' && (<nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
          <ul className="flex items-center justify-center gap-8">
            <Link href={'#'}>Home</Link>
            <Link href={'#'}>About</Link>
            <Link href={'#'}>Documentation</Link>
            <Link href={'#'}>Features</Link>
          </ul>
        </nav>)
      }
      <aside className="flex gap-2 items-center">
        {pathname === '/' ? (<Link
          href={'/editor'}
          className="bg-primary text-white p-2 px-4 rounded-md hover:bg-primary/80"
        >
          <span>Get Started</span>
        </Link>) : (
          <div
            onClick={downloadMarkDownFile}
            className="bg-primary text-white p-2 px-4 rounded-md hover:bg-primary/80 text-nowrap flex items-center justify-center space-x-2"
          >
            <span><Download /></span><span>Download</span>
          </div>
        )}

        <ModeToggle />
      </aside>
    </div>
  )
}

export default Navigation
