'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import User from '../ui/User';

const TestimonialsCarousel = ({ testimonials }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Image
        key={index}
        src="/Star.svg"
        alt=""
        aria-hidden="true"
        width={50}
        height={50}
        className={`lg:w-[50px] lg:h-[50px] md:w-[20px] md:h-[20px] w-[15px] h-[15px] lg:p-[0.5rem] p-[0.1rem] lg:rounded-[8px] rounded-[4px] ${index < rating ? 'bg-[var(--yellow)]' : 'bg-[#989898]'}`}
      />
    ));
  };

  return (
    <>
      {/* Left Navigation Arrow */}
      <button
        className="z-120 absolute lg:left-5 left-[6px] top-1/2 -translate-y-1/2 
          lg:w-[40px] lg:h-[55px] w-[24px] h-[32px]
          shadow-[0px_3px_3px_#00000040] bg-[var(--primary-blue-second)] 
          flex items-center justify-center hover:bg-[var(--primary-blue-second)] hover:cursor-pointer transition 
          swiper-button-prev-custom"
        aria-label="Previous testimonial"
      >
        <Image
          src="/icons/arrow.svg"
          alt="Previous"
          width={12}
          height={11}
          className="rotate-180 lg:w-[12px] lg:h-[11px] w-[8px] h-[15px]"
        />
      </button>
      {/* blue shape  */}
      <div className="md:block hidden absolute right-0 lg:top-[90px] top-[60px] z-110">
        <Image src="/icons/blue-shape.svg" alt="blue shape" width={355} height={400} className='lg:w-[355px] lg:h-[400px] w-[250px]' />
      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={testimonials.length > 1}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        aria-roledescription="carousel"
        aria-label="Customer testimonials"
        className="w-full h-full !z-[110]"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id} role="group" aria-roledescription="slide" aria-label="Customer testimonial">
            <article
              itemScope
              itemType="https://schema.org/Review"
              className="lg:px-[var(--inline-padding)] px-[var(--small-padding)] flex items-center relative z-100 h-full"
              aria-live="polite"
            >
              <div className="absolute xl:w-[30rem] xl:h-[30rem] lg:w-[25rem] lg:h-[25rem] md:w-[20rem] md:h-[20rem] sm:w-[10rem] sm:h-[10rem] w-[6rem] h-[6rem] bg-white lg:left-[10%] sm:left-[3rem] left-[2rem] rounded-full flex items-center justify-center overflow-hidden">
                <User imageUrl={testimonial.image} alt="Customer testimonial" />
              </div>
              <div className="md:flex-1 sm:flex-3 flex-2" aria-hidden="true" />
              <div className="md:flex-1 sm:flex-5 flex-3">
                <div
                  className="flex lg:gap-3 gap-1 lg:mb-[2rem] md:mb-[1rem] mb-[0.5rem] lg:mt-[3rem] md:mt-0 mt-[1.5rem]"
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
                <div className="md:w-[75%] w-[95%]">
                  <p className="text-white lg:text-2xl md:text-[1rem] text-[0.75rem] leading-[1.2] mb-6" itemProp="reviewBody">
                    {testimonial.text}
                  </p>
                </div>
                <span itemProp="author" itemScope itemType="https://schema.org/Person" className="sr-only">
                  <span itemProp="name">Customer</span>
                </span>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Right Navigation Arrow */}
      <button
        className="absolute z-120 lg:right-5 right-[6px] top-1/2 -translate-y-1/2 
          lg:w-[40px] lg:h-[55px] w-[24px] h-[32px]
          shadow-[0px_3px_3px_#00000040] md:bg-[var(--secondary)] bg-[var(--primary-blue-second)] 
          flex items-center justify-center hover:bg-[var(--primary-blue-second)] hover:cursor-pointer transition-colors 
          swiper-button-next-custom"
        aria-label="Next testimonial"
      >
        <Image
          src="/icons/arrow.svg"
          alt="Next"
          width={12}
          height={11}
          className='lg:w-[12px] lg:h-[11px] w-[8px] h-[15px]'
        />
      </button>
    </>
  );
};

export default TestimonialsCarousel;


