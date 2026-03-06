import CTAButton from "../ui/CTAButton";

export default function Hero({ content, locale = "en" }) {
  if (!content) return null;
  const hero = content;
  const cta = hero.cta;
  const link = `${locale}/${cta?.link}`;
  return (
    <section 
    className="relative lg:top-[calc(-65px_-_2rem)] md:top-[calc(-42px_-_2rem)]"
    >
      <div
      className="relative lg:h-[calc(100vh_+_65px_+_2rem)] md:h-[calc(100vh_+_42px_+_2rem)] h-[80vh] bg-cover lg:bg-center bg-right rtl:bg-left overflow-hidden"
      style={{ backgroundImage: "url('/home/Hero-Section-BG.png')",backgroundRepeat:"no-repeat" }}
      >
      <div 
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/home/Hero-Section-Gradient.png')" ,backgroundRepeat:"no-repeat"}}
      />
      <div className="relative flex flex-col items-center z-10 text-white text-center lg:px-[15rem] top-[50%] ltr:lg:top-[60%] -translate-y-1/2 mx-[auto] lg:w-full w-[70%]">
          <h1 className="font-bold text-[#DDE0E3] lg:text-5xl text-2xl leading-[1.2]">
            {hero.title}
          </h1>
            <p className="lg:text-[2rem] text-[#DDE0E3] lg:m-0 leading-[1.2] lg:my-[1.5rem] my-[1rem] w-[90%]">
              {hero.subtitle}
            </p>
            <CTAButton title={cta?.text} link={link} color="blue" className="lg:text-2xl text-xs lg:py-[0.5rem] lg:px-[1rem] py-[0.75rem_!important] px-[1.5rem_!important]"/>
        </div>
      </div>
    </section>
  );
}
