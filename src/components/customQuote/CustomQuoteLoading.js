const CustomQuoteLoading = () => {
  return (
    <section className="lg:py-[6rem] pb-[3.75rem] xl:px-[15rem] lg:px-[7rem] px-[var(--small-padding)]">
      <div className="flex gap-[3rem] mb-[3rem]">
        <div className="w-full">
          <div className="h-10 bg-gray-200 rounded w-64 mb-8 mx-auto animate-pulse"></div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomQuoteLoading;

