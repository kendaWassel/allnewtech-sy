'use client';
import { useEffect, useRef, useState } from 'react';
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
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleChange = (event) => setIsDesktop(event.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return undefined;
    }

    if (!('IntersectionObserver' in window)) {
      const rafId = window.requestAnimationFrame(() => {
        setShouldLoad(true);
      });

      return () => {
        window.cancelAnimationFrame(rafId);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '280px 0px',
        threshold: 0.01,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const ActiveTestimonials = isDesktop ? TestimonialsCarouselDesktop : TestimonialsCarouselMobile;

  return (
    <div ref={containerRef} className="h-full w-full">
      {shouldLoad ? (
        <ActiveTestimonials testimonials={testimonials} />
      ) : (
        <div aria-hidden="true" className="h-full w-full md:min-h-[330px]" />
      )}
    </div>
  );
};

export default TestimonialsCarousel;
