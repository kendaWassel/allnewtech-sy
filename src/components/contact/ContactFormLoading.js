const ContactFormLoading = () => {
  return (
    <section className="lg:py-[6rem] lg:px-[var(--inline-padding)] px-[var(--small-padding)] py-[3rem]">
      {/* Top Section: Image + Form (Desktop) / Image + Map (Mobile) */}
      <div className="flex flex-col lg:flex-row gap-[2rem] lg:gap-[3rem] mb-[2rem] lg:mb-[3rem]">
        {/* Image Section */}
        <div className="lg:w-1/2 w-1/2 lg:order-1 order-1">
          <div className="w-full h-[300px] lg:h-[500px] bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Map Section - Mobile: Right side of image */}
        <div className="lg:hidden w-1/2 order-2">
          <div className="w-full h-[300px] bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Form Section - Desktop: Right side, Mobile: Below */}
        <div className="lg:w-1/2 w-full lg:order-2 order-3">
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
            
            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Email */}
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>

            {/* Phone */}
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>

            {/* Service Interest and Property Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Message */}
            <div className="h-32 bg-gray-200 rounded animate-pulse"></div>

            {/* Submit Button */}
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Map Section - Desktop: Full width below */}
      <div className="hidden lg:block w-full">
        <div className="w-full h-[400px] bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </section>
  );
};

export default ContactFormLoading;

