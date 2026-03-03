import Image from 'next/image';
import aboutUs from '@/content/about'
const Mission = () => {
    const mission = aboutUs.mission;
    return (
        <section className="md:px-[var(--inline-padding)] px-[var(--small-padding)] lg:pt-[2.5rem] pt-[4rem] mb-[6rem]">
            <div className="flex lg:flex-row flex-col items-center gap-[7.5rem]">
                <div className='lg:order-1 order-2'>
                    <h1 className='font-bold mb-[1.5rem] md:mb-[2rem] lg:mb-[3rem] text-2xl md:text-3xl lg:text-5xl '>{mission.title}</h1>
                    <p className='md:text-2xl'>{mission.description}</p>
                </div>
                <Image src="/about-us/about-1.svg" alt="security camera image" width={423} height={325} className='lg:order-2 order-1' />
            </div>
        </section>
    )
}

export default Mission
