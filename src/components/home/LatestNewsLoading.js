const LatestNewsLoading = () => {
    return (
        <section className="lg:px-[var(--inline-padding)] px-[var(--small-padding)] lg:py-[5rem] py-[5rem]">
            <h2 className="font-bold lg:text-5xl text-2xl lg:text-start text-center">Latest News</h2>
            <div className="lg:border-l-[4px] lg:border-[var(--secondary)] lg:mt-[3rem] mt-[1rem] lg:ms-[3rem] lg:ps-[4.5rem] lg:py-[1rem]">
                <div className="flex lg:flex-row flex-col lg:items-start items-center lg:gap-[3rem] gap-[1rem] lg:mb-[3rem] mb-[1rem]">
                    <div className="flex-4 lg:order-1 order-2 flex flex-col lg:items-start items-center lg:text-start text-center lg:pt-[1rem]">
                        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                        <div className="h-6 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                        <div className="h-6 bg-gray-200 rounded w-5/6 mb-4 animate-pulse"></div>
                        <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
                    </div>
                    <div className="sm:p-0">
                        <div className="w-[300px] h-[221px] bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LatestNewsLoading;

