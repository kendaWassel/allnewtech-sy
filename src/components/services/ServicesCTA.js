import CTAButton from "@/components/ui/CTAButton";

const CTA = ({ className, id, content, locale = "en" }) => {
  if (!content) return null;

  const buttons = content.buttons || [];
  const toLocaleLink = (link = "") => {
    const normalizedLink = link.startsWith("/") ? link.slice(1) : link;
    return `/${locale}/${normalizedLink}`;
  };

  return (
      <div id={id} className={`lg:text-start text-center lg:w-[80%] w-[85%] mx-[auto] my-[3rem] md:mt-[7rem] mb-[14rem] ${className}`}>
        <h3 className="font-bold lg:text-4xl md:text-[2.5rem] text-2xl md:mb-[2rem] mb-[1.5rem]">
          {content.title}
        </h3>
        <p className="md:text-2xl text-center lg:text-start">{content.description}</p>
        <div className="flex flex-col lg:flex-row items-center lg:gap-[1.5rem]">
          {buttons[0] && (
            <CTAButton
              title={buttons[0].text}
              link={toLocaleLink(buttons[0].link)}
              color="blue"
              className="lg:text-2xl md:text-xl text-[0.75rem] lg:my-[2rem] my-[1.5rem]"
            />
          )}
          {buttons[1] && (
            <CTAButton
              title={buttons[1].text}
              link={toLocaleLink(buttons[1].link)}
              color="dark"
              className="lg:text-2xl md:text-xl text-[0.75rem]"
            />
          )}
        </div>
      </div>
  );
};

export default CTA;
