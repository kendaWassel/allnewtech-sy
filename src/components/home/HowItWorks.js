import home from '@/content/homepage';
import Image from 'next/image';

const HowItWorks = () => {
  const steps = home.howItWorks.steps;

  return (
    <section className="py-[3rem]">
      <h2 className="font-bold md:ps-[var(--inline-padding)] md:text-start text-center text-2xl lg:text-5xl mb-[2rem]">
        {home.howItWorks.title}
      </h2>

      <div className="md:ps-[var(--inline-padding)] px-[var(--small-padding)]">
        {steps.map((step, index) => {
          const widthPercentage = parseInt(step.number) * 20;

          return (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center gap-[1.5rem] lg:gap-[6rem] lg:mb-[8rem] mb-[3rem]"
            >
              <div className="relative w-full md:w-[37%] md:px-0 px-[0.5rem]">
                {/* Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={`/home/step-${step.number}.svg`}
                    alt={step.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 482px) 100vw, 45vw"
                  />
                </div>

                {/* Line under image - mobile */}
                <span
                  className="block md:hidden h-[9px] bg-[var(--secondary)]"
                  style={{ width: `${widthPercentage}%` }}
                />

                {/* Line on the right - desktop */}
                <span
                  className="hidden md:block absolute top-0 left-full ml-[1.5rem] lg:ml-[6rem] lg:h-[18px] h-[9px] bg-[var(--secondary)]"
                  style={{ width: `${widthPercentage}%` }}
                />
              </div>


              {/* Text */}
              <div className="flex-1">
                <h4 className="font-bold xl:mb-[1.5rem] md:mb-[0.5rem] mb-[1rem] text-2xl md:text-xl lg:text-2xl xl:text-[2rem]">
                  Step {step.number}: {step.title}
                </h4>
                <p className="xl:text-2xl lg:text-xl md:max-w-[70%] max-w-[90%]">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
