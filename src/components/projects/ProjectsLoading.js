const ProjectsLoading = () => {
  return (
    <section className="py-[3rem] lg:py-[4rem]">
      <div className="px-[3.75rem] md:px-[9.5rem]">
        {/* Filters skeleton */}
        <div className="flex items-center gap-[3rem] mb-[3rem]">
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>

        {/* Cards skeleton */}
        <div className="grid gap-[1.5rem] md:gap-[2rem] lg:grid-cols-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white shadow-[0_12px_30px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col"
            >
              <div className="h-[165px] md:h-[300px] bg-gray-200 animate-pulse"></div>
              <div className="flex flex-col flex-1 px-[1.5rem] py-[0.75rem] md:px-[2rem] md:py-[1.5rem]">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-4 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded w-24 ml-auto animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsLoading;

