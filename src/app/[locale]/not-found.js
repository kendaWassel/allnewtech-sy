import Link from "next/link";

export default function NotFound({ params }) {
  const locale = params?.locale || "en";

  return (
    <main className="py-20 text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="mb-6">Page not found</p>

      <Link
        href={`/${locale}`}
        className="bg-blue-600 text-white px-6 py-2"
      >
        Back to Home
      </Link>
    </main>
  );
}