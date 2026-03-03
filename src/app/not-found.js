import Link from "next/link";
import FormIntroHero from "@/components/layout/FormIntroHero";

export const metadata = {
  title: "404 | Page Not Found",
  description:
    "The page you are looking for could not be found on All New Tech UK.",
  alternates: {
    canonical: "https://allnewtech-uk.com/404",
  },
};

export default function NotFound() {
  return (
    <main>
      <section className="px-[1.3rem] px-0">
        <div className="relative my-[3rem] mx-auto w-[fit-content] bg-[var(--white)] px-[2.5rem] py-[2.5rem] lg:p-[5rem] text-center">
          <p className="text-[var(--primary-blue-second)] font-bold text-5xl lg:text-7xl mb-[0.75rem]">
            404
          </p>
          <h2 className="font-bold md:text-2xl lg:text-[2rem] mb-[0.75rem]">
            Page not found
          </h2>
          <p className="text-xs md:text-base text-[var(--secondary)] mb-[2rem]">
            The page you are trying to reach does not exist or has been moved.
          </p>
            <Link
              href="/"
              className="text-xs md:text-base bg-[var(--primary-blue-first)] text-white font-bold py-[0.35rem] px-[1.5rem] md:py-[0.75rem] md:px-[3rem] hover:bg-[var(--primary-blue-second)] transition-colors"
            >
              Back to Home
            </Link>
        </div>
      </section>
    </main>
  );
}
