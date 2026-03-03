import { apiConfig, getApiUrl, getImageUrl } from '@/config/api';
import TestimonialsCarousel from './TestimonialsCarousel';

const Testimonials = async () => {
  let testimonials = [];
  let error = null;

  try {
    const url = getApiUrl(apiConfig.endpoints.reviews);
    const response = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.msg || 'API request was not successful');
    }
    
    testimonials = data.data.map((review) => ({
      id: review.id,
      rating: review.rating || 5,
      text: review.description || '',
      image: getImageUrl(review.user_image || '') || null,
      createdAt: review.created_at,
      updatedAt: review.updated_at,
    }));
  } catch (err) {
    error = err.message || 'Failed to load testimonials. Please try again later.';
    testimonials = [];
  }

  return (
    <section className="relative lg:py-[8rem] py-[4rem]">
      <h2 className='sr-only'>Testimonials</h2>
      <div className="relative flex items-center bg-[var(--secondary)] w-full lg:h-[365px] md:h-[250px] h-[187px]">
        {error ? (
          <div className="w-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-white text-center lg:text-xl md:text-lg text-base px-4 mb-2">
                Unable to load testimonials
              </p>
              <p className="text-white/80 text-center lg:text-lg md:text-base text-sm px-4">
                Try again!
              </p>
            </div>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="w-full flex items-center justify-center">
            <p className="text-white text-center lg:text-xl md:text-lg text-base px-4">
              No testimonials available at the moment. Check back soon!
            </p>
          </div>
        ) : (
          <TestimonialsCarousel testimonials={testimonials} />
        )}
      </div>
    </section>
  );
};

export default Testimonials;
