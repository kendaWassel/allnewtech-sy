const ProjectDetailLoading = () => {
  return (
    <section className="py-[3rem] lg:py-[4rem]">
      <div className="px-[var(--small-padding)] lg:px-[var(--inline-padding)]">
        {/* Top Section Skeleton */}
        <div className="flex flex-col lg:flex-row gap-[2rem] lg:gap-[3rem] mb-[3rem]">
          {/* Left: Hero Image */}
          <div className="lg:w-1/2">
            <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="flex gap-2">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Right: Title and Description */}
          <div className="lg:w-1/2">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
          </div>
        </div>

        {/* Bottom Section Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[3rem] lg:gap-[4rem]">
          <div>
            <div className="h-8 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>
          </div>
          <div>
            <div className="h-8 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetailLoading;

