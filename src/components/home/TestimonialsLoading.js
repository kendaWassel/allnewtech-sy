const TestimonialsLoading = () => {
    return (
        <section className="relative lg:py-[8rem] py-[4rem]">
            <h2 className='sr-only'>Testimonials</h2>
            <div className="relative flex items-center bg-[var(--secondary)] w-full lg:h-[365px] md:h-[250px] h-[187px]">
                <div className="w-full flex items-center justify-center px-4">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-15 h-15 bg-gray-300 rounded-full animate-pulse"></div>
                        <div className="flex gap-2">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
                            ))}
                        </div>
                        <div className="w-3/4 h-4 bg-gray-300 rounded animate-pulse"></div>
                        <div className="w-2/3 h-4 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsLoading;


