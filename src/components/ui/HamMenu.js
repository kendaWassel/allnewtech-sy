'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const HamMenu = ({ locale = "en", items }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fallbackItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/contact-us", label: "Contact Us" },
  ];
  const navItems = Array.isArray(items) && items.length > 0 ? items : fallbackItems;

  const withLocale = (href = "") => {
    if (!href) return `/${locale}/`;
    if (/^(https?:|mailto:|tel:)/.test(href)) return href;
    if (href === "/") return `/${locale}/`;
    return `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
  };

  return (
    <>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden absolute end-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <Image 
          src="/icons/ham-menu.svg"
          alt="menu icon" 
          priority
          width={19} 
          height={14}/>
        </button>        
        {isMenuOpen && (
          <div 
            className="lg:hidden fixed md:top-[-2rem] md:start-[-2rem] md:end-[-2rem] h-screen inset-0 bg-black opacity-50 z-999"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}
        <div className={`lg:hidden fixed h-screen top-0 md:top-[-2rem] start-0 md:start-[-2rem] w-2/3 max-w-[280px] bg-[var(--secondary)] z-1000 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full'
        }`}>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-[3rem] end-[1.5rem]"
            aria-label="Close menu"
          >
            <Image 
            src="/icons/XCircle.svg" 
            alt="close button" 
            priority
            width={19.5} 
            height={19.5}/>
          </button>
          
          <nav aria-label="Mobile navigation" className="flex flex-col mt-[6.5rem]">
            {navItems.map((item) => (
              <Link
                key={`${item.href}-${item.label}`}
                href={withLocale(item.href)}
                className="relative font-bold py-[0.5rem] mb-[1.5rem] text-center text-white text-[0.75rem] border-t border-b border-[var(--primary-blue-first)]"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="absolute bottom-0 w-full bg-[#121E29] h-[96px]">
            <div className="relative top-[50%] -translate-y-1/2">
              <Image 
                src="/Logo-light.svg" 
                alt="All New Tech Logo" 
                priority
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
