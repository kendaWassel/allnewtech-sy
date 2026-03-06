import { Suspense } from "react";
import CustomQuote from "@/components/customQuote/CustomQuote";
import CustomQuoteLoading from "@/components/customQuote/CustomQuoteLoading";
import FormIntroHero from "@/components/layout/FormIntroHero";
import { siteConfig } from "@/config/site";
import { getContent } from "@/lib/get-content";

export const metadata = {
  title: "Get Custom Quote",
  description:
    "Get in touch with All New Tech for a free site survey or custom quote. Professional security and technology solutions across the UK.",
  keywords: [
    "contact all new tech",
    "book site visit",
    "request quote",
    "security consultation",
    "CCTV quote",
    "free site survey",
    "security installation quote",
  ],
  openGraph: {
    title: "Custom Quote",
    description:
      "Schedule a professional site assessment or request a tailored quote for your security and technology needs.",
    url: `${siteConfig.baseUrl}/custom-quote`,
  },
  alternates: {
    canonical: `${siteConfig.baseUrl}/custom-quote`,
  },
};


export default async function CustomQuotePage({ params }) {
  const { locale } = await params;
  const content = await getContent(locale, "contact");

  return (
    <main>
      <FormIntroHero
        title={content?.quoteRequest?.intro}
        imageSrc="/quote-hero.svg"
      />
      <Suspense fallback={<CustomQuoteLoading />}>
        <CustomQuote content={content} locale={locale} />
      </Suspense>
    </main>
  );
}
