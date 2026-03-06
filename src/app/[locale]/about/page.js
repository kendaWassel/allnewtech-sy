import ChooseUs from "@/components/aboutUs/ChooseUs";
import Mission from "@/components/aboutUs/Mission";
import WhoWeAre from "@/components/aboutUs/WhoWeAre";
import CTA from "@/components/home/CTA";
import { siteConfig } from "@/config/site";
import { getContent } from "@/lib/get-content";

export const metadata = {
  title: "About Us",
  description:
    "Learn about All New Tech, a trusted UK-based security and technology solutions provider. Experienced technicians delivering high-quality CCTV, alarm, access control, and smart automation systems.",
  keywords: [
    "about all new tech",
    "security company",
    "CCTV installers",
    "alarm system experts",
    "smart automation",
    "security professionals",
  ],
  openGraph: {
    title: "About Us | UK Security & Technology Solutions",
    description:
      "With years of industry experience, All New Tech has become a trusted partner for individuals and businesses seeking modern security systems and smart automation installation.",
    url: `${siteConfig.baseUrl}/about`,
  },
  alternates: {
    canonical: `${siteConfig.baseUrl}/about`,
  },
};

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

