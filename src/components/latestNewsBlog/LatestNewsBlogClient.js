"use client";
import Image from "next/image";

const LatestNewsBlogClient = ({ news }) => {
  return (
    <section className="">
        <div className="md:px-[var(--inline-padding)] md:pt-[6rem] w-full">
            {news.image ? (
              <Image
                src={news.image}
                alt="News image"
                width={420}
                height={160}
                className="w-full h-[10rem] md:h-full object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
        </div>

        <div className="px-[3.5rem] md:px-[var(--inline-padding)] pt-[2rem] pb-[3.5rem] md:py-[6rem]">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-[2.5rem] mb-[1.5rem]">
            {news.title}
          </h1>
          <p className="text-base md:text-2xl">
            {news.content}
          </p>
        </div>
    </section>
  );
};

export default LatestNewsBlogClient;
