import home from '@/content/homepage'
import CTAButton from '@/components/ui/CTAButton';
const CTA = ({className}) => {
    const buttons =home.cta.buttons;
  return (
    <section>
      <div className={`text-center md:w-[80%] w-[85%] mx-[auto] ${className}`}>
      <h2 className='font-bold lg:text-5xl md:text-4xl text-2xl md:mb-[2rem] mb-[1rem]'>{home.cta.title}</h2>
      <p className='lg:text-[2rem] md:text-2xl'>{home.cta.description}</p>
      <CTAButton title={buttons[0].text} link={buttons[0].link} color="blue" className="lg:text-2xl md:text-xl text-[0.75rem] lg:my-[2rem] md:my-[1.5rem] my-[1rem] mx-[auto]"/>
      <CTAButton title={buttons[1].text} link={buttons[1].link} color="dark" className="lg:text-2xl md:text-xl text-[0.75rem] mx-[auto]"/>
      </div>
    </section>
  )
}

export default CTA
