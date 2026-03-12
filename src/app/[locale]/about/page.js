import ChooseUs from "@/components/aboutUs/ChooseUs";
import Mission from "@/components/aboutUs/Mission";
import WhoWeAre from "@/components/aboutUs/WhoWeAre";
import CTA from "@/components/home/CTA";
import { localeHreflang, locales } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import { getContent } from "@/lib/get-content";

const aboutMetadataByLocale = {
  en: {
    title: "About Us | All New Tech",
    description: "Learn about All New Tech, a trusted UK-based security and technology solutions provider. Experienced technicians delivering high-quality CCTV, alarm, access control, and smart automation systems.",
    keywords: ["about all new tech", "security company", "CCTV installers", "alarm system experts", "smart automation", "security professionals"],
    openGraphTitle: "About Us | UK Security & Technology Solutions",
    openGraphDescription: "With years of industry experience, All New Tech has become a trusted partner for individuals and businesses seeking modern security systems and smart automation installation.",
  },
  ar: {
    title: "من نحن | All New Tech",
    description: "تعرّف على All New Tech، مزود حلول الأمن والتقنية في المملكة المتحدة، وفريقنا المتخصص في أنظمة المراقبة والإنذار والتحكم في الدخول والأتمتة الذكية.",
    keywords: ["من نحن", "شركة أنظمة أمنية", "تركيب كاميرات مراقبة", "خبراء أنظمة إنذار", "أتمتة ذكية", "حلول أمن وتقنية"],
    openGraphTitle: "من نحن | حلول الأمن والتقنية في المملكة المتحدة",
    openGraphDescription: "بفضل سنوات من الخبرة، أصبحت All New Tech شريكًا موثوقًا للأفراد والشركات الباحثين عن أنظمة أمن حديثة وحلول أتمتة ذكية.",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await (params || Promise.resolve({ locale: "en" }));
  const activeLocale = locales.includes(locale) ? locale : "en";
  const metadata = aboutMetadataByLocale[activeLocale];
  const pageUrl = `${siteConfig.baseUrl}/${activeLocale}/about`;

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
        locales.map((loc) => [localeHreflang[loc], `${siteConfig.baseUrl}/${loc}/about`])
      ),
    },
  };
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const content = await getContent(locale, "about");
  const CTAcontent = await getContent(locale, "homepage");

  return (
    <main>
      <Mission content={content?.mission} />
      <WhoWeAre content={content?.whoWeAre} />
      <ChooseUs content={content?.whyChooseUs} locale={locale} />
      <CTA content={CTAcontent?.cta} locale={locale} className="py-[6rem]" />
    </main>
  );
}