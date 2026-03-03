import { Suspense } from "react";
import ContactForm from "@/components/contact/ContactForm";
import ContactFormLoading from "@/components/contact/ContactFormLoading";
import CTA from "@/components/home/CTA";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Contact Us",
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
    title: "Contact Us | Book Site Visit or Request Quote",
    description:
      "Schedule a professional site assessment or request a tailored quote for your security and technology needs.",
    url: `${siteConfig.baseUrl}/contact-us`,
  },
  alternates: {
    canonical: `${siteConfig.baseUrl}/contact-us`,
  },
};

export default function ContactPage() {
  return (
    <main>
      <Suspense fallback={<ContactFormLoading />}>
        <ContactForm />
      </Suspense>
      <CTA className="mb-[6rem]"/>
    </main>
  );
}

