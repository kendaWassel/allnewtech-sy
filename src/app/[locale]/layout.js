import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { locales } from "@/config/i18n";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/get-content";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const montserrat = Montserrat({
  weight: ["400", "700"],
});

const lamaSans = localFont({
  src: [
    {
      path: "../../../public/fonts/lama-sans/LamaSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/lama-sans/LamaSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const isArabic = locale === "ar";
  const [headerContent, footerContent] = await Promise.all([
    getContent(locale, "header"),
    getContent(locale, "footer"),
  ]);

  return (
    <html lang={locale} dir={isArabic ? "rtl" : "ltr"}>
      <body className={isArabic ? lamaSans.className : montserrat.className}>
        <Header locale={locale} content={headerContent} />
        {children}
        <Footer locale={locale} content={footerContent} />
      </body>
    </html>
  );
}