import { apiConfig, getImageUrl, fetchFromAPI } from '@/config/api';
import LatestNewsBlogClient from './LatestNewsBlogClient';

const LatestNewsBlog = async ({ newsId, locale = "en" }) => {
  let news = null;

  try {
  const data = await fetchFromAPI(`${apiConfig.endpoints.latestNews}/${newsId}`, {
    next: { revalidate: 60 },
    headers: { 'Accept-Language': locale },
  });
  news = {
    id: data.data?.id,
    title: data.data?.title || '',
    content: data.data?.content || '',
    image: getImageUrl(data.data?.image || '') || null,
  };
} catch {
  news = null;
}

  if (!news) {
    return (
      <section className="py-[3rem] lg:py-[4rem]">
        <div className="px-[var(--small-padding)] lg:px-[var(--inline-padding)]">
          <div className="flex items-center justify-center py-12">
            <p className="text-center text-gray-600 text-base md:text-lg">
              News not found or unavailable at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return <LatestNewsBlogClient news={news} />;
};

export default LatestNewsBlog;
