const TestimonialsLoading = () => {
    return (
        <section className="relative lg:py-[8rem] py-[4rem]">
            <h2 className='sr-only'>Testimonials</h2>
            <div className="relative flex items-center w-full h-[187px] bg-[var(--secondary)] md:h-auto md:bg-[#efefef]">
                <div className="w-full px-4 md:hidden">
                    <div className="flex items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-[60px] w-[60px] animate-pulse rounded-full bg-gray-300"></div>
                            <div className="flex gap-2">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-8 w-8 animate-pulse rounded bg-gray-300"></div>
                                ))}
                            </div>
                            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-300"></div>
                            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-300"></div>
                        </div>
                    </div>
                </div>

                <div className="hidden w-full px-6 py-[3rem] md:block lg:px-10">
                    <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(260px,1fr))] items-stretch justify-items-center gap-6 lg:gap-8">
                        {[...Array(3)].map((_, cardIndex) => (
                            <div key={cardIndex} className="relative flex h-auto w-full max-w-[400px] flex-col rounded-[48px] bg-[var(--secondary)] px-[3.5rem] pb-[3rem] pt-[7.5rem]">
                                <div className="absolute left-1/2 top-0 flex h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white">
                                    <div className="h-[150px] w-[150px] animate-pulse rounded-full bg-[#D9D9D9]"></div>
                                </div>

                                <div className="mb-[1.5rem] flex justify-center gap-[6px]">
                                    {[...Array(5)].map((_, starIndex) => (
                                        <div
                                            key={`${cardIndex}-${starIndex}`}
                                            className="h-[30px] w-[30px] animate-pulse rounded-[8px] bg-gray-400"
                                        ></div>
                                    ))}
                                </div>

                                <div className="space-y-3">
                                    <div className="h-6 w-full animate-pulse rounded bg-gray-400"></div>
                                    <div className="h-6 w-full animate-pulse rounded bg-gray-400"></div>
                                    <div className="h-6 w-[90%] animate-pulse rounded bg-gray-400"></div>
                                    <div className="h-6 w-[92%] animate-pulse rounded bg-gray-400"></div>
                                    <div className="h-6 w-[84%] animate-pulse rounded bg-gray-400"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsLoading;


