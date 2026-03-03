import homeSolutions from "@/content/home-solutions";
import commercialSolutions from "@/content/commercial-solutions";
import Image from "next/image";
import CTAButton from "../ui/CTAButton";

const DiscoverSection = ({ propertyType = 'home' }) => {
  // Get content based on property type
  const solution = propertyType === 'home' ? homeSolutions : commercialSolutions;
  const isHome = propertyType === 'home';
  
  // Set image and link based on property type
  const imageSrc = isHome ? '/services/category-2.jpg' : '/services/category-1.jpg';
  const imageAlt = isHome ? 'Commercial building' : 'Home building';
  const link = isHome ? '/services/commercial-solutions' : '/services/home-solutions';

  return (
    <section className="my-[1.5rem] md:my-[8.5rem] relative overflow-hidden">
      <h2 className="sr-only">{solution.discover.button}</h2>
      <div className="flex justify-end relative bg-[var(--secondary)] w-full h-[10rem] sm:h-[15rem] md:h-[22rem] lg:h-[25rem] xl:h-[28rem]">
        <div className="absolute top-[50%] left-0 -translate-y-1/2 h-full">
          <div className="absolute bg-white rounded-full w-[13rem] sm:w-[25rem] md:w-[30.5rem] lg:w-[40.5rem] h-[120%] top-[50%] translate-y-[-50%] -left-1/2"></div>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={400}
            height={465}
            className="relative w-[8rem] sm:w-[15rem] md:w-[19rem] lg:w-[25rem] h-full object-cover rounded-r-[50%]"
          />
        </div>

        <div className="w-1/2 sm:w-3/5 md:w-2/4 lg:w-2/3 flex flex-col justify-center items-start lg:ps-[10rem] xl:ps-[5rem] relative z-10">
          <h4 className="text-white text-xs sm:text-2xl lg:text-[2.5rem] font-bold mb-[1rem] md:mb-[2rem] text-left">
            {solution.discover.title}
          </h4>
          <CTAButton title={solution.discover.button} link={link} color="blue" className="text-[0.5rem] sm:text-xl lg:text-2xl px-[0.5rem] sm:px-[1rem] lg:px-[1.5rem] py-[0.25rem] sm:py-[0.5rem] lg:py-[0.75rem]"/>
        </div>
      </div>
    </section>
  );
};

export default DiscoverSection;
