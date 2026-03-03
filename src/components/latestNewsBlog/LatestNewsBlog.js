import { apiConfig, getApiUrl } from '@/config/api';
import LatestNewsBlogClient from './LatestNewsBlogClient';

const LatestNewsBlog = async ({ newsId }) => {
  let news = null;

  try {
    const url = getApiUrl(`${apiConfig.endpoints.latestNews}/${newsId}`);
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
    news = {
      id: data.data?.id,
      title: data.data?.title || '',
      content: data.data?.content || '',
      image: data.data?.image || '',
    };
  } catch (err) {
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
