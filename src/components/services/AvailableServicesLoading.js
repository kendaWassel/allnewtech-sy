const AvailableServicesLoading = () => {
    return (
        <section className="px-[0.75rem] md:px-[3.75rem] py-8">
            <h2 className="sr-only">Available Services</h2>
            <div className="flex xl:gap-[6.8rem] gap-[4.8rem] relative min-h-screen">
                <div className="hidden lg:block w-[286px] flex-shrink-0">
                    <div className="sticky top-0 bg-[var(--white)] h-screen">
                        <nav className="flex flex-col h-full py-[8rem] px-[1.25rem]">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="py-3">
                                    <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                                </div>
                            ))}
                            <div className="mt-4 py-3">
                                <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                            </div>
                        </nav>
                    </div>
                </div>

                <div className="flex-1 flex flex-col gap-[3rem] md:gap-[4rem]">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="scroll-mt-[100px] flex flex-col items-start gap-[3rem] md:gap-[4rem]">
                            <div className="xl:ml-[8rem] md:ml-[4rem] mx-[auto] w-full sm:w-[21.9rem] md:w-[70%] xl:w-[49.2rem] h-[8.6rem] md:h-[12rem] xl:h-[19.2rem] flex-shrink-0">
                                <div className="w-full h-full bg-gray-200 rounded animate-pulse"></div>
                            </div>
                            <div className="flex-1">
                                <div className="relative flex items-start gap-[1.5rem] md:pl-[6rem] pl-[2.5rem]">
                                    <div className="w-12 h-12 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="flex-1 border-l-[7px] md:border-l-[14px] border-gray-200 pl-[1.5rem] ml-[1.5rem]">
                                        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                                        <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                                        <div className="h-4 bg-gray-200 rounded w-5/6 mb-4 animate-pulse"></div>
                                        <div className="space-y-2">
                                            {[...Array(3)].map((_, j) => (
                                                <div key={j} className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AvailableServicesLoading;

