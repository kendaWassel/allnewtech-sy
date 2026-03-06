export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://allnewtech-sy.com"),
};

export default function RootLayout({ children }) {
  return children;
}