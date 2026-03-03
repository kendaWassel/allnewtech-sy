"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";

const ProjectDetailClient = ({ project }) => {
  // displaySet: [main, thumb0, thumb1, thumb2] — main image + row of thumbnails; swap on click
  const initialDisplaySet = useMemo(
    () =>
      [
        project.mainImage,
        ...project.secondaryImages.slice(0, 3),
      ].filter(Boolean),
    [project.mainImage, project.secondaryImages]
  );
  const [displaySet, setDisplaySet] = useState(initialDisplaySet);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const modalRef = useRef(null);

  const mainImage = displaySet[0] || project.mainImage;
  const thumbnailRow = displaySet.slice(1);

  const allImages = useMemo(
    () =>
      [
        project.mainImage,
        ...project.secondaryImages,
        ...project.otherImages,
      ].filter(Boolean),
    [project.mainImage, project.secondaryImages, project.otherImages]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  // Swap main with thumbnail at index i (0-based in thumbnail row)
  const handleThumbnailClick = (i) => {
    setDisplaySet((prev) => {
      if (prev.length <= 1 || i + 1 >= prev.length) return prev;
      const next = [...prev];
      [next[0], next[i + 1]] = [next[i + 1], next[0]];
      return next;
    });
  };

  const handleMainPrevious = () => {
    setDisplaySet((prev) => {
      if (prev.length <= 1) return prev;
      return [prev[prev.length - 1], ...prev.slice(0, -1)];
    });
  };

  const handleMainNext = () => {
    setDisplaySet((prev) => {
      if (prev.length <= 1) return prev;
      return [...prev.slice(1), prev[0]];
    });
  };

  const handleSeeMore = () => {
    setIsModalOpen(true);
    setModalImageIndex(0);
  };

  const handleModalThumbnailClick = (index) => {
    setModalImageIndex(index);
  };

  const handlePrevious = () => {
    setModalImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
  };

  const handleNext = () => {
    setModalImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <>
      <section className="py-[3rem] px-[3.5rem] lg:px-[var(--inline-padding)] lg:py-[6rem]">
        <div className="">
          {/* Top Section: Hero Image + Description */}
          <div className="flex flex-col lg:flex-row gap-[3rem] lg:mb-[6rem] mb-[3rem]">
            {/* Left: Hero Image with prev/next arrows */}
            <div className="lg:w-3/5">
              <div className="relative w-full h-[12.5rem] md:h-[25rem] lg:h-[31.5rem] mb-[1.5rem] group">
                {mainImage ? (
                  <Image
                    src={mainImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
                {displaySet.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handleMainPrevious}
                className="hidden md:block absolute top-1/2 -translate-y-1/2 lg:left-[2rem] left-[0.5rem] bg-[var(--secondary)] cursor-pointer text-white px-[0.75rem] py-[1.4rem] z-10 rotate-180"
                aria-label="Previous image"
              >
                <Image src="/icons/arrow.svg" width={12} height={20} alt="Previous image" />
                    </button>
                    <button
                      type="button"
                      onClick={handleMainNext}
                className="hidden md:block absolute top-1/2 -translate-y-1/2 lg:right-[2rem] right-[0.5rem] bg-[var(--secondary)] cursor-pointer text-white px-[0.75rem] py-[1.4rem] z-10"
                aria-label="Next image"
              >
                <Image src="/icons/arrow.svg" width={12} height={20} alt="Next image" />

                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails row (click swaps with main) */}
              {thumbnailRow.length > 0 && (
                <div className="flex sm:gap-[1rem] gap-[0.5rem] items-center">
                  {thumbnailRow.map((img, index) => (
                    <button
                      key={`${img}-${index}`}
                      type="button"
                      onClick={() => handleThumbnailClick(index)}
                      className="relative w-[3rem] h-[2rem] md:w-[5rem] md:h-[3.5rem] lg:w-[6rem] lg:h-[4.2rem] flex-shrink-0 border-2 border-transparent hover:border-[var(--primary-blue-first)] transition-colors"
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
                    </button>
                  ))}
                  {(project.otherImages?.length > 0 || project.secondaryImages?.length > 3) && (
                    <button
                      type="button"
                      onClick={handleSeeMore}
                      className="cursor-pointer lg:ml-[1.5rem] md:text-2xl flex items-center"
                    >
                      See More
                      <Image src="/icons/arrow-right.svg" alt="right arrow" width={25} height={25} />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Right: Title and Description */}
            <div className="lg:w-2/5">
              <h1 className="font-bold text-2xl md:text-3xl lg:text-[2.5rem] mb-4">
                {project.title}
              </h1>
              <div className="relative my-[1.5rem]">
                {project.propertyType && (
                  <div className="relative">
                    {project.propertyType === "home" ? (
                      <Image
                        src="/projects/home-label.svg"
                        alt="Home Label"
                        width={50}
                        height={50}
                      />
                    ) : (
                      <Image
                        src="/projects/commercial-label.svg"
                        alt="Commercial Label"
                        width={50}
                        height={50}
                      />
                    )}
                  </div>
                )}
                {project.service && (
                  <span className="absolute top-0 left-[50px] px-[0.75rem] py-[0.5rem] text-[0.5rem] md:text-base text-white bg-[var(--primary-blue-second)]">
                    {project.service}
                  </span>
                )}
              </div>

              <p className="text-base md:text-2xl lg:mt-0 mt-[5rem]">
                {project.description}
              </p>
            </div>
          </div>

          {/* Bottom Section: Challenges and Solutions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[3rem] lg:gap-[6rem]">
            {/* Left: The Challenge */}
            <div>
              <h2 className="font-bold text-xl md:text-3xl lg:text-[2.5rem] mb-[1.5rem]">
                The Challenge
              </h2>
              <ul>
                {project.challenges.map((challenge, index) => (
                  <li
                    key={index}
                    className=" md:text-2xl flex items-start"
                  >
                    <span className="mr-2">•</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-bold text-xl md:text-3xl lg:text-[2.5rem] mb-[1.5rem]">
                Our Solution
              </h2>
              <ul>
                {project.solutions.map((solution, index) => (
                  <li
                    key={index}
                    className="md:text-2xl flex items-start"
                  >
                    <span className="mr-2">•</span>
                    <span>{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#00000094] z-1000 flex items-center justify-center">
          <div
            ref={modalRef}
            className="relative py-[2rem] md:py-[5rem] overflow-y-auto bg-[var(--white)] md:max-w-[75%] max-w-[90%] max-h-[90vh] flex flex-col"
          >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-0 right-0 p-[0.4rem] md:p-[0.75rem] bg-[var(--primary-blue-first)] rounded-bl-[12px] md:rounded-bl-[24px] cursor-pointer"
                aria-label="Close modal"
              >
                <Image src="/icons/XModal.svg" alt="close button" width={33} height={33} className="w-[19.5px] h-[19.5px] md:w-[33px] md:h-[33px]"/>
              </button>
            {/* modal header */}
            <div className="px-[2rem] md:px-[3rem] lg:px-[6rem] flex flex-col gap-5 lg:flex-row items-start justify-between">
              <h3 className="flex-2 font-bold text-base md:text-3xl lg:text-[2.5rem]">
                {project.title}
              </h3>
              <div className="flex-1 relative flex items-start">
                {project.propertyType && (
                  <div className="w-[35px] h-[35px] md:w-[50px] md:h-[50px]">
                    {project.propertyType === "home" ? (
                      <Image
                        src="/projects/home-label.svg"
                        alt="Home Label"
                        width={50}
                        height={50}
                        className="w-full h-full"
                      />
                    ) : (
                      <Image
                        src="/projects/commercial-label.svg"
                        alt="Commercial Label"
                        width={50}
                        height={50}
                        className="w-full h-full"
                      />
                    )}
                  </div>
                )}
                {project.service && (
                  <span className="px-[0.75rem] py-[0.5rem] text-[0.5rem] md:text-base text-white bg-[var(--primary-blue-second)]">
                    {project.service}
                  </span>
                )}
              </div>
            </div>

            {/* main image with navigation */}
            <div className="px-[2rem] md:px-[3rem] lg:px-[6rem] mt-[1.5rem] md:mt-[2.5rem] relative flex-1 flex items-center justify-center">
              <button
                onClick={handlePrevious}
                className="hidden md:block absolute lg:left-[2rem] left-[0.5rem] bg-[var(--secondary)] cursor-pointer text-white px-[0.75rem] py-[1.4rem] z-10 rotate-180"
                aria-label="Previous image"
              >
                <Image src="/icons/arrow.svg" width={12} height={20} alt="Previous image"/>
              </button>

              <div className="relative w-full h-[13rem] md:h-[25rem] lg:h-[37rem]">
                {allImages[modalImageIndex] && (
                  <Image
                    src={allImages[modalImageIndex]}
                    alt={`${project.title} - Image ${modalImageIndex + 1}`}
                    fill
                    className="object-cover w-full h-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 80vw"
                  />
                )}
              </div>

              <button
                onClick={handleNext}
                className="hidden md:block absolute lg:right-[2rem] right-[0.5rem] bg-[var(--secondary)] cursor-pointer text-white px-[0.75rem] py-[1.4rem] z-10"
                aria-label="Next image"
              >
                <Image src="/icons/arrow.svg" width={12} height={20} alt="Next image" />

              </button>
            </div>
            {/* thumbnail row in modal */}
            {/* its width is smaller than the main image so it will depends on the padding ,taking the full width minus x2 of padding(right,left) */}
            <div className="max-w-[calc(100%_-_8rem)] lg:max-w-[calc(100%_-_12rem)] mx-[auto] md:mt-[2rem] mt-[0.5rem] lg:px-[6rem]">
              <div className="flex gap-1 md:gap-2 overflow-x-auto overflow-y-hidden pb-2">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => handleModalThumbnailClick(index)}
                    className={`relative w-[2.5rem] h-[1.8rem] md:w-24 md:h-24 flex-shrink-0 border-2 transition-colors ${
                      modalImageIndex === index
                        ? "border-[var(--primary-blue-first)]"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectDetailClient;
