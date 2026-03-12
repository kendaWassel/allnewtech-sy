const HowItWorksLoading = () => {
  return (
    <section className="py-[3rem] md:py-[16rem]">
      <div className="px-[var(--small-padding)] lg:px-[var(--inline-padding)]">
        <div className="md:hidden space-y-[2rem]">
          <div className="h-8 w-1/2 mx-auto bg-gray-200 rounded animate-pulse"></div>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex flex-col gap-[1.5rem]">
              <div className="w-full aspect-[16/9] bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        <div className="hidden md:block">
          <div className="h-10 w-1/3 mx-auto bg-gray-200 rounded animate-pulse mb-[2.5rem]"></div>
          <div className="space-y-[4.5rem]">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-[2.5rem] items-start">
                <div className="h-[240px] rounded-[24px] bg-gray-200 animate-pulse"></div>
                <div className="space-y-3">
                  <div className="h-8 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksLoading;
