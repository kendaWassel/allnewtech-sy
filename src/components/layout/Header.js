"use client";
import Link from "next/link";
import Image from "next/image";
import HamMenu from "../ui/HamMenu";
import { useState } from "react";

const Header = () => {
  const [isServicesHovered, setIsServicesHovered] = useState(false);

  return (
    <header className="sticky top-0 z-1000">
      <div className="flex items-center justify-between lg:px-[var(--inline-padding)] pe-[1rem] py-4 w-full relative bg-[var(--white)] lg:h-[65px] h-[42px]">
        <Link href="/" className="absolute left-[var(--small-padding)] lg:left-[var(--inline-padding)] top-0 w-[95px] sm:w-[180px] lg:w-[230px] h-[42px] sm:h-[65px] lg:h-[90px] bg-[var(--secondary)] flex items-center z-10">
          <Image src="/Logo-light.svg" alt="All New Tech Logo" fill className="object-cover p-2 lg:p-4" />
        </Link>

        <nav aria-label="Main navigation" className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
          <ul className="flex items-center xl:gap-[4.5rem] gap-[1rem]">
            {[
              { href: "/about", label: "About Us" },
              { href: "/services", label: "Services", hasDropdown: true },
              { href: "/projects", label: "Projects" },
              { href: "/contact-us", label: "Contact Us" },
            ].map((item) => (
              <li 
                key={item.href}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setIsServicesHovered(true)}
                onMouseLeave={() => item.hasDropdown && setIsServicesHovered(false)}
              >
                <Link
                  href={item.href}
                  className="text-[var(--secondary)] font-bold"
                >
                  {item.label}
                </Link>
                {item.hasDropdown && isServicesHovered && (
                  <div 
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[280px] z-50"
                    onMouseEnter={() => setIsServicesHovered(true)}
                    onMouseLeave={() => setIsServicesHovered(false)}
                  >
                    <div className="bg-[var(--primary-blue-first)] shadow-lg">
                      <div className="flex flex-col py-6 px-8 gap-6">
                        <Link
                          href="/services/home-solutions"
                          className="text-white font-bold text-center hover:opacity-80 transition-opacity"
                        >
                          Home Services
                        </Link>
                        <Link
                          href="/services/commercial-solutions"
                          className="text-white font-bold text-center hover:opacity-80 transition-opacity"
                        >
                          Commercial Services
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <HamMenu />
      </div>
    </header>
  );
};

export default Header;
