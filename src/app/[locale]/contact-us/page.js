import { Suspense } from "react";
import ContactForm from "@/components/contact/ContactForm";
import ContactFormLoading from "@/components/contact/ContactFormLoading";
import CTA from "@/components/home/CTA";
import { localeHreflang, locales } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import { getContent } from "@/lib/get-content";

const contactMetadataByLocale = {
  en: {
    title: "Contact Us | All New Tech",
    description: "Get in touch with All New Tech for a free site survey or custom quote. Professional security and technology solutions across the UK.",
    keywords: ["contact all new tech", "book site visit", "request quote", "security consultation", "CCTV quote", "free site survey", "security installation quote"],
    openGraphTitle: "Contact Us | Book Site Visit or Request Quote",
    openGraphDescription: "Schedule a professional site assessment or request a tailored quote for your security and technology needs.",
  },
  ar: {
    title: "تواصل معنا | All New Tech",
    description: "تواصل مع All New Tech لحجز معاينة ميدانية مجانية أو طلب عرض سعر مخصص لحلول الأمن والتقنية في المملكة المتحدة.",
    keywords: ["تواصل معنا", "حجز زيارة ميدانية", "طلب عرض سعر", "استشارة أمنية", "عرض سعر كاميرات مراقبة", "معاينة مجانية", "عرض سعر تركيب أنظمة أمنية"],
    openGraphTitle: "تواصل معنا | احجز زيارة ميدانية أو اطلب عرض سعر",
    openGraphDescription: "احجز تقييمًا ميدانيًا احترافيًا أو اطلب عرض سعر مخصصًا لاحتياجاتك في أنظمة الأمن والتقنية.",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await (params || Promise.resolve({ locale: "en" }));
  const activeLocale = locales.includes(locale) ? locale : "en";
  const metadata = contactMetadataByLocale[activeLocale];
  const pageUrl = `${siteConfig.baseUrl}/${activeLocale}/contact-us`;

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: {
      title: metadata.openGraphTitle,
      description: metadata.openGraphDescription,
      url: pageUrl,
    },
    twitter: {
      title: metadata.openGraphTitle,
      description: metadata.openGraphDescription,
    },
    alternates: {
      canonical: pageUrl,
      languages: Object.fromEntries(
        locales.map((loc) => [localeHreflang[loc], `${siteConfig.baseUrl}/${loc}/contact-us`])
      ),
    },
  };
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const content = await getContent(locale, "contact");
  const CTAcontent = await getContent(locale, "homepage");

  return (
    <main className="md:max-lg:pt-[4rem] lg:pt-0">
      <Suspense fallback={<ContactFormLoading />}>
        <ContactForm content={content} locale={locale} />
      </Suspense>
      <CTA content={CTAcontent?.cta} locale={locale} className="mb-[6rem]" />
    </main>
  );
}