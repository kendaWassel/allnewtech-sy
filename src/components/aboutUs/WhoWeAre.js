import Image from 'next/image';
import aboutUs from '@/content/about'
const WhoWeAre = () => {
    const whoWeAre = aboutUs.whoWeAre;
    return (
        <section className="md:px-[var(--inline-padding)] px-[var(--small-padding)] mb-[6rem]">
            <div className="flex lg:flex-row flex-col items-center gap-[7.5rem]">
                <Image src="/about-us/about-2.svg" alt="security camera image" width={423} height={325} />
                <div>
                    <h2 className='font-bold mb-[1.5rem] md:mb-[2rem] lg:mb-[3rem] text-2xl md:text-3xl lg:text-5xl'>{whoWeAre.title}</h2>
                    <p className='md:text-2xl'>{whoWeAre.description}</p>
                </div>
            </div>
        </section>
    )
}

export default WhoWeAre
