import { Suspense } from 'react';
import FormIntroHero from '@/components/layout/FormIntroHero';
import SiteVisit from '@/components/siteVisit/SiteVisit';
import SiteVisitLoading from '@/components/siteVisit/SiteVisitLoading';
import { siteConfig } from '@/config/site';
import { getContent } from "@/lib/get-content";

export const metadata = {
  title: 'Book A Site Visit',
  description:
    'Book a site visit with All New Tech for a professional assessment and tailored security recommendation.',
  keywords: [
    'book site visit',
    'site survey',
    'security consultation',
    'CCTV site visit',
    'access control assessment',
  ],
  openGraph: {
    title: 'Book A Site Visit',
    description:
      'Schedule a site visit for expert recommendations on your security and technology requirements.',
    url: `${siteConfig.baseUrl}/site-visit`,
  },
  alternates: {
    canonical: `${siteConfig.baseUrl}/site-visit`,
  },
};

export default async function BookSiteVisitPage({ params }) {
  const { locale } = await params;
  const content = await getContent(locale, "contact");

  return (
    <main>
      <FormIntroHero
        title={content?.siteVisit?.intro}
        imageSrc="/site-visit-hero.svg"
        imageAlt="Book a site visit illustration"
      />
      <Suspense fallback={<SiteVisitLoading />}>
        <SiteVisit content={content} locale={locale} />
      </Suspense>
    </main>
  );
}
