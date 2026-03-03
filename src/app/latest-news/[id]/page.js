import { Suspense } from "react";
import LatestNewsBlog from "@/components/latestNewsBlog/LatestNewsBlog";
import LatestNewsBlogLoading from "@/components/latestNewsBlog/LatestNewsBlogLoading";
import CTA from "@/components/services/ServicesCTA";
import { apiConfig, getApiUrl } from "@/config/api";
import { siteConfig } from "@/config/site";

export async function generateMetadata({ params }) {
  const { id } = await params;
  let title = "Latest News";
  let description =
    "Read the latest news and updates from All New Tech on security and technology solutions.";

  try {
    const res = await fetch(getApiUrl(`${apiConfig.endpoints.latestNews}/${id}`), {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    if (data?.success && data?.data) {
      title = data.data.title || title;
      const content = data.data.content || "";
      description =
        content.length > 160 ? `${content.slice(0, 157)}...` : content || description;
    }
  } catch {
  }

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Latest News`,
      description,
      url: `${siteConfig.baseUrl}/latest-news/${id}`,
    },
    alternates: {
      canonical: `${siteConfig.baseUrl}/latest-news/${id}`,
    },
  };
}

export default async function LatestNewsBlogPage({ params }) {
  const { id } = await params;
  return (
    <main>
      <Suspense fallback={<LatestNewsBlogLoading />}>
        <LatestNewsBlog newsId={id} />
      </Suspense>
      <CTA className="lg:!mx-[6rem] lg:!w-[50%] !mt-0 !mb-[7rem]" />
    </main>
  );
}
