'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const HamMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <Image src="/icons/ham-menu.svg" alt="menu icon" width={19} height={14}/>
        </button>        
        {isMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black opacity-50 z-999"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}
        <div className={`lg:hidden fixed top-0 left-0 h-full w-2/3 bg-[var(--secondary)] z-1000 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-[3rem] right-[1.5rem]"
            aria-label="Close menu"
          >
            <Image src="/icons/XCircle.svg" alt="close button" width={19.5} height={19.5}/>
          </button>
          
          {/* Navigation Links */}
          <nav aria-label="Mobile navigation" className="flex flex-col mt-[6.5rem]">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About Us" },
              { href: "/services", label: "Services" },
              { href: "/projects", label: "Projects" },
              { href: "/contact-us", label: "Contact Us" },
            ].map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative font-bold py-[0.5rem] mb-[1.5rem] text-center text-white text-[0.75rem] border-t border-b border-[var(--primary-blue-first)]"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="absolute bottom-0 w-full bg-[#121E29] h-[96px]">
            <div className="relative top-[50%] translate-y-[-50%]">
              <Image 
                src="/Logo-light.svg" 
                alt="All New Tech Logo" 
                width={48} 
                height={48}
                className="object-contain h-[75px] w-full"
              />
            </div>
          </div>
        </div>
    </>
  )
}

export default HamMenu
