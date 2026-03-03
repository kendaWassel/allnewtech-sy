import CTAButton from "../ui/CTAButton"
import Image from "next/image"
import { apiConfig, getApiUrl, getImageUrl } from '@/config/api';

const LatestNews = async () => {
    let news = [];
    let error = null;

    try {
        const url = getApiUrl(apiConfig.endpoints.latestNews);
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
        
        news = data.data.map((item) => {
            const content = item.content || '';
            const truncatedContent = content.length > 150 
                ? content.slice(0, 150) + '...' 
                : content;

            return {
                id: item.id,
                title: item.title || '',
                description: truncatedContent,
                cta: "Read More",
                src: getImageUrl(item.image || ''),
                imageAlt: item.title || 'News article image',
                link: `/latest-news/${item.id}`,
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
            <h2 className="font-bold lg:text-5xl text-2xl lg:text-start text-center">Latest News</h2>
            <div className="lg:border-l-[4px] lg:border-[var(--secondary)] lg:mt-[3rem] mt-[1rem] lg:ms-[3rem] lg:ps-[4.5rem] lg:py-[1rem]">
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
                    <div key={item.id} className="flex lg:flex-row flex-col lg:items-start items-center lg:gap-[3rem] gap-[1rem] lg:mb-[3rem] mb-[1rem]">
                        <div className="flex-4 lg:order-1 order-2 flex flex-col lg:items-start items-center lg:text-start text-center lg:pt-[1rem]">
                            <h4 className="font-bold lg:text-2xl lg:px-0 px-[3rem]">{item.title}</h4>
                            <p className="lg:text-2xl my-[1rem] lg:w-[90%] lg:px-0 px-[var(--small-padding)] leading-[1.2]">{item.description}</p>
                            <CTAButton title={item.cta} link={item.link} color="blue" className="lg:text-[1rem] text-[0.75rem]" />
                        </div>
                        <div className="sm:p-0 relative w-[376px] h-[221px] lg:w-[376px] lg:h-[221px] md:w-[300px] md:h-[176px] sm:w-[250px] sm:h-[147px] w-full aspect-[376/221]">
                            <Image 
                                src={item.src} 
                                alt={item.imageAlt} 
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 250px, (max-width: 1024px) 300px, 376px"
                                className="object-cover rounded"
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
