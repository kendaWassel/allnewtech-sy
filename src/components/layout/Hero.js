const Hero = ({title,subtitle}) => {
  return (
    <section className="h-[300px] sm:h-[200px] md:h-[315px] w-full bg-linear-[90deg] from-[var(--primary-blue-second)] to-[var(--secondary)]">
      <div className="relative md:px-0 px-[3.75rem] text-white text-center top-[50%] translate-y-[-50%]">
      <h1 className="font-bold lg:text-5xl md:text-4xl text-2xl mb-[2rem]">{title}</h1>
      <p className="lg:text-[2rem] md:text-xl">{subtitle}</p>
      </div>
    </section>
  )
}
export default Hero
