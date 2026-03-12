'use client';
import Image from 'next/image';

const TestimonialsCarouselDesktop = ({ testimonials }) => {
  const renderStars = (rating) => {
    const normalizedRating = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));

    return Array.from({ length: 5 }, (_, index) => (
      <div
        key={index}
        className={`p-[0.4rem] rounded-[8px] ${index < normalizedRating ? 'bg-[var(--yellow)]' : 'bg-[#989898]'}`}
      >
        <Image
          src="/Star.svg"
          alt=""
          aria-hidden="true"
          width={50}
          height={50}
          sizes="23px"
          className="h-[23px] w-[23px]"
        />
      </div>
    ));
  };

  const desktopTestimonials = testimonials.slice(0, 3);

  return (
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(400px,1fr))] items-stretch justify-items-center gap-6 lg:gap-x-[1rem] gap-y-[7rem] px-[6rem]">
        {desktopTestimonials.map((testimonial, index) => (
          <article
            key={`desktop-${testimonial.id}-${index}`}
            itemScope
            itemType="https://schema.org/Review"
            className="relative flex h-auto w-full max-w-[400px] flex-col rounded-[48px] bg-[var(--secondary)] px-[3.5rem] pb-[3rem] pt-[7.5rem]"
          >
            <div className="absolute left-1/2 top-0 flex h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white">
              <div className="relative h-full w-full rounded-full flex items-center justify-center">
                {testimonial.image ? (
                  <Image
                    src={testimonial.image}
                    alt="Customer testimonial"
                    width={100}
                    height={100}
                    sizes="153px"
                    className="object-cover w-[90%] h-[90%] rounded-full"
                  />
                ) : (
                  <>
                    <span className="absolute left-1/2 top-[14px] h-[20px] w-[20px] -translate-x-1/2 rounded-full bg-[#c9c9c9]" aria-hidden="true" />
                    <span className="absolute left-1/2 bottom-0 h-[38px] w-[50px] -translate-x-1/2 rounded-t-[999px] bg-[#c9c9c9]" aria-hidden="true" />
                  </>
                )}
              </div>
            </div>

            <div
              className="mb-[1.5rem] flex gap-[6px] justify-center"
              itemProp="reviewRating"
              itemScope
              itemType="https://schema.org/Rating"
              role="img"
              aria-label={`Rating: ${testimonial.rating} out of 5 stars`}
            >
              <meta itemProp="ratingValue" content={String(testimonial.rating)} />
              <meta itemProp="bestRating" content="5" />
              {renderStars(testimonial.rating)}
            </div>

            <p className="text-start text-2xl text-white" itemProp="reviewBody">
              {testimonial.text}
            </p>

            <span itemProp="author" itemScope itemType="https://schema.org/Person" className="sr-only">
              <span itemProp="name">Customer</span>
            </span>
          </article>
        ))}
      </div>
  );
};

export default TestimonialsCarouselDesktop;
