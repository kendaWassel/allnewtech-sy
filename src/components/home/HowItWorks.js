import Image from "next/image";

const HowItWorks = ({ content, locale = "en" }) => {
  if (!content) return null;

  const steps = content.steps;
  const stepLabel = content.stepLabel;

  const formatStepNumber = (value) => {
    const digits = String(value).match(/\d+/)?.[0];
    if (!digits) return value;
    const localeTag = locale.startsWith('ar') ? 'ar-u-nu-arab' : 'en';
    return new Intl.NumberFormat(localeTag).format(Number(digits));
  };

  return (
    <section className="py-[3rem] md:py-[16rem]">
      <h2 className="md:hidden mb-[2rem] text-center text-2xl font-bold lg:text-5xl">
        {content.title}
      </h2>
      <div className="px-[var(--small-padding)] lg:px-[var(--inline-padding)]">
        <div className="md:hidden">
          {steps.map((step, index) => {
            const widthPercentage = Number.parseInt(step.number, 10) * 20;
            const displayNumber = formatStepNumber(index + 1);

            return (
              <div
                key={`${step.number}-${index}`}
                className="mb-[3rem] flex flex-col gap-[1.5rem] last:mb-0"
              >
                <div className="relative w-full px-[0.5rem]">
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={`/home/step-${step.number}.svg`}
                      alt={step.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 0px, 100vw"
                    />
                  </div>

                  <span
                    className="block h-[9px] bg-[var(--secondary)]"
                    style={{ width: `${widthPercentage}%` }}
                  />
                </div>

                <div className="text-start">
                  <h4 className="mb-[1rem] text-2xl font-bold">
                    {stepLabel} {displayNumber}: {step.title}
                  </h4>
                  <p className="max-w-[90%]">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="relative mx-auto hidden max-w-[1200px] lg:px-[3rem] px-[2rem] md:block">
          <span className="pointer-events-none absolute top-[1rem] bottom-0 left-1/2 w-[3px] -translate-x-1/2 bg-[var(--secondary)]" />
          <div className="space-y-[4.5rem]">
            {steps.map((step, index) => {
              const isRight = index % 2 === 0;
              const displayNumber = formatStepNumber(step.number);
              return (
                <div key={`${step.number}-${index}`} className="group relative md:flex">
                  <span
                    className={`absolute z-11 top-[1rem] h-[3px] bg-[var(--secondary)] ${isRight ? "start-1/2 w-[3.5rem]" : "end-1/2 w-[3.5rem]"}`}
                  />
                  <div className="hidden md:group-first:block relative w-1/2 mt-[1.5rem] h-[fit-content]">
                    <h2 className="text-center font-bold text-2xl lg:text-4xl xl:text-5xl text-white relative z-2">
                      {content.title}
                    </h2>
                    <Image
                      src='/home/how-it-works.svg'
                      alt="blue shape"
                      width={100}
                      height={100}
                      sizes="(max-width: 767px) 0px, 46vw"
                      className="absolute top-1/2 -translate-y-1/2 z-1 w-[95%] start-[-1rem]"
                    />
                  </div>
                  <div
                    className={`relative w-full md:w-1/2 after:absolute after:bg-[var(--secondary)] after:w-[1rem] after:h-[1rem] after:top-[0.55rem] after:rounded-full ${isRight ? "md:ms-[auto] md:ps-[5rem] after:start-[3rem]" : "md:pe-[3.5rem] after:hidden"} group-last:before:absolute group-last:before:top-[calc(1rem_+_3px)] group-last:before:h-full group-last:before:w-[2rem] group-last:before:start-[-0.5rem] group-last:before:bg-white group-last:before:z-10`}
                  >
                    <div className="flex gap-[1.5rem]">
                      <h4 className="text-[2rem] leading-tight font-bold">
                        {stepLabel} {displayNumber}: {step.title}
                      </h4>

                      {!isRight ? (
                        <>
                          <div
                            className="relative top-[1rem] h-[3px] min-w-[1rem] flex-1 bg-[var(--secondary)]"
                          >
                            <span className="absolute top-[-0.4rem] start-[-0.5rem] h-[1rem] w-[1rem] rounded-full bg-[var(--secondary)]" />
                          </div>
                        </>
                      ) : null}
                    </div>

                    <p className="my-[1.5rem] max-w-[32rem] text-2xl leading-[1.35] ">
                      {step.description}
                    </p>

                    <div className="relative aspect-[16/8] w-full overflow-hidden rounded-[24px] shadow-[0_12px_22px_#00000038]">
                      <Image
                        src={`/home/step-${step.number}.jpg`}
                        alt={step.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 767px) 0px, 50vw"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
