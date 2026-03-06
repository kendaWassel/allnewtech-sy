"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import HamMenu from "../ui/HamMenu";
import { useState } from "react";
import { siteConfig } from "@/config/site";

const Header = ({ locale = "en", content }) => {
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const otherLocale = locale === "en" ? "ar" : "en";

  const navItems = content?.nav || [
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services", hasDropdown: true },
    { href: "/projects", label: "Projects" },
    { href: "/contact-us", label: "Contact Us" },
  ];

  const servicesDropdown = content?.servicesDropdown || {
    homeLabel: "Home Services",
    homeHref: "/services/home-solutions",
    commercialLabel: "Commercial Services",
    commercialHref: "/services/commercial-solutions",
  };

  const mobileNavItems = content?.mobileNav || [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/contact-us", label: "Contact Us" },
  ];

  const languageSwitch = content?.languageSwitch || {
    toEnglish: "Switch to English",
    toArabic: "Switch to Arabic",
  };

  const phoneAriaPrefix = content?.phoneAriaPrefix || "Call us at";
  const phoneE164 = siteConfig.contact?.phoneE164 || "";
  const phoneDisplay = siteConfig.contact?.phoneDisplay || phoneE164;
  const hasPhone = Boolean(phoneE164);

  const pathname = usePathname() || "";
  const segments = pathname.split("/");
  segments[1] = otherLocale;
  const switchHref = segments.join("/") || `/${otherLocale}`;

  const withLocale = (href = "") => {
    if (!href) return `/${locale}/`;
    if (/^(https?:|mailto:|tel:)/.test(href)) return href;
    if (href === "/") return `/${locale}/`;
    return `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
  };

  return (
    <header className="sticky md:top-[2rem] top-0 z-1000 md:px-[2rem]">
      <div className="md:rounded-[var(--ar-radius)] flex flex-row-reverse items-center justify-between lg:px-[3rem] pe-[1rem] py-4 w-full relative md:bg-[#dde0e3b3] md:backdrop-blur-[10px] bg-[var(--white)] lg:h-[65px] h-[42px]">
        <Link href={`/${locale}/`} className="absolute start-[var(--small-padding)] md:start-[3rem] top-0 w-[95px] sm:w-[180px] lg:w-[230px] h-[42px] md:h-full bg-[var(--secondary)] flex items-center z-10">
          <Image src="/Logo-light.svg" alt="All New Tech Logo" width={100} height={42} className="w-full h-full object-contain" />
        </Link>

        <nav aria-label="Main navigation" className="hidden lg:flex absolute start-1/2 rtl:translate-x-1/2 -translate-x-1/2">
          <ul className="flex items-center xl:gap-[4.5rem] gap-[1rem]">
            {navItems.map((item) => (
              <li
                key={`${item.href}-${item.label}`}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setIsServicesHovered(true)}
                onMouseLeave={() => item.hasDropdown && setIsServicesHovered(false)}
              >
                <Link href={withLocale(item.href)} className="text-[var(--secondary)] font-bold">
                  {item.label}
                </Link>
                {item.hasDropdown && isServicesHovered && (
                  <div
                    className="absolute top-full start-1/2 rtl:translate-x-1/2 -translate-x-1/2 pt-2 w-[280px] z-50"
                    onMouseEnter={() => setIsServicesHovered(true)}
                    onMouseLeave={() => setIsServicesHovered(false)}
                  >
                    <div className="bg-[var(--primary-blue-first)] shadow-lg">
                      <div className="flex flex-col py-6 px-8 gap-6">
                        <Link href={withLocale(servicesDropdown.homeHref)} className="text-white font-bold text-center hover:opacity-80 transition-opacity">
                          {servicesDropdown.homeLabel}
                        </Link>
                        <Link href={withLocale(servicesDropdown.commercialHref)} className="text-white font-bold text-center hover:opacity-80 transition-opacity">
                          {servicesDropdown.commercialLabel}
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-[1.5rem] lg:gap-[3rem] me-[3rem] lg:me-0">
          <Link href={switchHref} className="p-1 hover:opacity-80" aria-label={otherLocale === "en" ? languageSwitch.toEnglish : languageSwitch.toArabic}>
            <Image src={`/icons/${otherLocale === "en" ? "en" : "sy"}.svg`} alt="" width={28} height={28} />
          </Link>
          {hasPhone && (
            <a
              href={`tel:${phoneE164}`}
              dir="ltr"
              className="hidden md:block text-[var(--secondary)] font-bold text-sm lg:text-base hover:opacity-80"
              aria-label={`${phoneAriaPrefix} ${phoneDisplay}`}
            >
              {phoneDisplay}
            </a>
          )}
        </div>
        <HamMenu locale={locale} items={mobileNavItems} />
      </div>
    </header>
  );
};

export default Header;
