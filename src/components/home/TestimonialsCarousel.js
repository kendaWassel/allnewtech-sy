'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const TestimonialsCarouselMobile = dynamic(
  () => import('./TestimonialsCarouselMobile'),
  {ssr:false}
);
const TestimonialsCarouselDesktop = dynamic(
  () => import('./TestimonialsCarouselDesktop'),
  {ssr:false}
);

const getInitialIsDesktop = () => {
  if (typeof window === 'undefined') {
    return true;
  }

  return window.matchMedia('(min-width: 768px)').matches;
};

const TestimonialsCarousel = ({ testimonials }) => {
  const [isDesktop, setIsDesktop] = useState(getInitialIsDesktop);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleChange = (event) => setIsDesktop(event.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const ActiveTestimonials = isDesktop ? TestimonialsCarouselDesktop : TestimonialsCarouselMobile;

  return (
    <div className="h-full w-full">
      <ActiveTestimonials testimonials={testimonials} />
    </div>
  );
};

export default TestimonialsCarousel;
