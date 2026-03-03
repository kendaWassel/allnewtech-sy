import Image from 'next/image';
import about from '@/content/about';
import ChooseUsReason from '../ui/ChooseUsReason';
const ChooseUs = () => {
  const { title, points } = about.whyChooseUs;

  // Map points by title so we can control layout order
  const byTitle = (t) => points.find((p) => p.title === t) || { title: t, description: '' };

  const aftercare = byTitle('Aftercare Support');
  const experienced = byTitle('Experienced Technicians');
  const products = byTitle('High-Quality Products');
  const tailored = byTitle('Tailored Solutions');

  // Mobile order (top to bottom) as in second reference
  const mobileItems = [aftercare, experienced, tailored, products];

  return (
    <section className="py-[4rem] lg:py-[6rem]">
      <div className="mx-auto pl-[3rem] pr-[3.75rem] lg:px-[var(--inline-padding)]">
        <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-[1.25rem] lg:mb-[3rem]">
          {title}
        </h2>

        {/* Desktop / large layout - grid-based, cleaner lines */}
        <div className="hidden md:block">
          <div className="mx-[aut] lg:px-[5rem]">
            <div className="grid grid-cols-[minmax(0,1.3fr)_auto_minmax(0,1.3fr)] grid-rows-3 gap-y-16 lg:gap-y-20 items-center">
              {/* Top-left */}
              <div className="relative flex flex-col items-start gap-1 lg:w-[95%]">
                <ChooseUsReason title={aftercare.title} description={aftercare.description}/>
              </div>

              {/* Center icon (row 1 & 2) */}
              <div className="relative row-span-3 flex flex-col items-center justify-center relative lg:mx-[3rem]">
                  {/* top left arrow */}
                  <div className='absolute border-[var(--secondary)] w-[165px] h-[102px] border-b-[3px] border-l-[3px] left-[-160px] lg:top-[10px] md:top-[-20px]'>
                   <span className='absolute w-[12px] h-[12px] left-[-7px] rotate-[-45deg] border-[var(--secondary)] border-t-[3px] border-r-[3px] '></span>
                  </div>
                  {/* top right arrow */}
                  <div className='absolute border-[var(--secondary)] w-[165px] h-[102px] border-b-[3px] border-r-[3px] right-[-160px] lg:top-[10px] md:top-[-20px]'>
                   <span className='absolute w-[12px] h-[12px] right-[-7px] rotate-[-45deg] border-[var(--secondary)] border-t-[3px] border-r-[3px] '></span>
                  </div>
                  {/* bottom left arrow */}
                  <div className='absolute border-[var(--secondary)] w-[165px] h-[102px] border-t-[3px] border-l-[3px] left-[-165px] top-[50%]'>
                   <span className='absolute w-[12px] h-[12px] left-[-7px] bottom-0 rotate-[135deg] border-[var(--secondary)] border-t-[3px] border-r-[3px] '></span>
                  </div>
                  {/* bottom right arrow */}
                  <div className='absolute border-[var(--secondary)] w-[165px] h-[102px] border-t-[3px] border-r-[3px] right-[-165px] top-[50%]'>
                   <span className='absolute w-[12px] h-[12px] right-[-7px] bottom-0 rotate-[135deg] border-[var(--secondary)] border-t-[3px] border-r-[3px] '></span>
                  </div>

                <div className="w-[220px] h-[220px] lg:w-[305px] lg:h-[305px] rounded-full border-[8px] border-[var(--primary-blue-first)] bg-white flex items-center justify-center shadow-sm">
                  <div className="w-[96px] h-[96px] md:w-[150px] md:h-[150px] lg:w-[225px] lg:h-[225px] rounded-[24px] flex items-center justify-center">
                    <Image
                      src="/icons/LockSimple.svg"
                      alt="Security lock icon"
                      width={225}
                      height={225}
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>

              {/* Top-right */}
              <div className="relative flex flex-col items-start gap-1 lg:w-[100%]">
                <ChooseUsReason title={experienced.title} description={experienced.description}/>
              </div>
              {/* empty div  */}
            <div></div>
    {/* empty div  */}
            <div></div>
              {/* Bottom-left */}
              <div className="relative flex flex-col items-start gap-1 lg:w-[95%]">
                <ChooseUsReason title={products.title} description={products.description}/>
              </div>
              {/* Bottom-right */}
              <div className="relative flex flex-col items-start gap-1 lg:w-[95%]">
                <ChooseUsReason title={tailored.title} description={tailored.description}/>
              </div>

            </div>
          </div>
        </div>

        {/* Mobile / small layout */}
        <div className="md:hidden">
          <div className="relative">
            {/* Lock circle - centered at top */}
            <div className="flex justify-start mb-0">
              <div className="relative w-[131px] h-[131px] rounded-full border-[8px] border-[var(--primary-blue-first)] bg-white flex items-center justify-center">
                <div className="w-[97px] h-[97px] rounded-[20px] flex items-center justify-center">
                  <Image
                    src="/icons/LockSimple.svg"
                    alt="Security lock icon"
                    width={97}
                    height={97}
                    className="w-[97px] h-[97px]"
                  />
                </div>
              </div>
            </div>

            {/* Vertical timeline container */}
            <div className="relative flex">
              {/* Main vertical line */}
              {/* the height will bring it right to the horizontal line  */}
              {/* left is 65.5px so it can be at the center of the lock photo (its width 131px) */}
              <div className="absolute h-[calc(100%_-_20px)] left-[65.5px] -translate-x-1/2 top-0 bottom-0 w-[3px] bg-[var(--secondary)]" aria-hidden="true" />

              {/* Timeline items */}
              {/* margin is the width of the photo (131px) minus the space i want it to be (31px) */}
              <div className="w-full ml-[100px] pt-4">
                {mobileItems.map((item, index) => (
                  <div key={item.title || index} className="relative mb-[1.5rem] last:mb-0">
                    {/* left space of the horizontal line is the margin 100 - the left of the main line 65.5 == 34.5   */}
                    {/* the bottom space will bring the horizontal line to the vertical line  */}
                    <div className="absolute left-[-34.5px] bottom-[20px] flex items-center">
                      {/* horizontal line */}
                      <div 
                        className="w-[2rem] h-[3px] bg-[var(--secondary)]"
                        aria-hidden="true"
                      />
                      {/* arrow  */}
                   <span className='absolute w-[12px] h-[12px] right-0 rotate-[45deg] border-[var(--secondary)] border-t-[3px] border-r-[3px] '></span>

                    </div>

                    {/* Text content */}
                    <div className="ml-2 sm:text-sm text-xs">
                      <h3 className="font-bold text-[var(--secondary)]">
                        {item.title}:
                      </h3>
                      <p className="leading-relaxed text-[#333]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;