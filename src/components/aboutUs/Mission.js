import Image from 'next/image';
const Mission = ({content}) => {
    const mission = content;
    return (
        <section className="md:px-[var(--inline-padding)] px-[var(--small-padding)] pt-[4rem] md:pt-[6rem] lg:pt-[4.5rem] mb-[6rem]">
            <div className="flex lg:flex-row flex-col items-center gap-[7.5rem]">
                <div className='lg:order-1 order-2'>
                    <h1 className='font-bold mb-[1.5rem] md:mb-[2rem] lg:mb-[3rem] text-2xl md:text-3xl lg:text-5xl '>{mission.title}</h1>
                    <p className='md:text-2xl'>{mission.description}</p>
                </div>
                <Image
                    src="/about-us/about-1.svg"
                    alt="security camera image"
                    width={423}
                    height={325}
                    priority
                    sizes="(min-width: 1024px) 423px, 100vw"
                    className='lg:order-2 order-1 rtl:scale-x-[-1]'
                />
            </div>
        </section>
    )
}

export default Mission
