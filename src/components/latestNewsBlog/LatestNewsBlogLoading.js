const LatestNewsBlogLoading = () => {
  return (
    <section className="py-[3rem] lg:py-[4rem]">
      <div className="px-[var(--small-padding)] lg:px-[var(--inline-padding)]">
        <div className="flex flex-col lg:flex-row gap-[2rem] lg:gap-[3rem]">
          <div className="lg:w-3/5">
            <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] bg-gray-200 rounded animate-pulse mb-4"></div>
          </div>
          <div className="lg:w-2/5">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestNewsBlogLoading;
