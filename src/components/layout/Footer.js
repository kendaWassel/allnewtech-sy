import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="bg-[var(--secondary)] text-white pt-12 pb-[6rem] sm:px-[var(--inline-padding)]">
        <div className="flex justify-between">
            <div className="flex flex-col lg:flex-3 flex-1 lg:items-start items-center">
              <Link href="/" className="mb-6">
                <Image 
                  src="/Logo-light.svg" 
                  alt="All New Tech Logo" 
                  width={300} 
                  height={160} 
                  className="lg:w-[300px] lg:h-[160px] w-[200px] h-[130px] "
                />
              </Link>
              <div className="flex flex-col gap-2 text-white lg:items-start items-center">
                <p>Location - location</p>
                <p>location</p>
                <p>+999999999999</p>
                <p>info@allnewtech.co.uk</p>
              </div>
            </div>
          <div className="lg:flex-4 lg:flex hidden justify-between">
            <div className="flex flex-col w-2/6">
              <h4 className="text-white font-bold mb-4">Services</h4>
              <div className="flex flex-col gap-2">
                <Link 
                  href="/services/home-solutions" 
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  Home Services
                </Link>
                <Link 
                  href="/services/commercial-solutions" 
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  Commercial Services
                </Link>
              </div>
            </div>
            <div className="flex flex-col w-2/6">
              <h4 className="text-white font-bold mb-4">Start Your Project Today</h4>
              <div className="flex flex-col gap-2">
                <Link 
                  href="/contact-us" 
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  Request a Site Survey
                </Link>
                <Link 
                  href="/custom-quote" 
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  Get a Free Custom Quote
                </Link>
              </div>
            </div>
            <div className="flex flex-col w-1/7">
              <h4 className="text-white font-bold mb-4">Useful Links</h4>
              <div className="flex flex-col gap-2">
                <Link 
                  href="/" 
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  Home
                </Link>
                <Link 
                  href="/services" 
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  Services
                </Link>
                <Link 
                  href="/projects" 
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  Projects
                </Link>
                <Link 
                  href="/contact-us" 
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  Contact Us
                </Link>
                <Link 
                  href="/about" 
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--primary-blue-second)] py-4 lg:px-[var(--inline-padding)]">
        <div className="lg:ps-[3rem] lg:text-start text-center">
          <p className="text-white text-sm">
            ©2026 All New Tech, all rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
