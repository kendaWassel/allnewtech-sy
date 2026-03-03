const BrandsLoading = ({className}) => {
    return (
        <section className={`py-[3rem] ${className}`}>
            <h2 className="sr-only">Trusted Security Technology Brands</h2>
            <div className="flex items-center justify-center bg-[#F2F3F4] sm:h-[170px] h-[70px] sm:px-[var(--inline-padding)] px-[var(--small-padding)]">
                <div className="flex items-center gap-[1.5rem]">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="relative sm:w-[140px] w-[50px] sm:h-[90px] h-[45px]">
                            <div className="w-full h-full bg-gray-300 rounded animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandsLoading;

