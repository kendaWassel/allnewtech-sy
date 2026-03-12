import CTAButton from "../ui/CTAButton";
import Image from "next/image";
import { apiConfig, getImageUrl, fetchFromAPI } from '@/config/api';
const LatestNews = async ({ content, locale = "en" }) => {
    let news = [];
    let error = null;
    const readMoreText = content?.readMore ?? "Read More";

    try {
  const data = await fetchFromAPI(apiConfig.endpoints.latestNews, {
    next: { revalidate: 60 },
    headers: { 'Accept-Language': locale },
  });
  news = data.data.map((item) => {
    const itemContent = item.content || '';
    return {
      id: item.id,
      title: item.title || '',
      description: itemContent.length > 150 ? itemContent.slice(0, 150) + '...' : itemContent,
      src: getImageUrl(item.image || ''),
      imageAlt: item.title || 'News article image',
      link: `/${locale}/latest-news/${item.id}`,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    };
  });
} catch (err) {
  error = err.message || 'Failed to load news. Please try again later.';
  news = [];
}

    return (
        <section className="lg:px-[var(--inline-padding)] px-[var(--small-padding)] lg:py-[5rem] py-[5rem]">
            <h2 className="font-bold lg:text-5xl text-2xl lg:text-start text-center">{content?.title ?? "Latest News"}</h2>
            <div className="lg:border-s-[4px] lg:border-[var(--secondary)] lg:mt-[3rem] mt-[1rem] lg:ms-[3rem] lg:ps-[4.5rem] lg:py-[1rem]">
                {error ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="text-center">
                            <p className="lg:text-xl md:text-lg text-base text-red-600 mb-2">
                                Unable to load news
                            </p>
                            <p className="lg:text-lg md:text-base text-sm text-gray-600">
                                Try again!
                            </p>
                        </div>
                    </div>
                ) : news.length === 0 ? (
                    <div className="flex items-center justify-center py-8">
                        <p className="text-center lg:text-xl md:text-lg text-base text-gray-600">
                            No news available at the moment. Check back soon!
                        </p>
                    </div>
                ) : (
                    news.map((item) => (
                    <div key={item.id} className="flex lg:flex-row flex-col lg:items-start items-center lg:gap-[3rem] gap-[1rem] lg:mb-[3rem] mb-[1rem] text-start">
                        <div className="flex-4 lg:order-1 order-2 flex flex-col lg:items-start items-center text-center lg:text-start lg:pt-[1rem]">
                            <h4 className="font-bold lg:text-2xl lg:px-0 px-[3rem]">{item.title}</h4>
                            <p className="lg:text-2xl my-[1rem] lg:w-[90%] lg:px-0 px-[var(--small-padding)] leading-[1.2]">{item.description}</p>
                            <CTAButton title={readMoreText} link={item.link} color="blue" className="lg:text-[1rem] text-[0.75rem]" />
                        </div>
                        <div className="sm:p-0 relative w-[376px] h-[221px] lg:w-[376px] lg:h-[221px] md:w-[300px] md:h-[176px] sm:w-[250px] sm:h-[147px] w-full aspect-[376/221]">
                            <Image 
                                src={item.src} 
                                alt={item.imageAlt} 
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 250px, (max-width: 1024px) 300px, 376px"
                                className="object-cover"
                            />
                        </div>
                    </div>
                    ))
                )}
            </div>
        </section>
    )
}

export default LatestNews
