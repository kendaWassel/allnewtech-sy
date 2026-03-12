import Link from "next/link";
import { headers } from "next/headers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getContent } from "@/lib/get-content";

export default async function NotFound() {
  const headersList = await headers();
  const referer = headersList.get("x-pathname") || headersList.get("referer") || "";
  const locale = referer.match(/\/(en|ar)/)?.[1] || "en";
  const isArabic = locale === "ar";

  const [headerContent, footerContent] = await Promise.all([
    getContent(locale, "header"),
    getContent(locale, "footer"),
  ]);

  return (
    <html lang={locale} dir={isArabic ? "rtl" : "ltr"}>
      <body>
        <Header locale={locale} content={headerContent} />
        <main dir={isArabic ? "rtl" : "ltr"} className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-20 text-center">
          <p className="text-[10rem] md:text-[16rem] font-bold leading-none text-[var(--primary-blue-second)] opacity-10 select-none absolute">
            404
          </p>
          <div className="relative z-10 flex flex-col items-center gap-4">
            <h1 className="text-3xl md:text-5xl font-bold text-[var(--secondary)]">
              {isArabic ? "الصفحة غير موجودة" : "Page Not Found"}
            </h1>
            <p className="text-gray-500 text-base md:text-xl max-w-[400px]">
              {isArabic
                ? "يبدو أن الصفحة التي تبحث عنها غير موجودة أو تم نقلها."
                : "The page you're looking for doesn't exist or has been moved."}
            </p>
            <Link href={`/${locale}`} className="mt-4 bg-[var(--primary-blue-second)] hover:opacity-90 transition-opacity rounded-[12px] text-white px-8 py-3 text-base md:text-lg font-semibold">
              {isArabic ? "العودة إلى الرئيسية" : "Back to Home"}
            </Link>
          </div>
        </main>
        <Footer locale={locale} content={footerContent} />
      </body>
    </html>
  );
}