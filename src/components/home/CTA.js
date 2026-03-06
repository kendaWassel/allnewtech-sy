import CTAButton from "@/components/ui/CTAButton";

const CTA = ({ content, locale = "en", className }) => {
  if (!content) return null;
  const buttons = content.buttons || [];
  const toLocaleLink = (link = "") => {
    const normalizedLink = link.startsWith("/") ? link.slice(1) : link;
    return `/${locale}/${normalizedLink}`;
  };
  return (
    <section>
      <div className={`text-center md:w-[80%] w-[85%] mx-[auto] ${className}`}>
      <h2 className='font-bold lg:text-5xl md:text-4xl text-2xl md:mb-[2rem] mb-[1rem]'>{content.title}</h2>
      <p className='lg:text-[2rem] md:text-2xl'>{content.description}</p>
      {buttons[0] && (
        <CTAButton title={buttons[0].text} link={toLocaleLink(buttons[0].link)} color="blue" className="rtl:rounded-[var(--ar-radius)] lg:text-2xl md:text-xl text-[0.75rem] lg:my-[2rem] md:my-[1.5rem] my-[1rem] mx-[auto]"/>
      )}
      {buttons[1] && (
        <CTAButton title={buttons[1].text} link={toLocaleLink(buttons[1].link)} color="dark" className="rtl:rounded-[var(--ar-radius)] lg:text-2xl md:text-xl text-[0.75rem] mx-[auto]"/>
      )}
      </div>
    </section>
  )
}

export default CTA
