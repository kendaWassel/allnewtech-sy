const Hero = ({title,subtitle}) => {
  return (
    <section className="h-[250px] sm:h-[200px] md:h-[calc(300px_+_42px_+_2rem)] lg:h-[calc(300px_+_65px_+_2rem)] w-full bg-[linear-gradient(90deg,var(--primary-blue-second)_0%,var(--primary-blue-first)_30%,var(--primary-blue-first)_70%,var(--primary-blue-second)_100%)]">
      <div className="relative flex flex-col items-center md:px-0 px-[3.75rem] text-white text-center top-[50%] md:top-[60%] ltr:start-[50%] rtl:start-[-50%] translate-[-50%]">
      <h1 className="font-bold lg:text-5xl md:text-4xl text-2xl mb-[2rem]">{title}</h1>
      <p className="lg:text-[2rem] md:text-xl text-center md:w-[70%]">{subtitle}</p>
      </div>
    </section>
  )
}
export default Hero