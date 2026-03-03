import services from '@/content/services'
import Image from 'next/image'
import Link from 'next/link'

const Categories = () => {
  const { title, description, items } = services.categories
  const images = ['/services/category-1.jpg', '/services/category-2.jpg']

  return (
    <section className="py-[3.5rem] md:py-[5rem]">
      <div className="text-center md:px-[10rem] px-[3.75rem]">
        <h2 className="font-bold lg:text-5xl md:text-4xl text-2xl md:mb-[2rem] mb-[1.5rem]">
          {title}
        </h2>
        <p className="lg:text-[2rem] md:text-2xl">
          {description}
        </p>
      </div>

      <div className="mx-auto mt-[3rem] w-full px-[3.75rem] md:px-[var(--inline-padding)]">
        <div className="flex flex-col md:gap-[2rem] gap-[3rem] lg:flex-row">
          {items.map((item, index) => (
            <Link
              key={item.title}
              href={item.link}
              className="flex-1 overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.12)] transition-transform duration-300 md:hover:-translate-y-1"
            >
              <div className="relative h-[9.5rem] w-full md:h-[20.5rem]">
                <Image
                  src={images[index]}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />
              </div>
              <div className="md:p-[4.5rem] px-[1.75rem] py-[0.75rem] text-center">
                <h3 className="md:text-[2rem] text-2xl font-bold">
                  {item.title}
                </h3>
                <p className="md:mt-[1.5rem] mt-[0.75rem] md:text-2xl">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories
