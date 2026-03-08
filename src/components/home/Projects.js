import Image from "next/image";
import Link from "next/link";
import { apiConfig, getApiUrl, getImageUrl } from '@/config/api';

const Projects = async ({ content, locale = "en" }) => {
  let projects = [];
  let error = null;

  try {
    const url = getApiUrl(apiConfig.endpoints.projects);
    const response = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.msg || 'API request was not successful');
    }
    projects = (data.data || []).slice(0, 3).map((project) => {
      const raw =
        project.main_image ||
        project.images?.main?.[0] ||
        project.image ||
        '';
      return { id: project.id, main_image: getImageUrl(raw) };
    });
  } catch (err) {
    error = err.message || 'Failed to load projects. Please try again later.';
    projects = [];
  }

  return (
    <section className="py-[1.5rem] md:py-[9rem]">
      <h2 className="relative z-11 font-bold text-center text-2xl lg:text-5xl mb-[1.5rem] lg:mb-[3rem]">
        {content?.title ?? "Our Projects"}
      </h2>

      {/* Images Grid */}
      {error ? (
        <div className="flex items-center justify-center bg-[var(--white)] min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600 text-base md:text-lg mb-2">
              Unable to load projects
            </p>
            <p className="text-gray-600 text-sm md:text-base">
              Try again!
            </p>
          </div>
        </div>
      ) : projects.length === 0 ? (
        <div className="flex items-center justify-center bg-[var(--white)] py-12">
          <p className="text-center text-gray-600 text-base md:text-lg">
            No projects available at the moment. Check back soon!
          </p>
        </div>
      ) : (
        <div className="relative grid grid-cols-3 gap-2 md:gap-6 bg-[var(--white)]">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative aspect-[7/6] w-full overflow-hidden bg-[var(--white)]"
            >
              {project.main_image ? (
                <Image
                  src={project.main_image}
                  alt={`Project ${project.id}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 33vw, (max-width: 768px) 33vw, 30vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                  No image
                </div>
              )}
            </div>
          ))}
          <Image src='/home/top-shape.svg' alt="white top shape" width={100} height={100} className="hidden md:block w-full absolute top-[-60px] lg:top-[-90px] xl:top-[-110px] z-10"/>
          <Image src='/home/bottom-shape.svg' alt="white bottom shape" width={100} height={100} className="hidden md:block w-full absolute bottom-[-60px] lg:bottom-[-90px] xl:bottom-[-110px] z-10"/>
        </div>
      )}

      {/* Link */}
      <div className="relative mx-auto w-fit py-[1.5rem] z-11">
        <Link
          href={`/${locale}/projects`}
          className="flex items-center justify-center gap-2 text-lg lg:text-2xl font-bold"
        >
          <span>{content?.link ?? "Explore Projects"}</span>
          <Image src="/icons/arrow-right.svg" alt="" width={25} height={25} className="rtl:rotate-180"/>
        </Link>
      </div>
    </section>
  );
};

export default Projects;

// content: var(--tw-content);
//     position: absolute;
//     width: 120%;
//     background-color: aquamarine;
//     top: -230px;
//     border-bottom: 300px solid black;
//     border-radius: 50%;
//     z-index: 100;
//     left: 50%;
//     transform: translateX(-50%);