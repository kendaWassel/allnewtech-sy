import Image from 'next/image';

const WhoWeAre = ({content}) => {
    const whoWeAre = content;
    return (
        <section className="md:px-[var(--inline-padding)] px-[var(--small-padding)] mb-[6rem]">
            <div className="flex lg:flex-row flex-col items-center gap-[7.5rem] text-start">
                <Image
                    src="/about-us/about-2.svg"
                    alt="security camera image"
                    width={423}
                    height={325}
                    priority
                    sizes="(min-width: 1024px) 423px, 100vw"
                />
                <div>
                    <h2 className='font-bold mb-[1.5rem] md:mb-[2rem] lg:mb-[3rem] text-2xl md:text-3xl lg:text-5xl'>{whoWeAre.title}</h2>
                    <p className='md:text-2xl'>{whoWeAre.description}</p>
                </div>
            </div>
        </section>
    )
}

export default WhoWeAre
