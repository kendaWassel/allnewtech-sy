const ProjectsLoading = () => {
    return (
        <section className="py-[1.5rem] md:py-[3rem]">
            <div className="font-bold lg:ps-[var(--inline-padding)] lg:text-start text-center text-2xl lg:text-5xl mb-[1.5rem] lg:mb-[3rem]">
                <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto lg:mx-0 animate-pulse"></div>
            </div>
            <div className="grid grid-cols-3 gap-2 md:gap-6 bg-[var(--white)]">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="relative aspect-[4/3] w-full overflow-hidden">
                        <div className="w-full h-full bg-gray-200 rounded animate-pulse"></div>
                    </div>
                ))}
            </div>
            <div className="mx-auto w-fit py-[1.5rem] lg:py-[3rem]">
                <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
        </section>
    );
};

export default ProjectsLoading;

