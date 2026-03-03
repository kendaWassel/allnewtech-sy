import { Montserrat } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import "./globals.css";

const montserrat = Montserrat({
  weight: ['400','700'],
});

export const metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: "All New Tech - UK Security & Smart Technology Solutions",
    template: "%s | All New Tech",
  },
  description:
    "Trusted UK-based security and technology solutions provider. Professional CCTV systems, alarm systems, access control, and smart automation for homes and businesses.",
  keywords: [
    "CCTV installation",
    "alarm systems",
    "access control",
    "smart automation",
    "home security",
    "commercial security",
    "security systems installation",
    "smart home technology",
  ],
  authors: [{ name: "All New Tech" }],
  creator: "All New Tech",
  publisher: "All New Tech",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteConfig.baseUrl,
    siteName: "All New Tech",
    title: "All New Tech - UK Security & Smart Technology Solutions",
    description:
      "Trusted UK-based security and technology solutions provider. Professional CCTV, alarm systems, access control, and smart automation.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "All New Tech - Security & Technology Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All New Tech - UK Security & Smart Technology Solutions",
    description:
      "Trusted UK-based security and technology solutions provider. Professional CCTV, alarm systems, access control, and smart automation.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: siteConfig.baseUrl,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <body className={`${montserrat.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
