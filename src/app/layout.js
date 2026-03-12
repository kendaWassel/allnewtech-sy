import "./globals.css";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://allnewtech-sy.com"),
  openGraph: {
    type: 'website',
    siteName: 'All New Tech',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }) {
  return children
}