import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
const Footer = ({ locale, content }) => {
  const sections = content?.sections || [];
  const sectionOne = sections[0] || { title: "Services", links: [] };
  const sectionTwo = sections[1] || { title: "Start Your Project Today", links: [] };
  const sectionThree = sections[2] || { title: "Useful Links", links: [] };

  const locationLabel = content?.company?.locationLabel;
  const copyright =
    content?.copyright;
  const phoneE164 = siteConfig.contact?.phoneE164 || "";
  const phoneDisplay = siteConfig.contact?.phoneDisplay || phoneE164;
  const email = siteConfig.contact?.email || "";
  const location = siteConfig.contact?.location || "";

  const withLocale = (href = "") => {
    if (!href) return `/${locale}/`;
    if (/^(https?:|mailto:|tel:)/.test(href)) return href;
    if (href === "/") return `/${locale}/`;
    return `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
  };
  return (
    <footer className="w-full">
      <div className="bg-[var(--secondary)] text-white pt-12 pb-[6rem] sm:px-[var(--inline-padding)]">
        <div className="flex justify-between">
          <div className="flex flex-col lg:flex-3 flex-1 lg:items-start items-center">
            <Link href={`/${locale}/`} className="mb-6">
              <Image
                src="/Logo-light.svg"
                alt="All New Tech Logo"
                width={300}
                height={160}
                className="lg:w-[300px] lg:h-[160px] w-[200px] h-[130px] "
              />
            </Link>
            <div className="flex flex-col gap-2 text-white lg:items-start items-center">
              <address className="not-italic md:w-[70%] w-[80%] ">
                <p className="lg:text-start text-center">
                  {locationLabel} - {location}
                </p>
              </address>
              <p dir="ltr" style={{ unicodeBidi: "isolate" }}>{phoneDisplay}</p>
              <p>{email}</p>
            </div>
          </div>
          <div className="lg:flex-4 lg:flex hidden justify-between">
            <div className="flex flex-col w-2/6">
              <h4 className="text-white font-bold mb-4">{sectionOne.title}</h4>
              <div className="flex flex-col gap-2">
                {sectionOne.links.map((item) => (
                  <Link
                    key={`${item.href}-${item.label}`}
                    href={withLocale(item.href)}
                    className="text-white hover:text-blue-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col w-2/6">
              <h4 className="text-white font-bold mb-4">{sectionTwo.title}</h4>
              <div className="flex flex-col gap-2">
                {sectionTwo.links.map((item) => (
                  <Link
                    key={`${item.href}-${item.label}`}
                    href={withLocale(item.href)}
                    className="text-white hover:text-blue-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col w-1/7">
              <h4 className="text-white font-bold mb-4">{sectionThree.title}</h4>
              <div className="flex flex-col gap-2">
                {sectionThree.links.map((item) => (
                  <Link
                    key={`${item.href}-${item.label}`}
                    href={withLocale(item.href)}
                    className="text-white hover:text-blue-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--primary-blue-second)] py-4 lg:px-[var(--inline-padding)]">
        <div className="lg:ps-[3rem] lg:text-start text-center">
          <p className="text-white text-sm">{copyright}</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
