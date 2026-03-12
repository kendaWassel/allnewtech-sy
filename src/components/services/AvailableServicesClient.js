"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ServicesCTA from "./ServicesCTA";

const AvailableServicesClient = ({ services, propertyType = 'Home', error = null, ctaContent, locale = "en" }) => {
  const [activeSection, setActiveSection] = useState(0);
  const ctaTitle = ctaContent?.title || "Start Your Project Today";
  const formatStepNumber = (value) => {
    const digits = String(value).match(/\d+/)?.[0];
    if (!digits) return value;
    const localeTag = locale.startsWith("ar") ? "ar-u-nu-arab" : "en";
    return new Intl.NumberFormat(localeTag).format(Number(digits));
  };
  useEffect(() => {
    const handleScroll = () => {
      const allSections = [
        ...services.map((_, index) => {
          const element = document.getElementById(`service-${index}`);
          return element ? { element, index, type: 'service' } : null;
        }),
        (() => {
          const element = document.getElementById('start-project-cta');
          return element ? { element, index: services.length, type: 'cta' } : null;
        })()
      ].filter(Boolean);

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = allSections.length - 1; i >= 0; i--) {
        const { element, index } = allSections[i];
        const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
        if (elementTop <= scrollPosition + 200) {
          setActiveSection(index);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [services]);

  const scrollToSection = (index) => {
    const element = document.getElementById(`service-${index}`);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToCTA = () => {
    const element = document.getElementById("start-project-cta");
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (error) {
    return (
      <section className="px-[0.75rem] md:px-[3.75rem] py-8">
        <h2 className="sr-only">Available Services</h2>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600 text-base md:text-lg mb-2">
              Unable to load services
            </p>
            <p className="text-gray-600 text-sm md:text-base">
              Try again!
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return (
      <section className="px-[0.75rem] md:px-[3.75rem] py-8">
        <h2 className="sr-only">Available Services</h2>
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-center text-gray-600 text-base md:text-lg">
            No services available at the moment. Check back soon!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-[0.75rem] md:px-[3.75rem] py-8">
      <h2 className="sr-only">Available Services</h2>
      <div className="flex xl:gap-[6.8rem] gap-[4.8rem] relative min-h-screen">
        <div className="hidden lg:block w-[286px] flex-shrink-0">
          <div className="sticky top-0 bg-[var(--white)] h-screen">
            <nav className="flex flex-col h-full py-[8rem] px-[1.25rem]">
              {services.map((service, index) => (
                <button
                  key={service.id || index}
                  onClick={() => scrollToSection(index)}
                  className={`cursor-pointer text-start py-3 transition relative ${
                    activeSection === index
                      ? ""
                      : ""
                  }`}
                >
                  <span className={`${activeSection === index ? "border-s-[5px] ps-2" : ""} text-xl font-bold text-[var(--secondary)]`}>{service.title}</span>
                </button>
              ))}
              <button
                onClick={scrollToCTA}
                className={`cursor-pointer text-start py-3 transition-colors mt-4 relative ${
                  activeSection === services.length
                    ? ""
                    : ""
                }`}
              >
                <span className={`${activeSection === services.length ? "border-s-[5px] ps-2" : ""} text-xl font-bold text-[var(--secondary)]`}>{ctaTitle}</span>
              </button>
            </nav>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-[3rem] md:gap-[4rem]">
          {services.map((service, index) => (
            <div 
              key={service.id || index} 
              id={`service-${index}`} 
              className="scroll-mt-[100px] flex flex-col items-start gap-[3rem] md:gap-[4rem]"
            >
              <div className="xl:ms-[8rem] md:ms-[4rem] mx-[auto] w-full sm:w-[21.9rem] md:w-[70%] xl:w-[45.2rem] h-[8.6rem] md:h-[12rem] xl:h-[19.2rem] flex-shrink-0">
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={308}
                    height={788}
                    sizes="(min-width: 1280px) 723px, (min-width: 768px) 70vw, (min-width: 640px) 350px, 100vw"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>

              <div className="flex-1">
                <div className="relative flex items-start gap-[1.5rem] md:ps-[6rem] ps-[2.5rem]">
                  <span className="text-[2rem] md:text-[4rem] font-bold absolute start-0 top-0">
                    #{formatStepNumber(index + 1)}
                  </span>
                  <div className="flex-1 border-s-[7px] md:border-s-[14px] border-[var(--primary-blue-first)] ps-[1.5rem] ms-[1.5rem]">
                    <h3 className="text-2xl md:text-[2.5rem] font-bold ">{service.title}</h3>
                    <div className="mt-[0.75rem] w-[90%]">
                    <p className="text-sm md:text-2xl mb-[2rem]">{service.description}</p>
                    <ul className="">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="text-sm md:text-2xl flex items-start">
                          <span className="me-2">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <ServicesCTA id="start-project-cta" className="scroll-mt-[100px]" content={ctaContent} locale={locale} />
        </div>
      </div>
    </section>
  );
};

export default AvailableServicesClient;

