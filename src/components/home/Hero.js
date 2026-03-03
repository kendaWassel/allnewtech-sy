import home  from '@/content/homepage'
import CTAButton from '../ui/CTAButton';
export default function Hero() {
  const hero=home.hero
  const cta=hero.cta;
  return (
    <section 
    className="relative lg:h-screen h-[80vh] bg-cover lg:bg-center bg-right overflow-hidden"
    style={{ backgroundImage: "url('/home/Hero-Section-BG.png')",backgroundRepeat:"no-repeat" }}
    >
      <div 
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/home/Hero-Section-Gradient.png')" ,backgroundRepeat:"no-repeat"}}
      />
      <div className="relative z-10 text-white lg:text-start text-center lg:m-0 mx-[auto] lg:ps-[var(--inline-padding)] top-[50%] translate-y-[-50%] sm:w-[75%] w-[70%]">
          <h1 className="font-bold text-[#DDE0E3] lg:text-5xl text-2xl leading-[1.2]">
            {hero.title}
          </h1>
            <p className="lg:text-[2rem] text-[#DDE0E3] lg:m-0 mx-[auto] leading-[1.2] lg:my-[1.5rem] my-[1rem] w-[90%]">
              {hero.subtitle}
            </p>
            <CTAButton title={cta.text} link={cta.link} color="blue" className="lg:text-2xl text-xs lg:m-0 mx-[auto] lg:py-[0.5rem] lg:px-[1rem] py-[0.75rem_!important] px-[1.5rem_!important]"/>
        </div>
    </section>
  );
}

